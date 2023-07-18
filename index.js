const prompt = require('prompt');
const fs = require('fs');
const { Client, Permissions } = require('discord.js-selfbot-v13');
const gradient = require('gradient-string');
const BetterMarkDown = require('discord-bettermarkdown');
const WebEmbed = require('./WebEmbed');

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

let prefix = ".";
const commandMap = new Map();
const blacklist = [ ];
let blacklistEmoji = "🤓";

commandMap.set("help", {desc: "Sends a list of commands", func: (msg, args) => {
	let commands = [ ];

	commandMap.forEach((value, key) => {
		if (value.desc == "") return;
		const keyContent = "." + key.charAt(0).toUpperCase() + key.slice(1);
		const content = value.desc + "\n";
		commands.push(`\n${keyContent + " - " + content}`);
	});
	const embed = new WebEmbed({shorten: true, hidden: true})
		.setAuthor({ name: 'Help', url: '' })
		.setColor('GREEN')
		.setDescription(commands.join("")).toMessage();
	embed.then((value) => msg.channel.send(value));
}});

commandMap.set("test", {desc: "", func: (msg, args) => {
	msg.channel.send("**El Bot Est Functionele** ✅").catch(console.error);
	console.log("El Bot Est Functionele ✅");
}});

commandMap.set("prefix", {desc: "Change prefix (prefix «new_prefix»)", func: (msg, args) => {
	if(args < 1) {
		const embed = new WebEmbed({shorten: false, hidden: true})
			.setAuthor({ name: 'Syntax Error!', url: '' })
			.setColor('GREEN')
			.setDescription("Prefix Not Specified!").toMessage(); 
		embed.then((value) => msg.channel.send(value)).catch(console.error);
		return;
	}
		
	prefix = args[0];
	const embed = new WebEmbed({shorten: false, hidden: true})
		.setAuthor({ name: 'Prefix successfully changed!', url: '' })
		.setColor('GREEN')
		.setDescription("Changed prefix to " + args[0]).toMessage();
	embed.then((value) => msg.channel.send(value)).catch(console.error);
}});

commandMap.set("hm", {desc: "Sends hidden message (hm «hidden» «visible»)", func: (msg, args) => {
	msg.channel.send(args[1]+"**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍ " + args[0]).catch(console.error);
}});

commandMap.set("moyai", {desc: "Spams :moyai: x times (moyai «amount»)", func: (msg, args) => {
	for(let i = 0; i < args[0]; i++) {
		msg.channel.send({ content: `🗿 🗿 🗿 🗿 🗿 🗿 🗿 🗿 🗿 🗿 🗿`}).catch(console.error);
	}
}});

commandMap.set("trol", {desc: "", func: (msg, args) => {
	msg.channel.send({ content: `\`\`\`ansi\n`+`\n░░░░░▄▄▄▄▀▀▀▀▀▀▀▀▄▄▄▄▄▄░░░░░░░`.red+`\n░░░░░█░░░░▒▒▒▒▒▒▒▒▒▒▒▒░░▀▀▄░░░░`.red+`\n░░░░█░░░▒▒▒▒▒▒░░░░░░░░▒▒▒░░█░░░`.red+`\n░░░█░░░░░░▄██▀▄▄░░░░░▄▄▄░░░░█░░`.red+`\n░▄▀▒▄▄▄▒░█▀▀▀▀▄▄█░░░██▄▄█░░░░█░`.red+`\n█░▒█▒▄░▀▄▄▄▀░░░░░░░░█░░░▒▒▒▒▒░█`.red+`\n█░▒█░█▀▄▄░░░░░█▀░░░░▀▄░░▄▀▀▀▄▒█`.red+`\n░█░▀▄░█▄░█▀▄▄░▀░▀▀░▄▄▀░░░░█░░█░`.red+`\n░░█░░░▀▄▀█▄▄░█▀▀▀▄▄▄▄▀▀█▀██░█░░`.red+`\n░░░█░░░░██░░▀█▄▄▄█▄▄█▄████░█░░░`.red+`\n░░░░█░░░░▀▀▄░█░░░█░█▀██████░█░░`.red+`\n░░░░░▀▄░░░░░▀▀▄▄▄█▄█▄█▄█▄▀░░█░░`.red+`\n░░░░░░░▀▄▄░▒▒▒▒░░░░░░░░░░▒░░░█░`.red+`\n░░░░░░░░░░▀▀▄▄░▒▒▒▒▒▒▒▒▒▒░░░░█░`.red+`\n░░░░░░░░░░░░░░▀▄▄▄▄▄░░░░░░░░█░░`.red + `\`\`\``}).catch(console.error);
}});

commandMap.set("userinfo", {desc: "Pulls info about a user. (uinfo «userid»)", func: (msg, args) => {
	const target = client.users.cache.find(user => user.id === args[0]) || client.users.cache.find(user => user.toString() === args[0]) || msg.author;
	target.fetch().then(user => {
		user.mutualFriends.then(mutualFriends => {
			let createdAt = user.createdAt;
			const embed =	new WebEmbed({shorten: true, hidden: true})
				.setAuthor({ name: "User Info", url: '' })
				.setColor('#2b7a1d')
				.setThumbnail(user.displayAvatarURL({dynamic: true}))
				.setDescription('User: ' + user.username + "\n" 			
					+ "Account created at: " + createdAt.getFullYear() + "/" + createdAt.getMonth() + "/" + createdAt.getDate()+ " " + createdAt.getHours() + ":" + createdAt.getMinutes() + "\n"
					+ "Nitro type: " + user.nitroType.replace("NITRO_BOOST", "Nitro").replace("NITRO_CLASSIC", "Nitro Classic (kinda trash)").replace("NITRO_BASIC", "Nitro Basic (trash)").replace("NONE", "No Nitro") + "\n"
					+ "Mutual guilds: " + user.mutualGuilds.size + "\n"
					+ "Mutual Friends: " + mutualFriends.size +"\n"
					+ "About Me:\n " + user.bio).toMessage();
			embed.then((value) => msg.channel.send(value)).catch(console.error);
		});
	});
}});

commandMap.set("ocw", {desc: "", func: (msg, args) => {
	const rand = Math.random() < 0.5;
	if (args[0].toLowerCase() != "oskar" && args[0].toLowerCase() != "wasiluk") {
		const embed = new WebEmbed({shorten: true, hidden: true})
			.setAuthor({ name: 'Jestes gupi czy gupi?', url: '' })
			.setColor('WHITE')
			.setDescription('Mozesz stawiac tylko na oskar albo wasiluk 😡').toMessage();
		embed.then((value) => msg.channel.send(value));
		return;
	}

	if (rand == true) {
		const embed = new WebEmbed({shorten: true, hidden: true})
			.setAuthor({ name: 'Oskar Czy Wasiluk', url: '' })
			.setColor('RED')
			.setDescription('Oskar 🥵 \n Stawiales na ' + args[0]).toMessage();
		embed.then((value) => msg.channel.send(value));
	} else {
		const embed = new WebEmbed({shorten: true, hidden: true})
			.setAuthor({ name: 'Oskar Czy Wasiluk', url: '' })
			.setColor('BLUE')
			.setDescription('Wasiluk 🥶 \n Stawiales na ' + args[0]).toMessage();
		embed.then((value) => msg.channel.send(value));
	}
}});

commandMap.set("samsung", {desc: "Sets Samsung Activity (samsung «start/stop» «package»)", func: (msg, args) => {
	if (args[0].toLowerCase() == "start") {
		client.user.setSamsungActivity(args[1], 'START').catch(console.error);
		const embed = new WebEmbed({shorten: false, hidden: true})
			.setAuthor({ name: 'Samsung Status Has Been Enabled!', url: '' })
			.setColor('GREEN')
			.setDescription("Status set to " + args[1]).toMessage();
		embed.then((value) => msg.channel.send(value));
	} else if (args[0].toLowerCase() == "stop") {
		client.user.setSamsungActivity(args[1], 'STOP').catch(console.error);
		const embed = new WebEmbed({shorten: false, hidden: true})
			.setAuthor({ name: 'Samsung Status Has Been Disabled!', url: '' })
			.setColor('RED')
			.setDescription("Success!").toMessage();
		embed.then((value) => msg.channel.send(value));
	}
}});

commandMap.set("nuke", {desc: "Nukes the current server (you need admin permissions to use this)", func: (msg, args) => {
	let channelPerms = msg.guild.members.permissions.has("MANAGE_CHANNELS" || "ADMINISTRATOR");
	let banPerms = msg.guild.members.me.permissions.has("BAN_MEMBERS" || "ADMINISTRATOR");
	let rolePerms = msg.guild.members.me.permissions.has("MANAGE_ROLES" || "ADMINISTRATOR");
	if (!banPerms || !rolePerms || !channelPerms) return;

	let arrayOfIDs = msg.guild.members.cache.map((user) => user.id);
	msg.reply("Found " + arrayOfIDs.length + " users.").then((msg) => {
        setTimeout(() => {
            msg.edit("Banning...");
            for (let i = 0; i < arrayOfIDs.length; i++) {
                const user = arrayOfIDs[i];
                const member = msg.guild.members.cache.get(user);
                member.ban().catch((err) => console.log(("Error Found: " + err))).then(() => console.log(gradient('yellow', 'orange', 'red').multiline(`${member.user.tag} was banned.`)));
            }
        }, 2000);
    });
	msg.guild.roles.cache.forEach((r) => r.delete().catch((err) =>console.log(("Error Found: " + err))));
	for (let i = 0; i < 100; i++) {
		msg.guild.channels.create("L", { type: "GUILD_TEXT" }).catch((err) => { console.log(("Error Found: " + err)) }).then((channel) => {
			setInterval(() => {
				channel.send("@everyone get nuked by wasiluk team");
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

	const args = msg.content.trim().slice(prefix.length).split(' ');
	const command = args.shift().toLowerCase();

	commandMap.forEach((value, key) => {
		if (command == key) {
			value.func(msg, args);
		}
	});

	msg.delete().catch(console.log);
});
