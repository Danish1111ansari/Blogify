


// get all user

import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";

export const getAllUsers = async (req, res) => {

    try {

        const users = await userModel.find({});
        return res.status(200).send({
            userCount: users.length,
            message: 'all users data',
            success: true,
            users,
        });

    } catch (error) { 
        console.log(error);
        return res.status(500).send({
            message: 'Error in getting all user',
            success: true,
            error
        })
    }
    
};


//creste new users


export const regitserController = async (req, res) => {

    try {
        const { username, email, password } = req.body;
        //validation
        if (!username || !email || !password) { 
            return res.status(400).send({
                message: "please fill all field",
                success:false
            })
        }

        //existing user

        const existingUser = await userModel.findOne({ email });

        if (existingUser) { 
            return res.status(400).send({
                message: 'user allready present',
                success:false
            })
        }
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        

        //save user

        const user =  new userModel({ username, email, password:hashedPassword});
        await user.save();
        res.status(200).send({
            message: "new user added",
            success: true,
            user,
        });


    } catch(error) { 
        console.log(error);
        return res.status(500).send({
            message: "Error in Register calback",
            success: false,
            error
        })
    }

};


//login

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(404).send({
        message: "Invalid email or password",
        success: false,
      });
    }
    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(200).send({
        message: "Email is not registerd",
        success: false,
      });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }
  
    res.status(200).send({
      success: true,
      message: "login successfully",
      user
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};



