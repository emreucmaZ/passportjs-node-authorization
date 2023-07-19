const sendResponse = require("../../helpers/sendResponse");
const Blog = require("../../models/blogModel");
const logger = require('../../helpers/logger/logger');

const myLogger = logger();
async function deleteBlog(req, res) {
    Blog.findByIdAndDelete(req.params.blogId)
      .then((response) => {
        myLogger.logDeletedEntity(req.user,"blogs",response)
        sendResponse(true, "message", "Blog yazısı Silindi", res, 204);
      })
      .catch((err) => {
        sendResponse(false, "message", "Blog Yazısı Silinemedi", res, 401);
      });
}

module.exports = deleteBlog;
