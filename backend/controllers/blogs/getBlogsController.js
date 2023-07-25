const sendResponse = require("../../helpers/sendResponse");
const Blog = require("../../models/blogModel");

function getBlogs(req,res){
    Blog.find({}).then(async(result) => {
      const filteredBlogs = result.filter(blog => blog.isDeleted == false && blog.isApproved == true);
        sendResponse(true, "blogs", filteredBlogs, res, 200);
      });
}

module.exports = getBlogs;