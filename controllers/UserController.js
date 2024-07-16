const UserModel = require('../models/user')
const cloudinary = require("cloudinary").v2;
const bcrypt = require("bcrypt");

cloudinary.config({
    cloud_name: "dz1a8rqru",
    api_key: "338418898143193",
    api_secret: "MUImai747SA8fjJXw0JYll2y5es",
  });

class UserControllher{
    static getAllUser = async (req,res)=>{
        try {
            res.send('Heellooo API User')
            
        } catch (error) {
            console.log(error);
        }
    
    }
    
    static userInsert = async (req,res)=>{
        try {
            // console.log(req.files.image);
            const file = req.files.image;
            const imageUpload = await cloudinary.uploader.upload(file.tempFilePath, {
              folder: "profileAPI",
            });
            // console.log(imageUpload);
            //console.log(req.body)
            const { n, e, p, cp } = req.body;
      
            const user = await UserModel.findOne({ email: e }); //find one record
            // console.log(user)
      
            if (user) {
              res.status(401).json({status: "failed",message:"THIS EMAIL IS ALREADY EXITS"})
            } else {
              if (n && e && p && cp)
                if (p == cp) {
                  const hashpassword = await bcrypt.hash(p, 10); // secure password
                  const result = new UserModel({
                    //model : view
                    name: n,
                    email: e,
                    password: hashpassword,
                    image: {
                      public_id: imageUpload.public_id,
                      url: imageUpload.secure_url,
                    },
                  });
                  await result.save();
                  res.status(201).json({status: "success",message:"Registration Successful"})
                } else {
                    res.status(401).json({status: "failed",message:"PASSWORD & CONFIRM PASSWORD DOES NOT MATCH!"})
                }
                else {
                    res.status(401).json({status: "failed",message:"ALL FIELD REQUIRED"})
                }
              } 
            
            } 
           catch (error) {
            console.log(error);
          }
    }

}

module.exports=UserControllher