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

client.on("guildMemberAdd", (member) => {
  console.log(`New User "${member.user.username}" has joined "${member.guild.name}"` );
  member.guild.channels.get("welcome").send(`"${member.user.username}" has joined this server`);
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

client.on("guildMemberAdd", (member) => {
  const guild = member.guild;
  if (!newUsers[guild.id]) newUsers[guild.id] = new Discord.Collection();
  newUsers[guild.id].set(member.id, member.user);

  if (newUsers[guild.id].size > 10) {
    const userlist = newUsers[guild.id].map(u => u.toString()).join(" ");
    guild.channels.get(guild.id).send("Welcome our new users!\n" + userlist);
    newUsers[guild.id].clear();
  }
});

client.on("guildMemberRemove", (member) => {
  const guild = member.guild;
  if (newUsers[guild.id].has(member.id)) newUsers.delete(member.id);
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
    .addField("Full Username", `${message.author.username}#${message.author.discriminator}`)
    .addField("ID", message.author.id)
    .addField("Created At", message.author.createdAt);
    
  message.channel.sendEmbed(embed);
  }

});
  

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
