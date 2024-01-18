import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import { fileURLToPath } from 'url';
import path from "path";

// env config
dotenv.config();

// router import




//Database connect 
connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//rest objejt;
const app = express();


//middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, "./client/build")));


// rest api

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/blog', blogRoutes);

app.use("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
  // res.send("<h1>Welcome to the newbazar</h1>")
});


//port 
const PORT = process.env.PORT || 8080;
//listen 
app.listen(PORT, () => {
    console.log(
      `Server Running on ${process.env.DEV_MODE} mode on ${PORT} `.bgCyan
        .white
    );
  });
