const Discord = require("discord.js");
const client = new Discord.Client({disableEveryone: true});
const prefix = "!"
const swearWords = ["fuck", "asshole","shit", "bullshit", "motherfucker", "cocksucker", "cunt", "tits"];


client.on("ready", async () => {
  console.log("yes im ready!");
});

client.on("ready", () => {
  client.user.setGame(`with ${client.guilds.size} servers, ${client.users.size} users`);
  console.log(`Ready to serve on ${client.guilds.size} servers, for ${client.users.size} users.`);
});

client.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;
  
  let messageArray = message.content.split(" ");
  let command = messageArray[0];
  let args = messageArray.slice(1);
  
  if(!command.startsWith(prefix)) return;
  
  if(command === `${prefix}userinfo`) {
      let embed = new Discord.RichEmbed()
    .setAuthor(`${message.author.username} info`)
    .setColor("AF5AFF")
    .addField("Full Username", `${message.author.username}#${message.author.discriminator}`, true)
    .addField("ID", message.author.id, true)
    .addField("Created At", message.author.createdAt)
    .setThumbnail(message.author.avatarURL)
    .setFooter("This bot is personal use only");
  message.channel.send(embed);
  }

   if(message.content.startsWith(prefix + "about")){
    let embed = new Discord.RichEmbed()
    .setAuthor("Tsukibot")
    .setDescription("This bot is for personal use only.. not public user")
    .setColor("3DB6F3");
   message.channel.send(embed);
 }
  
});

 client.on("message", async (message) => {
	if (message.author.bot) return;
	if (!message.content.startsWith(prefix)) return;
	
	let command = message.content.split(" ")[0];
	command = command.slice(prefix.length);
	
	let args = message.content.split(" ").slice(1);

if(command === "ping") {
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
  }
     if(command === "sayd") {
    const sayMessage = args.join(" ");
    message.delete().catch(O_o=>{}); 
    message.channel.send(sayMessage);
  }
        if(command === "say") {
    const sayMessage = args.join(" ");
    message.channel.send(sayMessage);
  }
     if(command === "prune") {
    const deleteCount = parseInt(args[0], 10);
    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");
    const fetched = await message.channel.fetchMessages({count: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
  }
    });

client.on("message", (message) => {
  if(message.author.bot) return;
     if (message.content.startsWith("owo")) {
    message.channel.send("What's this!");
  }
  });
  
  client.on("message", (message) => {
  if(message.author.bot) return;
     if (message.content.startsWith("OwO")) {
    message.channel.send("What's this!");
  }
  
   });
  client.on("message", (message) => {
  if(message.author.bot) return;
     if (message.content.startsWith("Owo")) {
    message.channel.send("What's this!");
  }
  
  client.on("message", (message) => {
  if(message.author.bot) return;
     if (message.content.startsWith("owO")) {
    message.channel.send("What's this!");
  }
   });
    
    client.on("message", (message) => {
  if(message.author.bot) return;
     if (message.content.startsWith("OWO")) {
    message.channel.send("What's this!");
  }

    });
  client.on("message", (message) => {  
if( swearWords.some(word => message.content.includes(word)) ) {
  message.reply("Oh no you said a bad word!!!");
  message.delete();
  }
});

  
  
});
client.login(process.env.BOT_TOKEN);
