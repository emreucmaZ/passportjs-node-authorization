const sendResponse = require("../../helpers/sendResponse")
const Blog = require("../../models/blogModel")

function getUnapprovedBlogs(req,res){
    if(req.user.roles.indexOf('superadmin')>-1){
        Blog.find({}).then(result=>{
            const unapprovedBlogs = result.filter(blog=>blog.isApproved == false)
            sendResponse(true,"blogs",unapprovedBlogs,res,200)
        }).catch(err=>{
            res.send(err)
        })
    }else{
        Blog.find({}).then(result=>{
            const unapprovedBlogs = result.filter(blog=>blog.isApproved == false && blog.creatorId == req.user._id.toString())
            sendResponse(true,"blogs",unapprovedBlogs,res,200)
        }).catch(err=>{
            res.send(err)
        })
    }
}

module.exports = getUnapprovedBlogs