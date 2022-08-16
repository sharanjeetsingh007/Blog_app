const express = require('express');
const app = express();
const cors = require('cors')
const mongoose = require("mongoose");
const db = require("./modals")
const cookieParser = require("cookie-parser");
const path = require("path")
require('dotenv').config();

// ** MIDDLEWARE ** //
const whitelist = ['http://localhost:3000', 'http://localhost:9000', 'https://blog-app-sharan.herokuapp.com']
const corsOptions = {
    origin: function (origin, callback) {
        console.log("** Origin of request " + origin)
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            console.log("Origin acceptable")
            callback(null, true)
        } else {
            console.log("Origin rejected")
            callback(new Error('Not allowed by CORS'))
        }
    }
}
// Cors setup
app.use(cors(corsOptions))



app.use(cookieParser())



const PASSWORD = "123qweasdzxc"
const URL = `mongodb+srv://sharan:${PASSWORD}@cluster0.csjiyh6.mongodb.net/?retryWrites=true&w=majority`;


// Using format json()
app.use(express.json());


// Routes
const defaultRoute = require('./routes/default')
app.use("/default", defaultRoute);
// Auth routes
const authRoute = require("./routes/auth");
app.use("/auth", authRoute);
// Posting blog to database
const blogPostRoute = require('./routes/blogPost')
app.use("/blogPost", blogPostRoute)
// Comments route
const commentsRoute = require("./routes/comments");
app.use("/comments", commentsRoute)



// Mongodb connnect
const connect = async () => {

    try {
        await mongoose.connect(URL);
        let db = mongoose.connection;

        db.on("error", (err) => {
            console.log(err, 'Err in db')
        })

        console.log("Connect to MongoDB");
    } catch (err) {
        console.error(err, 'errrrrrrrr');
    }


}


connect()



if (process.env.NODE_ENV === "production") {
    // Server any static files
    app.use(express.static(path.join(__dirname, "client/build")));
    // Handle React routing, return all requests to React app
    app.get("*", function (req, res) {
        res.sendFile(path.join(__dirname, "client/build", "index.html"));
    })
}


const port = process.env.PORT || 9000;

app.listen(port, () => {
    console.log(`Server is running on Port ${port}`)
})