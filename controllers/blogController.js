

import mongoose from "mongoose";
import blogModel from "../models/blogModel.js";
import userModel from "../models/userModel.js";


//get all blogs
export const getAllBlogsController = async (req, res) => { 
    try {

        const blogs = await blogModel.find({}).populate("user");
        return res.status(200).send({
            blogCount: blogs.length,
            message: 'all blogs data',
            success: true,
            blogs,
        });

    } catch (error) { 
        console.log(error);
        return res.status(500).send({
            message: 'Error in getting all user',
            success: true,
            error
        })
    }
}


//get all blogs
export const createBlogController = async (req, res) => {
    try { 
        const { title, description, image,user } = req.body;
        if (!title || !description || !image || !user) { 
            return res.status(400).send({
                success: false,
                message: 'Please provide all the field',
                
            });
        }

        const existingUser = await userModel.findById(user);
        if (!existingUser) { 
            return res.status(400).send({
                success: false,
                message:"Unable to find the user"
            })
        }
 

        const newBlog = new blogModel({ title, description, image,user });
        const session = await mongoose.startSession();
        session.startTransaction();
        await newBlog.save({ session });
        existingUser.blogs.push(newBlog);
        await existingUser.save({ newBlog });
        await session.commitTransaction();
        await newBlog.save();
        return res.status(200).send({
            success: true,
            message: "blog Created",
            newBlog
        })
    } catch (error) {
        return res.status(500).send({
            success:false,
            message: "error while creating blog",
            error
        })
    }
 }


//get all blogs
export const updateBlogController = async (req, res) => { 
    try { 
        const { id } = req.params;
        const { title, description, image } = req.body;
        const blog = await blogModel.findByIdAndUpdate(
            id,
            { ...req.body },
            { new: true }
        );
        return res.status(200).send({
            success: true,
            message: "Blog Updated",
            blog,
        }); 

    } catch (error) {
        return res.status(500).send({
            success:false,
            message: "error while updating blog",
            error,
        })
    }
}


//get all blogs
export const getBlogByIdController = async (req, res) => {
    try { 

        const { id } = req.params;
        const blog = await blogModel.findById(id);
        if (!blog) { 
            return res.status(404).send({
                success: false,
                message: "blog not found"
            });
        }

        return res.status(200).send({
            success: true,
            message: "fetching the blog",
            blog
        })

    } catch (error) {
        return res.status(500).send({
            success:false,
            message: "error while getting blog",
            error
        })
    }
 }


//get all blogs
export const deleteBlogController = async (req, res) => { 
    try { 
        const blog = await blogModel.findByIdAndDelete(req.params.id).populate("user");
        if(!blog){ 
            return res.status(400).send({
                success: false,
                message:"Didnot find the blog"
            });
        }
        await blog.user.blogs.pull(blog);
        await blog.user.save();

        return res.status(200).send({
            success: true,
            message: "Blog Deleted"
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message: "error while getting blog",
            error
        })
    }
}



//get all blogs of user
export const userBlogController = async (req, res) => {
    try { 

        const { id } = req.params;
        const userBlog = await userModel.findById(id).populate("blogs");
        if (!userBlog) { 
            return res.status(404).send({
                success: false,
                message: "blog not found"
            });
        }

        return res.status(200).send({
            success: true,
            message: "fetching the blog",
            // userBlogCount:userBlog.length(),
            userBlog
        })

    } catch (error) {
        return res.status(500).send({
            success:false,
            message: "error while getting blog",
            error
        })
    }
 }
