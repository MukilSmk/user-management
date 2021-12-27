import express from 'express'
import morgan from 'morgan'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import userRoutes from './routes/users.js'
import swaggerUI from 'swagger-ui-express'
import YAML from 'yamljs'
const swaggerJsdocs = YAML.load('./src/api.yaml')

/**
 * express declaration
 */
const app = express()
app.use(morgan('dev'));


const port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/user-list');
mongoose.connection.once('open',function(){
  console.log('DB connected');
}).on('error',function(error){
  console.log('error is:',error)
})


/**
 * Bodyparser Middleware
 */
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerJsdocs))

/**
 * Routes Middleware
 */
app.use('/users', userRoutes)

/**
 * Error Creation Middleware
 */
app.use((req, res, next) => {
    const error =new Error("not found");
    error.status = 404;
    next(error);
});
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});





app.listen(port, () =>{
    console.log(`Server running on ${port}`)
})




