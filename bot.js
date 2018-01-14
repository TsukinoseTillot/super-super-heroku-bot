const Discord = require('discord.js');
const client = new Discord.Client();

const swearWords = ["fuck", "asshole","shit", "bullshit, faggot"];
const prefix = "!";
const newUsers = [];


client.on("ready", () => {
  console.log("I am ready!");
});
client.on("ready", () => {
  client.user.setGame(`on ${client.guilds.size} servers`);
  console.log(`Ready to serve on ${client.guilds.size} servers, for ${client.users.size} users.`);
});

client.on("guildMemberAdd", member => {
   member.guild.defaultChannel.send("Welcome " + member.user.username)
});

client.on("guildMemberRemove", member => {
   member.guild.defaultChannel.send("Goodbye:" + member.user.username + ".See you next time")
});


client.on("message", (message) => {
  if (message.content.startsWith("owo")) {
    message.channel.send("What's this!");
  }
});

client.on("message", (message) => {
  if (!message.content.startsWith(prefix)) return;

  if (message.content.startsWith(prefix + "ping")) {
    message.channel.send("pong!");
  } else
  if (message.content.startsWith(prefix + "foo")) {
    message.channel.send("bar!");
  }
  
});
  client.on("message", (message) => {
  if (!message.content.startsWith(prefix)) return;

  if (message.content.startsWith(prefix + "avatar")) {
    message.channel.send(message.author.avatarURL);
  }
});

client.on("message", (message) => {  
if( swearWords.some(word => message.content.includes(word)) ) {
  message.reply("Oh no you said a bad word!!!");
  message.delete();
  }
});

client.on("message", message => {

  if(!message.content.startsWith(prefix)) return;
  
  if(message.content.startsWith(prefix + "userinfo")){
    let embed = new Discord.RichEmbed()
    .setAuthor(message.author.username)
    .setDescription("Userinfo")
    .setColor("AF5AFF")
    .addField("Full Username", `${message.author.username}#${message.author.discriminator}`)
    .addField("ID", message.author.id)
    .addField("Created At", message.author.createdAt);
    
  message.channel.sendEmbed(embed);
  }

});
  
client.on('message', message => {
    if(message.content.startsWith("!ping")) {
            message.channel.send(new Date().getTime() - message.createdTimestamp + "ms");        
    }
});

client.on("message", message => {

  if(!message.content.startsWith(prefix)) return;

 if(message.content.startsWith(prefix + "about")){
    let embed = new Discord.RichEmbed()
    .setAuthor("Tsukibot")
    .setDescription("This bot is for personal use only.. not public user")
    .setColor("3DB6F3");
   message.channel.send(embed);
 }
});


// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
