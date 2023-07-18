const sendResponse = require("../../helpers/sendResponse");
const logger = require("../../helpers/logger/logger");
const Blog = require("../../models/blogModel");

const myLogger = logger();
function createBlog(req, res) {
  const newBlog = new Blog({
    title: req.body.title,
    content: req.body.content,
    blogImageName: req.body.blogImageName,
  });
      newBlog
        .save()
        .then((savedBlog) => {
          myLogger.logCreateAction(req.user, "blogs", savedBlog);
          return sendResponse(
            true,
            "message",
            "Yeni Blog kaydedildi",
            res
          );
        })
        .catch((error) => {
          return sendResponse(
            false,
            "message",
            "Blog kaydetme hatası: " + error,
            res
          );
        });
}

module.exports = createBlog;
