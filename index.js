const Discord = require('discord.js');
const client = new Discord.Client();


client.on('ready', () => {
  console.log( ${client.user.tag} ready to launce!);
});
 
client.on('message', msg => {
  if (msg.content === 'YOUR MSG') {
    msg.reply('REPLYING MSG');
  }
});
 
client.login('TOKEN');
