const { Client, MessageEmbed } = require("discord.js");
const client = new Client();
const prefix = "$";
const express = require("express");
const rbx = require("noblox.js");
const app = express();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`); //  `${prefix + "help"} | Powered by Kirby Studios`
  client.user.setPresence({ activity: { name: `${prefix}help | Powered by Kirby Studios` }, status: 'online' })
});


client.on('guildMemberAdd', async member => {
 await new Promise(resolve => setTimeout(resolve, 500));
 member.send(`Welcome to **Kirby Studios**! To verify, say **${prefix + "verify"}** in <#729053058914582678>`);
 });
  
  
client.on("message", async message => {
const args = message.content.slice(prefix.length).split(' ');
const command = args.shift().toLowerCase();         
  
  if(command === "announce") {
    if(!message.content.startsWith(`${prefix}announce`)) return;
    if (!message.author.id == '306767358574198786') return;
    const shout = await String(args.slice(0).join(" "))
    message.channel.send(shout)
    message.delete()
  }
  
    if(command === "verify") {
    let rolea = message.guild.roles.cache.find(r => r.name === "Member");
    if(message.member.roles.cache.some(r => r.name === "Member")) return;
    let role = message.guild.roles.cache.find(r => r.name === "Member");
      message.member.roles.add(role).catch(console.error);
      message.delete()
  }

  if (command === "suggest") {
    if(!message.content.startsWith(`${prefix}suggest`)) return;
    if(!args[0]) return message.channel.send("Please enter a suggestion.")
    const channels = message.member.guild.channels.cache.find(ch => ch.name === 'bots');
    const shout = await String(args.slice(0).join(" "))
    const embed = await new MessageEmbed() .setTitle('Suggestion') .setColor(0x0000FF) .setAuthor(message.member.user.tag) .setThumbnail(message.member.user.avatarURL) .setDescription(shout)
    channels.send(embed)
    
  }
  
  if(command === "rank") {
    if(!message.content.startsWith(`${prefix}rank`)) return;
    const channel = message.channel
    const perms = channel.permissionsFor(message.author);
    const rwarn = new MessageEmbed() .setTitle('Error') .setColor(0xFF0000) .setDescription('Please enter a RoleId.')
    const userwarn = new MessageEmbed() .setTitle('Error') .setColor(0xFF0000) .setDescription('Please enter a username.')
    const pwarn = new MessageEmbed() .setTitle('Insufficient Permissions') .setColor(0xFFFF00) .setDescription('You must have the "Manage Server" permission in order to rank group members.')
    if(!perms.has("MANAGE_GUILD")) return message.channel.send(pwarn)
    if(!args[0]) return message.channel.send(userwarn);
    if(!args[1]) return message.channel.send(rwarn);
    var groupId = 334423
    var cookie = process.env.cookie
    async function run() {
    await rbx.setCookie(process.env.cookie); } 
    
    run();
    var Username = args[0]
    var RoleId = Number(args[1])
    var UserId = await rbx.getIdFromUsername(Username)
    rbx.setRank(groupId, UserId, RoleId)
    await new Promise(resolve => setTimeout(resolve, 250));
    var RoleName = await rbx.getRankNameInGroup(groupId, UserId)
    const rankembed = new MessageEmbed() .setTitle('Success') .setColor(0x00FF00) .setDescription(`Ranked **${Username}** to **${RoleName}**`) .setFooter("If the user's rank didn't change, please DM Kirb.#7321");
    message.channel.send(rankembed)
  }
  
    if(command === "shout") {
    if(!message.content.startsWith(`${prefix}shout`)) return;
    const pwarn = new MessageEmbed() .setTitle('Insufficient Permissions') .setColor(0xFFFF00) .setDescription('You must have the "Manage Server" permission in order to shout.') 
    const noconwarn = new MessageEmbed() .setTitle('Error') .setColor(0xFF0000) .setDescription('Please enter a shout message.')
    const channel = message.channel
    const perms = channel.permissionsFor(message.author);
    if(!perms.has("MANAGE_GUILD")) return message.channel.send(pwarn)
    if(!args[0]) return message.channel.send(noconwarn); 
      
    var groupId = 334423
    var cookie = process.env.cookie
    async function run() {
    await rbx.setCookie(process.env.cookie); } 
    
    run();
      var shout = String(args.slice(0).join(" "))
      rbx.shout({ group: groupId, message: shout })
      const shoutembed = new MessageEmbed() .setTitle('Success') .setColor(0x00FF00) .setDescription(`Shout "**${shout}**" has been sent.`) .setFooter('A 401 error may occur. Because of this, it is recommended to run the command twice.');
    message.channel.send(shoutembed)
  }
  
   if (command === "exile") {
    if(!message.content.startsWith(`${prefix}exile`)) return;
    const pwarn = new MessageEmbed() .setTitle('Insufficient Permissions') .setColor(0xFFFF00) .setDescription('You must have the "Manage Server" permission in order to exile group members.') 
    const noconwarn = new MessageEmbed() .setTitle('Error') .setColor(0xFF0000) .setDescription('Please enter a username.')
    const channel = message.channel
    const perms = channel.permissionsFor(message.author);
    if(!perms.has("MANAGE_GUILD")) return message.channel.send(pwarn)
    if(!args[0]) return message.channel.send(noconwarn); 
      
    var groupId = 334423
    var cookie = process.env.cookie
    async function run() {
    await rbx.setCookie(process.env.cookie); } 
    
    run();
    var Username = args[0]
    var UserId = await rbx.getIdFromUsername(Username)
    rbx.exile(groupId, UserId)
    const suc = new MessageEmbed() .setTitle('Success') .setColor(0x00FF00) .setDescription(`User **${Username}** has been exiled.`)
    message.channel.send(suc)
  }
  
  
  if(command === "help") {
    if(!message.content.startsWith(`${prefix}help`)) return;
    const pwarn = new MessageEmbed() .setTitle('Insufficient Permissions') .setColor(0xFFFF00) .setDescription('You must have the "Manage Server" permission in order to view commands.') 
    const perms = message.channel.permissionsFor(message.author);
    if(message.channel.type === "dm") return message.author.send("Please run commands in a guild.");
    if(!perms.has("MANAGE_GUILD")) return message.channel.send(pwarn)
    const helpembed = new MessageEmbed() .setTitle('Help') .setColor(0x00FF00) .setDescription(`**${prefix + "help"}** - View all commands\n**${prefix + "rank"}** - Rank a group member. Usage: **${prefix + "rank"} <username> <roleid>**\n**${prefix + "shout"}** - Sends a group shout from a bot. Usage: **${prefix + "shout"} <message>**\n**${prefix + "exile"}** - Exiles a group member. Usage: **${prefix + "exile"} <username>**`)
    const noti = new MessageEmbed() .setTitle('Check your DMs for commands!') .setColor(0x0000FF)
    message.author.send(helpembed)
    message.channel.send(noti)
  }

});

client.login(process.env.Token);
