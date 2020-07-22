const Discord = require("discord.js");
//const client = new Discord.Client();
const { Client, RichEmbed } = require('discord.js');
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
client.on("ready",function(ready){
client.user.setActivity('For !help', { type: 'Watching' })
  .then(presence => console.log(`Bot On Ya YEET`))
  .catch(console.error);
});
var prefix = '!';
var token = '';
//Welcome Message!!
client.on('guildMemberAdd', function(member){
    if(member.guild.id == '704157634881650690'){
    var newuserembed = new RichEmbed()
    .setTitle(`${member.user.username} has joined!`)
    .setColor(member.displayHexColor)
    .setThumbnail(`${client.users.fetch(`${member.id}`).displayAvatarURL}`)
    .setTimestamp(member.joinedTimestamp)
    .setFooter(`${client.guilds.get('704157634881650690').memberCount} members`)
    .addField(`User's Discord ID:`,`${member.id}`)
    client.guilds.get('704157634881650690').channels.get('704157635355607122').send(newuserembed).catch(err => {
      console.log(err)
    });
    client.guilds.get('704157634881650690').channels.get('704157635355607122').send(`Welcome <@${member.id}> to Wally's World. We hope you enjoy your stay!`)
    }
});
var ArrayWithReactRoles = [
    {
      "Message ID": "735597079883415654",
      "Role ID": "735539243417337866",
      "Role Name": "Minecraft"
    },
    {
      "Message ID": "735597105565139059",
      "Role ID": "735539280570744913",
      "Role Name": "Rocket League"
    }];

client.on('messageReactionAdd',async (reaction, user) => {
	// When we receive a reaction we check if the reaction is partial or not
	if (reaction.partial) {
		// If the message this reaction belongs to was removed the fetching might result in an API error, which we need to handle
		try {
			await reaction.fetch();
		} catch (error) {
			console.log('Something went wrong when fetching the message: ', error);
			// Return as `reaction.message.author` may be undefined/null
			return;
		}
	}
    if(user.bot == false){
    //Message React For Role!!
    i=0;
    for(i=0;i<ArrayWithReactRoles.length;i++){
      if(reaction.message.id == ArrayWithReactRoles[i]["Message ID"]){
        await reaction.message.guild.roles.fetch(ArrayWithReactRoles[i]["Role ID"]).then(function(role){
        z=i;
        reaction.message.guild.members.fetch(user.id).then(function(data){
            data.roles.add(role).then(function(err){
            reaction.message.guild.members.fetch(user.id).then(function(test){
             test.send(`You were given the ${ArrayWithReactRoles[z]["Role Name"]} role!`);
            })
        })});
        });
        };
      };
    };
});
client.login(token);