const sendResponse = require("../../helpers/sendResponse");
const Blog = require("../../models/blogModel");
const logger = require('../../helpers/logger/logger')

const myLogger = logger();
function updateBlogDeletion(req, res) {
    if (req.user.roles.indexOf('superadmin') > -1) {
        Blog.findById(req.params.blogId).then((blog) => {
            Blog.findByIdAndUpdate(req.params.blogId, {
                isDeleted: req.body.isDeleted
            }).then((response) => {
                myLogger.logEntityWithActionType(req.user, "blogs", updatedBlog, response);
                sendResponse(true, "oldBlog", response, res, 200);
            }).catch(err => sendResponse(false, "message", err, res, 200));
        });
    } else {
        Blog.findById(req.params.blogId).then((blog) => {
            if (blog.creatorId == req.user._id.toString()) {
                Blog.findByIdAndUpdate(req.params.blogId, {
                    isDeleted: req.body.isDeleted
                }).then((response) => {
                    myLogger.logUpdatedEntity(req.user, "blogs", updatedBlog, response);
                    sendResponse(true, "oldBlog", response, res, 200);
                }).catch(err => sendResponse(false, "message", err, res, 200));
            }
        });
    }
}

module.exports = updateBlogDeletion;