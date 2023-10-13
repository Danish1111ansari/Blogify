import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import colors from 'colors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import blogRoutes from './routes/blogRoutes.js';

// env config
dotenv.config();

// router import




//Database connect 
connectDB();

//rest objejt;
const app = express();


//middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));


// rest api
app.get('/', (req, res) => {
    res.status(200).send(
        { "message": "hello Danish" }
    )
});
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/blog', blogRoutes);


//port 
const PORT = process.env.PORT || 8080;
//listen 
app.listen(PORT, () => {
    console.log(
      `Server Running on ${process.env.DEV_MODE} mode on ${PORT} `.bgCyan
        .white
    );
  });
