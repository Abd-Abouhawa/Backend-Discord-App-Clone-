const express = require('express');
const http = require('http');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config({path : './config.env'});


const socketServer = require('./socketServer');
const authRouter = require('./routes/authRoutes');
const friendInvitationRouter = require('./routes/friendInvitationRoutes');

const port = process.env.PORT || process.env.API_PORT;
const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.use('/api/auth' , authRouter);
app.use('/api/friend-invitation' , friendInvitationRouter);

const server = http.createServer(app);
socketServer.registerSocketServer(server);

server.listen(port , ()=>{
  console.log(`server is up on port ${port}`);
}); 

mongoose.connect(process.env.MONGO_URI)
        .then(()=>{
          console.log("DB connection successfully!");
        })
        .catch(err => console.log("Failed to connect to Mongo!" , err));