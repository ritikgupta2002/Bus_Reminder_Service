const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const { PORT } = require("./config/serverConfig");

// const jobs = require("./utils/job");

const TicketController=require("./controllers/ticket-controller");

const EmailService=require("./services/email-service");

const {subscribeMessage,createChannel}=require("./utils/messageQueue");

const{REMINDER_BINDING_KEY}=require("./config/serverConfig");

const setupAndStartServer = async () => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.post("/api/v1/tickets",TicketController.create);
  // jobs();

  const channel = await createChannel();
  subscribeMessage(channel,EmailService.subscribeEvents,REMINDER_BINDING_KEY);
  
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
};

setupAndStartServer();
