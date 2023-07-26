const sendResponse = require("../../helpers/sendResponse");
const Blog = require("../../models/blogModel");
const logger = require('../../helpers/logger/logger');

const myLogger = logger();
async function deleteBlog(req, res) {
    if(req.user.roles.indexOf('superadmin')>-1){
      Blog.findByIdAndUpdate(req.params.blogId,{
        isDeleted:true
      })
        .then((response) => {
          myLogger.logDeletedEntity(req.user,"blogs",response)
          sendResponse(true, "message", "Blog yazısı Silindi", res, 204);
        })
        .catch((err) => {
          sendResponse(false, "message", "Blog Yazısı Silinemedi", res, 401);
        });
    }else{
      Blog.findById(req.params.blogId).then((blog)=>{
        if(blog.creator._id.toString() == req.user._id.toString()){
          Blog.findByIdAndUpdate(req.params.blogId,{
            isDeleted:true
          })
            .then((response) => {
              myLogger.logDeletedEntity(req.user,"blogs",response)
              sendResponse(true, "message", "Blog yazısı Silindi", res, 204);
            })
            .catch((err) => {
              sendResponse(false, "message", "Blog Yazısı Silinemedi", res, 401);
            });
        }else{
          sendResponse(false, "message", "Yalnızca Kendi Blog Yazınızı Silebilirsiniz", res, 401);
        }
      })
    }
}

module.exports = deleteBlog;
