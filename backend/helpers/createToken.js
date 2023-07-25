function createToken(user, jwt, getSecretKey) {
  const payload = {
    id: user._id,
    username: user.username,
    password: user.password,
    roleId: user.roleId,
  };
  const token = jwt.sign(payload, getSecretKey());

  return token;
}

module.exports = createToken;
