const sendResponse = require("../../helpers/sendResponse");
const logger = require("../../helpers/logger/logger");
const Blog = require("../../models/blogModel");

const myLogger = logger();
function updateBlog(req, res) {
  const { title, content, blogImageName } = req.body;
  const updatedBlog = { title, content, blogImageName };

  if (req.user.roles.indexOf('superadmin') > -1) {
    Blog.findById(req.params.blogId).then((blog) => {
      Blog.findByIdAndUpdate(req.params.blogId, {
        title: req.body.title,
        content: req.body.content,
        blogImageName: req.body.blogImageName,
      }).then((response) => {
        myLogger.logUpdatedEntity(req.user, "blogs", updatedBlog, response);
        sendResponse(true, "oldBlog", response, res, 200);
      }).catch(err => sendResponse(false, "message", err, res, 200));
    });
  } else {
    Blog.findById(req.params.blogId).then((blog) => {
      if (blog.creatorId == req.user._id.toString()) {
        Blog.findByIdAndUpdate(req.params.blogId, {
          title: req.body.title,
          content: req.body.content,
          blogImageName: req.body.blogImageName,
        }).then((response) => {
          myLogger.logUpdatedEntity(req.user, "blogs", updatedBlog, response);
          sendResponse(true, "oldBlog", response, res, 200);
        }).catch(err => sendResponse(false, "message", err, res, 200));
      }
    });
  }

}

module.exports = updateBlog;
