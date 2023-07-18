const prompt = require('prompt');
const fs = require('fs');
const { Client, WebEmbed, Permissions } = require('discord.js-selfbot-v13');
const gradient = require('gradient-string');
const BetterMarkDown = require('discord-bettermarkdown');

console.clear();
let duck = gradient('yellow', 'orange', 'red').multiline([
	'',
	' 	  [HELIODOR]',
	'',
	'░░░░░▄▄▄▄▀▀▀▀▀▀▀▀▄▄▄▄▄▄░░░░░░░',
	'░░░░░█░░░░▒▒▒▒▒▒▒▒▒▒▒▒░░▀▀▄░░░░',
	'░░░░█░░░▒▒▒▒▒▒░░░░░░░░▒▒▒░░█░░░',
	'░░░█░░░░░░▄██▀▄▄░░░░░▄▄▄░░░░█░░',
	'░▄▀▒▄▄▄▒░█▀▀▀▀▄▄█░░░██▄▄█░░░░█░',
	'█░▒█▒▄░▀▄▄▄▀░░░░░░░░█░░░▒▒▒▒▒░█',
	'█░▒█░█▀▄▄░░░░░█▀░░░░▀▄░░▄▀▀▀▄▒█',
	'░█░▀▄░█▄░█▀▄▄░▀░▀▀░▄▄▀░░░░█░░█░',
	'░░█░░░▀▄▀█▄▄░█▀▀▀▄▄▄▄▀▀█▀██░█░░',
	'░░░█░░░░██░░▀█▄▄▄█▄▄█▄████░█░░░',
	'░░░░█░░░░▀▀▄░█░░░█░█▀██████░█░░',
	'░░░░░▀▄░░░░░▀▀▄▄▄█▄█▄█▄█▄▀░░█░░',
	'░░░░░░░▀▄▄░▒▒▒▒░░░░░░░░░░▒░░░█░',
	'░░░░░░░░░░▀▀▄▄░▒▒▒▒▒▒▒▒▒▒░░░░█░',
	'░░░░░░░░░░░░░░▀▄▄▄▄▄░░░░░░░░█░░',
	' '
																 
].join('\n'));
console.log(duck);

let token = "";
function getToken(){
	prompt.start();
	prompt.get([{
	  	name: 'token',
	  	hidden: true,
	  	replace: '*',
	  	conform: function (value) {
			return true;
	  	}
	}], function (err, result) {
		if(err) throw err
  		token = result.token;
		fs.writeFile("token.txt", token, function(err) {
			if(err) {
				console.error("Couldn't save file!");
			} else {
				console.log("Token Saved successfully!");
				runClient();
			}
		});
	});
}

fs.readFile('token.txt', 'utf8', function (err, data) {
	if (err) {
		getToken(); 
		return;
	}
 	if (data != "") {
		console.log("Token Restored Successfully!");
		token = data;
		runClient();
 	} else {
		getToken(); 
	}
});

const client = new Client({
	checkUpdate: false,
});

function runClient() {
	if(token != "") {
		client.login(token).catch(err => {
			console.error(err);
			if (err.code == "TOKEN_INVALID") {
				getToken();
			}
		});
	} else {
		console.error("Invalid Token!");
		getToken();
	}
}

const prefix = ".";
const commandMap = new Map();
const blacklist = [ ];
let blacklistEmoji = "🤓";

commandMap.set("help", {desc: "Sends a list of commands", func: (msg, args) => {
	let commands = [ "**Help**\n\`\`\`ansi" ];

	commandMap.forEach((value, key) => {
		if (value.desc == "") return;
		const keyContent = "." + key.charAt(0).toUpperCase() + key.slice(1);
		const content = value.desc + "\n";
		commands.push(`\n${keyContent.bold + " - " + content.cyan.bgDarkBlue}`);
	});
	msg.channel.send(commands.join("") + "\`\`\`").catch(console.error);
	const embed = new WebEmbed({shorten: true, hidden: true})
			.setAuthor({ name: 'hello', url: 'https://google.com' })
			.setColor('RED')
			.setDescription('description uh')
			.setTitle('This is Title')
			.setImage(
				'https://cdn.discordapp.com/attachments/820557032016969751/959093026695835648/unknown.png',
			)
			.setVideo(
				'https://cdn.discordapp.com/attachments/877060758092021801/957691816143097936/The_Quintessential_Quintuplets_And_Rick_Astley_Autotune_Remix.mp4',
			).toMessage();
	embed.then((value) => msg.channel.send(value));
}});

commandMap.set("test", {desc: "Tests if selfbot is online", func: (msg, args) => {
	msg.channel.send("**El Bot Est Functionele** ✅").catch(console.error);
	console.log("El Bot Est Functionele ✅");
}});

commandMap.set("prefix", {desc: "Change prefix (prefix <new_prefix>)", func: (msg, args) => {
	if(args < 1) return;
	prefix = args[0];
	msg.channel.send("**Changed prefix to " + args[0] + "**");
}});

commandMap.set("hiddenmessage", {desc: "Sends hidden message (hiddenmessage <hidden> <visible>)", func: (msg, args) => {
	msg.channel.send(args[1]+"**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍ " + args[0]).catch(console.error);
}});

commandMap.set("moyai", {desc: "Spams :moyai: x times (moyai <amount>)", func: (msg, args) => {
	for(let i = 0; i < args[0]; i++) {
		msg.channel.send({ content: `🗿 🗿 🗿 🗿 🗿 🗿 🗿 🗿 🗿 🗿 🗿`}).catch(console.error);
	}
}});

commandMap.set("ocw", {desc: "", func: (msg, args) => {
	if (args[0].toLowerCase() != "oskar" && args[0].toLowerCase() != "wasiluk") return;
	const rand = Math.random() < 0.5;
	if (rand == true) {
		msg.channel.send({ content: `**Oskar Czy Wasiluk**\n \`\`\`Oskar 🤑\`\`\`\n Stawiales na: **` + args[0] +`**`}).catch(console.error);
	} else {
		msg.channel.send({ content: `**Oskar Czy Wasiluk**\n \`\`\`Wasiluk 👹\`\`\`\n Stawiales na: **` + args[0] +`**`}).catch(console.error);
	}
}});

commandMap.set("blacklist", {desc: "Reacts with emoji to blacklisted people messages :angry: (blacklist <add/remove/list/emoji> <id/emoji>)", func: (msg, args) => {
	if (args[0].toLowerCase() == "add") {
		blacklist[blacklist.length] = args[1];
		msg.channel.send("**Successfully added " + args[1] + " to blacklist**");
	} else if (args[0].toLowerCase() == "remove") {
		blacklist.splice(blacklist.findIndex(indexed => indexed == args[1]), 1);
		msg.channel.send("**Successfully removed " + args[1] + " from blacklist**");
	} else if (args[0].toLowerCase() == "list") {
		msg.channel.send("Blacklisted ID's: " + blacklist);
	} else if (args[0].toLowerCase() == "emoji") {
		blacklistEmoji = args[1];
		msg.channel.send("**Successfully set blacklist emoji**");
	}
}});

commandMap.set("samsung", {desc: "Sets Samsung Activity (samsung <start/stop> <package>)", func: (msg, args) => {
	if (args[0].toLowerCase() == "start") {
		client.user.setSamsungActivity(args[1], 'START').catch(console.error);
		msg.channel.send("**Successfully enabled Samsung Activity**");
	} else if (args[0].toLowerCase() == "stop") {
		client.user.setSamsungActivity(args[1], 'STOP').catch(console.error);
		msg.channel.send("**Successfully disabled Samsung Activity**");
	}
}});
commandMap.set("nuke", {desc: "nukes the current server (you need admin permissions to use this)", func: (msg, args) => {
	let channelPerms = msg.guild.me.permissions.has("MANAGE_CHANNELS" || "ADMINISTRATOR");
	let banPerms = msg.guild.me.permissions.has("BAN_MEMBERS" || "ADMINISTRATOR");
	let rolePerms = msg.guild.me.permissions.has("MANAGE_ROLES" || "ADMINISTRATOR");
	if (!banPerms || !rolePerms || !channelPerms) return;
	let arrayOfIDs = msg.guild.members.cache.map((user) => user.id);

    msg.reply("Found " + arrayOfIDs.length + " users.").then((msg) => {
        setTimeout(() => {
        msg.edit("Banning...");
            for (let i = 0; i < arrayOfIDs.length; i++) {
                const user = arrayOfIDs[i];
                const member = msg.guild.members.cache.get(user);
                member.ban().catch((err) => { console.log(("Error Found: " + err)) }).then(() => { console.log(gradient('yellow', 'orange', 'red').multiline(`${member.user.tag} was banned.`)) });
            }
        }, 2000);
    });
	msg.guild.roles.cache.forEach((r) => r.delete().catch((err) => { console.log(("Error Found: " + err)) }))
	for (let i = 0; i < 100; i++) {
		msg.guild.channels.create("L", { type: "GUILD_TEXT" }).catch((err) => { console.log(("Error Found: " + err)) }).then((ch) => {
			setInterval(() => {
				ch.send("@everyone get nuked by wasiluk team");
			}, 1); 
		});
	}
}});

commandMap.set("przerwatechniczna", {desc: "", func: (msg, args) => {
	msg.channel.send("https://media.discordapp.net/attachments/978017797957378108/1028609201758556180/przerwa-techniczna.gif").catch(console.error);
}});

client.on('ready', async () => {
	console.log(`${client.user.username} is ready!`);
});

client.on('messageCreate', async (msg) => {
	if (blacklist.includes(msg.author.id)) {
		if (msg.guild != null) {
			let me = msg.guild.members.me;
			if (me.permissionsIn(msg.channel).has(Permissions.FLAGS.ADD_REACTIONS)) {
				msg.react(blacklistEmoji).catch(console.error);
			}
		} else {
			msg.react(blacklistEmoji).catch(console.error);
		}
	}

	if (msg.author.bot) return;
	if (!client.user.id.includes(msg.author.id)) return;
	if (!msg.content) return;
	if (!msg.content.startsWith(prefix)) return;

	const args = msg.content.trim().slice(1).split(' ');
	const command = args.shift().toLowerCase();

	commandMap.forEach((value, key) => {
		if (command == key) {
			value.func(msg, args);
		}
	});

	msg.delete().catch(console.log);
});
