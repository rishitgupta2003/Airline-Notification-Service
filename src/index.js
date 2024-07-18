const express = require("express");
const amqplib = require("amqplib");
const { ServerConfig, Logger, mailUser } = require("./config");

const apiRoutes = require("./routes");

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

async function connectQueue(){
  try{
      const connection = await amqplib.connect("amqp://localhost");
      const channel = await connection.createChannel();
      
      await channel.assertQueue(ServerConfig.MESSAGE_QUEUE);
      channel.consume(ServerConfig.MESSAGE_QUEUE, async (data) => {
        console.log(`${Buffer.from(data.content)}`);
        const object = JSON.parse(`${Buffer.from(data.content)}`);
        mailUser(object.recepientEmail, object.subject, object.content)
        channel.ack(data);
      })


  }catch(error){
      console.log(error);
  }
}

app.use("/api", apiRoutes);

app.listen(ServerConfig.PORT, () => {
  console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
  Logger.info("Successfully started the server", "root", { msg: "something" });
  connectQueue().then(console.log("QUEUE IS UP"));

});
