const sendResponse = require("../../helpers/sendResponse");
const logger = require("../logger/logger");
const Blog = require("../../models/blogModel");

const myLogger = logger();
function updateBlog(req, res) {
  const { title, content, blogImageName } = req.body;
  const updatedBlog = { title, content, blogImageName };

  Blog.findById(req.params.blogId).then((blog) => {
    Blog.findOne({ title: req.body.title }).then((response) => {
      if (response == null) {
        Blog.findByIdAndUpdate(req.params.blogId, {
          title: req.body.title,
          content: req.body.content,
          blogImageName: req.body.blogImageName,
        }).then((response) => {
          myLogger.logUpdateAction(req.user, "blogs", updatedBlog, response);
          sendResponse(true, "oldBlog", response, res, 200);
        });
        } else {
            sendResponse(
            false,
            "message",
            "Bu Title ile kayıtlı kullanıcı var",
            res,
            200
            );
        }
    });
  });
}

module.exports = updateBlog;
