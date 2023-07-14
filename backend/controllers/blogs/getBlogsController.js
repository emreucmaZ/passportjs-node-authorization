const sendResponse = require("../../helpers/sendResponse");
const Blog = require("../../models/blogModel");

function getBlogs(req,res){
    Blog.find({}).then(async(result) => {
        sendResponse(true, "blogs", result, res, 200);
      });
}

module.exports = getBlogs;