const sendResponse = require("../../helpers/sendResponse");
const logger = require("../logger/logger");
const Blog = require("../../models/blogModel");

const myLogger = logger();
function updateBlog(req, res) {
  const { title, content, blogImageName } = req.body;
  const updatedBlog = { title, content, blogImageName };

  Blog.findById(req.params.blogId).then((blog) => {
    Blog.findByIdAndUpdate(req.params.blogId, {
      title: req.body.title,
      content: req.body.content,
      blogImageName: req.body.blogImageName,
    }).then((response) => {
      myLogger.logUpdateAction(req.user, "blogs", updatedBlog, response);
      sendResponse(true, "oldBlog", response, res, 200);
    }).catch(err=>sendResponse(false, "message", err, res, 200));
  });
}

module.exports = updateBlog;
