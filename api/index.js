const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");
// const userRoute = require("./routes/users");
const auth = require("./routers/auth_router.js");
// const postRoute = require("./routes/posts");
// const conversationRoute = require("./routes/conversations");
// const messageRoute = require("./routes/messages");
const router = express.Router();
const path = require("path");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");



// paths = '../'
const options_swagger = {
    swaggerDefinition: {
        openapi: "3.1.0",
        securityDefinitions: {
            bearerAuth: {
                type: "apiKey",
                name: "Authorization",
                scheme:"bearer",
                in: "header",
            },
        },
    },

    apis: ['./routers/auth_router.js'],
};
const specs = swaggerJsDoc(options_swagger);

dotenv.config();

let url = process.env.MONGO_URL
let options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // authMechanism: "DEFAULT"
}
mongoose.connect(url, options).then(
    () => {
        console.log('db connected')
    },
    err => {
        console.log('connect fail')
    }
);
const app = express();
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));


app.use("/docs", swaggerUI.serve, swaggerUI.setup(specs));
app.use("/api/auth", auth);
app.listen(8000, () => console.log(`The server is running on port ${8000}`));