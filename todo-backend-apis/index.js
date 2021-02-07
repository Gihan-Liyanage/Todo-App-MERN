const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const todoRouter = require('./routes/todos');
const userSignInRouter = require('./routes/signup');
const userLoginRouter = require('./routes/login');

const app = express();

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            version: "1.0.0",
            title: "Ascentic Todo API",
            description: "Backend API for todo list application",
            contact: {
                name: "Gihan Liyanage"
            },
            servers: ["http://localhost:5000"]
        }
    },
    // ['.routes/*.js']
    apis: ['.routes/*.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));



// Configure environment variables
require('dotenv').config()


// Middlewares
app.use(cors());
app.use(express.json());
app.use('/api/todos', todoRouter);
app.use('/api/users', userSignInRouter)
app.use('/api/login', userLoginRouter);

// Getting connection string
const connection_string = process.env.CONNECTION_STRING
const port = process.env.PORT || 5000

// Connecting to the database (MongoDB Atlas)
mongoose.connect(connection_string, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
    .then(() => console.log("Connection was Initiated!"))
    .catch(err => console.error(err));

app.listen(port, () => {
    console.log("Server Started on port:", port);
})
