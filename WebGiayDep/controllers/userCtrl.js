const Users = require('../models/userModel')
const bcrypt= require('bcrypt')

const userCtrl = {
    register: async(req,res)=>{
        try {

            const {name,email,password} = req.body;
            const user = await Users.findOne({email})
            if(user)
                return res.status(400).json({msg:"Email đã tồn tại."})
            if(password.length<6)
                return res.status(400).json({msg:"Mật khẩu phải có ít nhất 6 ký tự."})


            
            //password Encryption
            const passwordHash = await bcrypt.hash(password,10)
            const newUser = new Users({
                name, email, password: passwordHash
            })
            
            // Save mongodb
            await newUser.save()
            res.json({msg: "Đăng ký thành công"})    
            //res.json(newUser)
            
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}

module.exports = userCtrl