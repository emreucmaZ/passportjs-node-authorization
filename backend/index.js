const express = require("express");
const passport = require("passport");
const getUserPermissionsFromDatabase = require("./helpers/getUserPermissionsFromDatabase");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const User = require("./models/userModel");
const authorize = require("./helpers/authorize");
const getSecretKey = require("./helpers/getSecretKey");
const { ObjectId } = require("mongodb");
const Role = require("./models/roleModel");
const bcrypt = require("bcrypt");
const { ExtractJwt } = require("passport-jwt");
const loginController = require("./controllers/user/loginController");
const session = require("express-session");
const sendResponse = require("./helpers/sendResponse");
const createRole = require("./controllers/role/createRoleController");
const createUser = require("./controllers/user/createUserController");
const controlPermission = require("./helpers/controlPermission");
const signUp = require("./controllers/user/signupController");
const getUsers = require("./controllers/user/getUsersController");
const getUserPermissions = require("./controllers/user/getUserPermissions");
const getRoles = require("./controllers/role/getRolesController");
const updateUser = require("./controllers/user/updateUserController");
const deleteUser = require("./controllers/user/deleteUserController");
const updateRole = require("./controllers/role/updateRoleController");
const deleteRole = require("./controllers/role/deleteRoleController");
const JwtStrategy = require("passport-jwt").Strategy;
require("./db"); // db.js dosyasını burada içe aktarın

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: getSecretKey(),
};

passport.use(
  new JwtStrategy(options, async (payload, done) => {
    try {
      const user = await User.findById(payload.id);

      if (
        payload.password == user.password &&
        payload.username == user.username
      ) {
        user.roles = await getUserPermissionsFromDatabase(payload.roleId);
        if (user) {
          return done(null, user);
        }
      }

      return done(null, false);
    } catch (err) {
      return done(err, false);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => done(err));
});

const app = express();

// CORS ayarları
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: getSecretKey(),
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.post("/login", (req, res) => loginController(req, res));
app.post("/signup", (req, res) => signUp(req, res));

app.get(
  "/users",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    controlPermission(req, res,"superadmin", getUsers);
  }
);

app.post(
  "/users",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    controlPermission(req, res, "superadmin", createUser);
  }
);

app.put(
  "/users/:userId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    controlPermission(req, res, "superadmin", updateUser);
  }
);

app.delete(
  "/users/:userId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    controlPermission(req, res, "superadmin", deleteUser);
  }
);

app.post(
  "/roles",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    controlPermission(req, res, "superadmin", createRole);
  }
);

app.get(
  "/getUserPermissions",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    getUserPermissions(req, res);
  }
);

app.get(
  "/roles",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    controlPermission(req, res, "superadmin", getRoles);
  }
);

app.put(
  "/roles/:roleId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    controlPermission(req, res, "superadmin", updateRole);
  }
);

app.delete(
  "/roles/:roleId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    controlPermission(req, res, "superadmin", deleteRole);
  }
);

app.get(
  "/isAuthorized",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    res.send(true);
  }
);

app.listen(5002, () => {
  console.log("Sunucu 5002 numaralı portta çalışıyor...");
});
