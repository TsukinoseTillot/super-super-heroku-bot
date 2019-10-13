const Discord = require("discord.js");

const client = new Discord.Client();
const config = require("./config.json");

const weather = require('weather-js');

const { Client, Attachment } = require('discord.js');

const osu = require('node-osu');
const api = new osu.Api(process.env.OSU_API , {
    notFoundAsError: true,
    completeScores: false 
})

client.on("ready", () => {
 
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 

  client.user.setActivity(`Should be done now`);
});


client.on("message", async message => {
  if(message.author.bot) return;
  if(message.content.indexOf(config.prefix) !== 0) return;
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
  if(command === "ping") {

    const m = await message.channel.send("Ping?");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
  }
 

	
  if(command === "kick") {
    if(!message.member.roles.some(r=>["No Admin lol", "Mod o/"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");
    let member = message.mentions.members.first();
    if(!member)
      return message.reply("Please mention a valid member of this server");
    if(!member.kickable) 
      return message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");
    

    let reason = args.slice(1).join(' ');
    if(!reason)
      return message.reply("Please indicate a reason for the kick!");

    await member.kick(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
    message.reply(`${member.user.tag} has been kicked by ${message.author.tag} because: ${reason}`);

  }
  
  if(command === "ban") {

    if(!message.member.roles.some(r=>["No Admin lol"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");
    
    let member = message.mentions.members.first();
    if(!member)
      return message.reply("Please mention a valid member of this server");
    if(!member.bannable) 
      return message.reply("I cannot ban this user! Do they have a higher role? Do I have ban permissions?");

    let reason = args.slice(1).join(' ');
    if(!reason)
      return message.reply("Please indicate a reason for the ban!");
    
    await member.ban(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
    message.reply(`${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`);
  }
  
  if(command === "purge") {
  	if(!message.member.roles.some(r=>["No Admin lol", "Moderator"].includes(r.name)))
  		return message.reply("Sorry, you don't have permission to use this lol");

    const deleteCount = parseInt(args[0], 10);
    
    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");
    

    const fetched = await message.channel.fetchMessages({count: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
}

    if(command === "sayannouncement") {
    	    if(!message.member.roles.some(r=>["No Admin lol"].includes(r.name)) )
      		return message.reply("Sorry, only owner can use this!");
	const sayMessage = args.join(" ");
	    	if(!sayMessage)
			return message.reply(`Please put any text here`)
   	var generalChannel = client.channels.get("497404354756739091");
        generalChannel.send(sayMessage);
    }

   if (command == "chatpicture") {
		if(!message.member.roles.some(r=>["No Admin lol"].includes(r.name)) )
		return message.reply("Sorry, only admin can use this command o/");
	const picture = args.join(" ");
		if(!picture)
		return message.reply(`Please put your link or file to proceed`)
	var generalChannel = client.channels.get("527442763223007232");
	const attachment = new Attachment(picture);
	generalChannel.send(attachment);
    }

  if(command === "osu") {
    if (!args[0]) return message.channel.send('Please, provide a valid user\'s nickname! (osu!)')
  const username = args.join(" ");
  api.getUser({u: username}).then(user => {
    const embed = new Discord.RichEmbed()
    .setTitle(`osu! status`)
    .setDescription(`[${user.name}](http://osu.ppy.sh/users/${user.id})`)
    .setThumbnail(`http://s.ppy.sh/a/${user.id}}`)
    .setColor("#D0436A")
    .addField('Nickname', user.name, true)
    .addField('PP', Math.round(user.pp.raw), true)
    .addField('Rank', user.pp.rank, true)
    .addField('Level', Math.round(user.level), true)
    .addBlankField()
    .addField('Country', user.country, true)
    .addField('Country Rank', user.pp.countryRank, true)
    .addField('Playcount', user.counts.plays, true)
    .addField('Accuracy', `${user.accuracyFormatted}`, true)
    .setFooter('Requested By ' + message.author.tag, message.author.avatarURL)
    message.channel.send(embed)
    
  })

  }

	
});
const prefix = "!";
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
    .addField("Joined this server at" , message.guild.joinedAt)
    .setThumbnail(message.author.avatarURL)
    .setFooter("This bot is personal use only");
  message.channel.send(embed);
  }
 
    if(message.content.startsWith(prefix + "serverinfo")){
    let embed = new Discord.RichEmbed()
    .setAuthor("Server info")
    .setColor("3DB6F3")
    .addField("Member count + bots" , message.guild.memberCount, true)
    .addField("Name server" , message.guild.name, true)
    .addField("created at" , message.guild.createdAt)
    .addField("Default role" , message.guild.defaultRole)
    .addField("Owner on this server" , message.guild.owner)
    .setThumbnail(message.guild.iconURL);
   message.channel.send(embed);
 }
 	if(message.content.startsWith(prefix + "avatar")){
 	let embed = new Discord.RichEmbed()
 	.setAuthor(message.author.username)
 	.setImage(message.author.avatarURL)
 	message.channel.send(embed);
}
	
 if (message.content.startsWith(prefix + 'weather')) {

        	let args = message.content.split(" ").slice(1);
        weather.find({search: args.join(" "), degreeType: 'C'}, function(err, result) { // Make sure you get that args.join part, since it adds everything after weather.
            if (err) message.channel.send(err);

            // We also want them to know if a place they enter is invalid.
            if (result.length === 0) {
                message.channel.send('**Please enter a valid location.**') // This tells them in chat that the place they entered is invalid.
                return; // This exits the code so the rest doesn't run.
            }

            // Variables
            var current = result[0].current; // This is a variable for the current part of the JSON output
            var location = result[0].location; // This is a variable for the location part of the JSON output

            // Let's use an embed for this.
            const embed = new Discord.RichEmbed()
                .setDescription(`**${current.skytext}**`) // This is the text of what the sky looks like, remember you can find all of this on the weather-js npm page.
                .setAuthor(`Weather for ${current.observationpoint}`) // This shows the current location of the weather.
                .setThumbnail(current.imageUrl) // This sets the thumbnail of the embed
                .setColor(0x00AE86) // This sets the color of the embed, you can set this to anything if you look put a hex color picker, just make sure you put 0x infront of the hex
                .addField('Timezone',`UTC${location.timezone}`, true) // This is the first field, it shows the timezone, and the true means `inline`, you can read more about this on the official discord.js documentation
                .addField('Degree Type',location.degreetype, true)// This is the field that shows the degree type, and is inline
                .addField('Temperature',`${current.temperature} Degrees`, true)
                .addField('Feels Like', `${current.feelslike} Degrees`, true)
                .addField('Winds',current.winddisplay, true)
                .addField('Humidity', `${current.humidity}%`, true)

                // Now, let's display it when called
                message.channel.send({embed});
        });
    }
 
});



client.login(process.env.BOT_TOKEN);
