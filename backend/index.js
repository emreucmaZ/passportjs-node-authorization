const express = require("express");
const passport = require("passport");
const getUserPermissionsFromDatabase = require("./helpers/getUserPermissionsFromDatabase");
const User = require("./models/userModel");
const getSecretKey = require("./helpers/getSecretKey");
const { ExtractJwt } = require("passport-jwt");
const loginController = require("./controllers/user/loginController");
const session = require("express-session");
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
const getImages = require("./controllers/images/getImagesController");
const path = require("path");
const createBlog = require("./controllers/blogs/createBlogController");
const getBlogs = require("./controllers/blogs/getBlogsController");
const updateBlog = require("./controllers/blogs/updateBlogController");
const deleteBlog = require("./controllers/blogs/deleteBlogController");
const JwtStrategy = require("passport-jwt").Strategy;
require("./db"); // db.js dosyasını burada içe aktarın
const logger = require("./helpers/logger/logger");
const uploadImage = require("./controllers/images/uploadImage");
const deleteImage = require("./controllers/images/deleteImage");
const getMenus = require("./controllers/menus/getMenusController");
const createMenu = require("./controllers/menus/createMenuController");
const updateMenu = require("./controllers/menus/updateMenuController");
const deleteMenu = require("./controllers/menus/deleteMenuController");
const getLogs = require("./controllers/logs/getLogs");
const getSocialConnections = require("./controllers/socialConnections/getSocialConnectionsController");
const createSocialConnection = require("./controllers/socialConnections/createSocialConnectionController");
const updateSocialConnection = require("./controllers/socialConnections/updateSocialConnectionController");
const deleteSocialConnection = require("./controllers/socialConnections/deleteSocialConnectionController");

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

app.use("/public", express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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
    controlPermission(req, res, "superadmin", getUsers);
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

app.get("/blogs", async (req, res) => {
  getBlogs(req, res);
});

app.post(
  "/blogs",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    controlPermission(req, res, "create_blog", createBlog);
  }
);

app.put(
  "/blogs/:blogId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    controlPermission(req, res, "update_blog", updateBlog);
  }
);

app.delete(
  "/blogs/:blogId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    controlPermission(req, res, "delete_blog", deleteBlog);
  }
);

app.post(
  "/images",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    controlPermission(req, res, "upload_image", uploadImage);
  }
);

app.delete(
  "/images/:imageId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    controlPermission(req, res, "delete_image", deleteImage);
  }
);

app.get("/images", async (req, res) => {
  getImages(req, res);
});

app.get("/menus", async (req, res) => {
  getMenus(req, res);
});

app.post(
  "/menus",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    controlPermission(req, res, "create_menu", createMenu);
  }
);

app.put(
  "/menus/:menuId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    controlPermission(req, res, "update_menu", updateMenu);
  }
);

app.delete(
  "/menus/:menuId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    controlPermission(req, res, "delete_menu", deleteMenu);
  }
);

app.get(
  "/entityLogs",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    controlPermission(req, res, "superadmin", getLogs);
  }
);

app.get(
  "/socialConnections",
  async (req, res) => {
    getSocialConnections(req,res)
  }
);

app.post(
  "/socialConnections",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    controlPermission(req, res, "create_social_connection", createSocialConnection);
  }
);

app.put(
  "/socialConnections/:socialConnectionId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    controlPermission(req, res, "update_social_connection", updateSocialConnection);
  }
);

app.delete(
  "/socialConnections/:socialConnectionId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    controlPermission(req, res, "delete_social_connection", deleteSocialConnection);
  }
);

app.listen(5002, () => {
  console.log("Sunucu 5002 numaralı portta çalışıyor...");
});
