const sendResponse = require("../../helpers/sendResponse");
const Blog = require("../../models/blogModel");
const logger = require("../../helpers/logger/logger");

const myLogger = logger();
function updateBlogApprove(req, res) {
  Blog.findById(req.params.blogId).then((blog) => {
    Blog.findByIdAndUpdate(req.params.blogId, {
      isApproved: req.body.isApproved,
    })
      .then((response) => {
        myLogger.logUpdatedEntity(req.user, "blogs", response, blog);
        sendResponse(true, "oldBlog", response, res, 200);
      })
      .catch((err) => sendResponse(false, "message", err, res, 200));
  });
}

module.exports = updateBlogApprove;
