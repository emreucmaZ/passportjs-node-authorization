const sendResponse = require("../../helpers/sendResponse");
const Blog = require("../../models/blogModel");

function getApprovedBlogs(req, res) {
    if (req.user.roles.indexOf('superadmin') > -1) {
        Blog.find({}).then(result => {
            const approvedBlogs = result.filter(blog => blog.isApproved == true)
            sendResponse(true, "blogs", approvedBlogs, res, 200)
        }).catch(err => {
            res.send(err)
        })
    } else {
        Blog.find({}).then(result => {
            const approvedBlogs = result.filter(blog => {
                if(blog.isApproved == true && blog.creatorId == req.user._id.toString()){
                    return blog
                }
            })
            sendResponse(true, "blogs", approvedBlogs, res, 200)
        }).catch(err => {
            res.send(err)
        })
    }

}

module.exports = getApprovedBlogs;