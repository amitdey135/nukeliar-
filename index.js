const Discord = require('discord.js');
const client = new Discord.Client();
require('dotenv').config()
const { InteractionResponseType, InteractionType, verifyKey } = require('discord-interactions');

const API_ENDPOINT = process.env.API_ENDPOINT || 'https://discord.com/api/v8';
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const CLIENT_PUBLIC_KEY = process.env.CLIENT_PUBLIC_KEY;


client.on('ready', () => {
  console.log( ${client.user.tag} ready to launce!);
});
 
client.on('message', msg => {
  if (msg.content === 'YOUR MSG') {
    msg.reply('REPLYING MSG');
  }
});
 
module.exports.myInteraction = async (req, res) => {
  // Verify the request
  const signature = req.get('X-Signature-Ed25519');
  const timestamp = req.get('X-Signature-Timestamp');
  const isValidRequest = await verifyKey(req.rawBody, signature, timestamp, CLIENT_PUBLIC_KEY);
  if (!isValidRequest) {
    return res.status(403).end('Bad request signature');
  }

  // Handle the payload
  const interaction = req.body;
  if (interaction && interaction.type === InteractionType.COMMAND) {
    if (interaction.data.name == "randomnumber") {
      res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          embeds: [{
            title: "Random number",
            description: Math.floor(Math.random() * 101)
          }]
        }
      })
    } else if (interaction.data.name == "bg") {
      res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: "<@445355215013806081> est trop bg"
        }
      })
    } else {
      res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: `You used: ${interaction.data.name}`,
        },
      });
    }  
  } else {
    res.send({
      type: InteractionResponseType.PONG,
    });
  }
};

client.login('TOKEN');
