import express from "express"
import { createBlogController, deleteBlogController, getAllBlogsController, getBlogByIdController, updateBlogController, userBlogController } from "../controllers/blogController.js";


//router object 
const router = express.Router();

//get all blogs
router.get('/all-blog', getAllBlogsController);

//post /create a blog;

router.post('/create-blog', createBlogController);

//update blog

router.put('/update-blog/:id', updateBlogController);


//get single blog
router.get('/get-blog/:id', getBlogByIdController);

//delete blog

router.delete('/delete-blog/:id', deleteBlogController);

//get user blog
router.get('/user-blog/:id', userBlogController);


export default router;