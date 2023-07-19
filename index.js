const { Client, Permissions } = require('discord.js-selfbot-v13');
const gradient = require('gradient-string');
const BetterMarkDown = require('discord-bettermarkdown');
const WebEmbed = require('./WebEmbed');
const Util = require('./Util');

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
Util.retrieveToken().then((value) => {
	if(value == null) {
		Util.error("Failed to retrieve token!");
		return;
	}

	token = value;
	runClient();
});

const client = new Client({
	checkUpdate: false,
});

function runClient() {
	// IMPORTANT, DO NOT REMOVE
	if(!Util.verifyCommands(commands)) {
		Util.error("Failed to verify commands!");
		return;
	}

	client.login(token).catch(err => {
		Util.error(err);
		if (err.code == "TOKEN_INVALID") {
			Util.getToken().then((value) => {
				if(value == null) {
					Util.error("Failed to retrieve token");
					return;
				}

				token = value;
				runClient();
			});
		}
	});
}

let prefix = ".";
const commands = [ ];
const reactlist = [ ];
let emojis = [ "🤓" ];

commands.push({
	name: "help",
	aliases: [ "help" ],
	description: "Sends a list of commands",
	func: (msg, args) => {
		const commandList = [ ];
		commands.forEach(value => {
			if (value.description == "") return;
			const keyContent = prefix + value.name.charAt(0).toUpperCase() + value.name.slice(1);
			const content = value.description + "\n";
			commandList.push(`\n${keyContent + " - " + content}`);
		});
		Util.sendWebEmbed(msg.channel, new WebEmbed({shorten: true, hidden: true})
			.setAuthor({ name: 'Help', url: '' })
			.setColor('GREEN')
			.setDescription(commandList.join("")));
	}
});

commands.push({
	name: "test",
	aliases: [ "test" ],
	description: "",
	func: (msg, args) => {
		msg.channel.send("**El Bot Est Functionele** ✅").catch(Util.error);
		Util.good("El Bot Est Functionele ✅");
	}
});

commands.push({
	name: "prefix",
	aliases: [ "prefix" ],
	description: "Change prefix (prefix «new_prefix»)",
	func: (msg, args) => {
		if(args < 1) {
			Util.sendWebEmbed(msg.channel, new WebEmbed({shorten: true, hidden: true})
				.setAuthor({ name: 'Syntax Error!', url: '' })
				.setColor('GREEN')
				.setDescription("Prefix Not Specified!")); 
			return;
		}
			
		prefix = args[0];
		Util.sendWebEmbed(msg.channel, new WebEmbed({shorten: true, hidden: true})
			.setAuthor({ name: 'Prefix successfully changed!', url: '' })
			.setColor('GREEN')
			.setDescription("Changed prefix to " + args[0]));
	}
});

commands.push({
	name: "hiddenmessage",
	aliases: [ "hiddenmessage", "hm" ],
	description: "Sends a hidden message (hiddenmessage «hidden» «visible»)",
	func: (msg, args) => {
		msg.channel.send(args[1]+"**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍ " + args[0]).catch(Util.error);
	}
});

commands.push({
	name: "moyai",
	aliases: [ "moyai" ],
	description: "Spams :moyai: x times (moyai «amount»)",
	func: (msg, args) => {
		for(let i = 0; i < args[0]; i++) {
			msg.channel.send({ content: `🗿 🗿 🗿 🗿 🗿 🗿 🗿 🗿 🗿 🗿 🗿`}).catch(Util.error);
		}
	}
});

commands.push({
	name: "trol",
	aliases: [ "trol", "torl" ],
	description: "",
	func: (msg, args) => {
		msg.channel.send({ content: `\`\`\`ansi\n`+`\n░░░░░▄▄▄▄▀▀▀▀▀▀▀▀▄▄▄▄▄▄░░░░░░░`.red+`\n░░░░░█░░░░▒▒▒▒▒▒▒▒▒▒▒▒░░▀▀▄░░░░`.red+`\n░░░░█░░░▒▒▒▒▒▒░░░░░░░░▒▒▒░░█░░░`.red+`\n░░░█░░░░░░▄██▀▄▄░░░░░▄▄▄░░░░█░░`.red+`\n░▄▀▒▄▄▄▒░█▀▀▀▀▄▄█░░░██▄▄█░░░░█░`.red+`\n█░▒█▒▄░▀▄▄▄▀░░░░░░░░█░░░▒▒▒▒▒░█`.red+`\n█░▒█░█▀▄▄░░░░░█▀░░░░▀▄░░▄▀▀▀▄▒█`.red+`\n░█░▀▄░█▄░█▀▄▄░▀░▀▀░▄▄▀░░░░█░░█░`.red+`\n░░█░░░▀▄▀█▄▄░█▀▀▀▄▄▄▄▀▀█▀██░█░░`.red+`\n░░░█░░░░██░░▀█▄▄▄█▄▄█▄████░█░░░`.red+`\n░░░░█░░░░▀▀▄░█░░░█░█▀██████░█░░`.red+`\n░░░░░▀▄░░░░░▀▀▄▄▄█▄█▄█▄█▄▀░░█░░`.red+`\n░░░░░░░▀▄▄░▒▒▒▒░░░░░░░░░░▒░░░█░`.red+`\n░░░░░░░░░░▀▀▄▄░▒▒▒▒▒▒▒▒▒▒░░░░█░`.red+`\n░░░░░░░░░░░░░░▀▄▄▄▄▄░░░░░░░░█░░`.red + `\`\`\``}).catch(Util.error);
	}
});

commands.push({
	name: "userinfo",
	aliases: [ "userinfo", "uinfo" ],
	description: "Pulls informations about a user (userinfo «user id/mention/empty»)",
	func: (msg, args) => {
		const target = client.users.cache.find(user => user.id === args[0]) || client.users.cache.find(user => user.toString() === args[0]) || msg.author;
		target.fetch().then(user => {
			user.mutualFriends.then(mutualFriends => {
				let createdAt = user.createdAt;
				Util.sendWebEmbed(msg.channel, new WebEmbed({shorten: true, hidden: true})
					.setTitle(user.username)
					.setAuthor({ name: "User Info", url: '' })
					.setColor('#2b7a1d')
					.setThumbnail(user.displayAvatarURL({dynamic: true}))
					.setDescription("Account created at: " + createdAt.getFullYear() + "/" + createdAt.getMonth() + "/" + createdAt.getDate()+ " " + createdAt.getHours() + ":" + createdAt.getMinutes() + "\n"
						+ "Subscription: " + user.nitroType.replace("NITRO_BOOST", "Nitro").replace("NITRO_CLASSIC", "Nitro Classic (kinda trash)").replace("NITRO_BASIC", "Nitro Basic (trash)").replace("NONE", "No Nitro") + "\n"
						+ "Mutual guilds: " + user.mutualGuilds.size + "\n"
						+ "Mutual Friends: " + mutualFriends.size +"\n"
						+ "About Me:\n " + user.bio));
			});
		});
	}
});

commands.push({
	name: "serverinfo",
	aliases: [ "serverinfo", "sinfo", "guildinfo" ],
	description: "Pulls informations about a server (serverinfo «server id/empty»)",
	func: (msg, args) => {
		const target = client.guilds.cache.find(Guild => Guild.id === args[0]) || msg.channel.guild;
		target.fetch().then(guild => {
			guild.emojis.fetch().then(emojis => {
				const createdAt = guild.createdAt;
				Util.sendWebEmbed(msg.channel, new WebEmbed({shorten: true, hidden: true})
					.setAuthor({ name: "Server Info", url: '' })
					.setColor('#2b7a1d')
					.setThumbnail(guild.iconURL({dynamic: true}))
					.setTitle(guild.name)
					.setDescription("Created at: " + createdAt.getFullYear() + "/" + createdAt.getMonth() + "/" + createdAt.getDate()+ " " + createdAt.getHours() + ":" + createdAt.getMinutes() + "\n"
						+ "Members: " + guild.memberCount + "\n"
						+ "Emojis: " + emojis.size +"\n"
						+ "Boost Level: " + guild.premiumTier));
			})
		});
	}
});

commands.push({
	name: "ocw",
	aliases: [ "oskarczywasiluk", "ocw" ],
	description: "",
	func: (msg, args) => {
		const rand = Math.random() < 0.5;
		if (args[0].toLowerCase() != "oskar" && args[0].toLowerCase() != "wasiluk") {
			Util.sendWebEmbed(msg.channel, new WebEmbed({shorten: true, hidden: true})
				.setAuthor({ name: 'Jestes gupi czy gupi?', url: '' })
				.setColor('WHITE')
				.setDescription('Mozesz stawiac tylko na oskar albo wasiluk 😡'));
			return;
		}

		if (rand == true) {
			Util.sendWebEmbed(msg.channel, new WebEmbed({shorten: true, hidden: true})
				.setAuthor({ name: 'Oskar Czy Wasiluk', url: '' })
				.setColor('RED')
				.setDescription('Oskar 🥵 \n Stawiales na ' + args[0]));
		} else {
			Util.sendWebEmbed(msg.channel, new WebEmbed({shorten: true, hidden: true})
				.setAuthor({ name: 'Oskar Czy Wasiluk', url: '' })
				.setColor('BLUE')
				.setDescription('Wasiluk 🥶 \n Stawiales na ' + args[0]));
		}
	}
});

commands.push({
	name: "samsung",
	aliases: [ "samsungactivity", "samsung" ],
	description: "Sets Samsung Activity (samsung «start/stop» «package»)",
	func: (msg, args) => {
		if (args[0].toLowerCase() == "start") {
			client.user.setSamsungActivity(args[1], 'START').catch(Util.error);
			Util.sendWebEmbed(msg.channel, new WebEmbed({shorten: true, hidden: true})
				.setAuthor({ name: 'Samsung Status Has Been Enabled!', url: '' })
				.setColor('GREEN')
				.setDescription("Status set to " + args[1]));
		} else if (args[0].toLowerCase() == "stop") {
			client.user.setSamsungActivity(args[1], 'STOP').catch(Util.error);
			Util.sendWebEmbed(msg.channel, new WebEmbed({shorten: true, hidden: true})
				.setAuthor({ name: 'Samsung Status Has Been Disabled!', url: '' })
				.setColor('RED')
				.setDescription("Success!"));
		}
	}
});

commands.push({
	name: "nuke",
	aliases: [ "servernuke", "nuke" ],
	description: "Nukes the current server (you need admin permissions to use this)",
	func: (msg, args) => {
		const channelPerms = msg.guild.members.permissions.has("MANAGE_CHANNELS" || "ADMINISTRATOR");
		const banPerms = msg.guild.members.me.permissions.has("BAN_MEMBERS" || "ADMINISTRATOR");
		const rolePerms = msg.guild.members.me.permissions.has("MANAGE_ROLES" || "ADMINISTRATOR");
		if (!banPerms || !rolePerms || !channelPerms) return;

		const arrayOfIDs = msg.guild.members.cache.map((user) => user.id);
		msg.reply("Found " + arrayOfIDs.length + " users.").then((msg) => {
			setTimeout(() => {
				msg.edit("Banning...");
				for (let i = 0; i < arrayOfIDs.length; i++) {
					const user = arrayOfIDs[i];
					const member = msg.guild.members.cache.get(user);
					member.ban().catch((err) => Util.error(("Error Found: " + err))).then(() => console.log(gradient('yellow', 'orange', 'red').multiline(`${member.user.tag} was banned.`)));
				}
			}, 2000);
		});
		msg.guild.roles.cache.forEach((r) => r.delete().catch((err) => Util.error(("Error Found: " + err))));
		for (let i = 0; i < 100; i++) {
			msg.guild.channels.create("L", { type: "GUILD_TEXT" }).catch((err) => { Util.error(("Error Found: " + err)) }).then((channel) => {
				setInterval(() => {
					channel.send("@everyone get nuked by wasiluk team").catch(Util.error);
				}, 100); 
			});
		}
	}
});

commands.push({
	name: "przerwatechniczna",
	aliases: [ "przerwatechniczna" ],
	description: "",
	func: (msg, args) => {
		msg.channel.send("https://media.discordapp.net/attachments/978017797957378108/1028609201758556180/przerwa-techniczna.gif").catch(Util.error);
	}
});

commands.push({
	name: "reactlist",
	aliases: [ "reactlist" ],
	description: "Reacts with emoji to listed people messages :angry: (reactlist «add/remove/list/emoji» «id/emojis»",
	func: (msg, args) => {
		if (args[0].toLowerCase() == "add") {
			reactlist[reactlist.length] = args[1];
			Util.sendWebEmbed(msg.channel, new WebEmbed({shorten: true, hidden: true})
				.setAuthor({ name: 'React List Add', url: '' })
				.setColor('GREEN')
				.setDescription("Successfully added " + args[1] + "!"));
		} else if (args[0].toLowerCase() == "remove") {
			reactlist.splice(reactlist.findIndex(indexed => indexed == args[1]), 1);
			Util.sendWebEmbed(msg.channel, new WebEmbed({shorten: true, hidden: true})
				.setAuthor({ name: 'React List Remove', url: '' })
				.setColor('RED')
				.setDescription("Successfully removed " + args[1] + "!"));
		} else if (args[0].toLowerCase() == "list") {
			msg.channel.send("Listed ID's: " + reactlist).catch(Util.error);
		} else if (args[0].toLowerCase() == "emoji") {
			args.shift();
			emojis = args;
			Util.sendWebEmbed(msg.channel, new WebEmbed({shorten: true, hidden: true})
				.setAuthor({ name: 'React List Emoji', url: '' })
				.setColor('BLUE')
				.setDescription("Successfully changed emojis!"));
		}
	}
});

// IMPORTANT, DO NOT REMOVE
Util.loadExternalCommands(commands);

client.on('ready', async () => {
	Util.good(`${client.user.username} is ready!`);
});

client.on('messageCreate', async (msg) => {
	if (reactlist.includes(msg.author.id)) {
		if (msg.guild != null) {
			let me = msg.guild.members.me;
			if (me.permissionsIn(msg.channel).has(Permissions.FLAGS.ADD_REACTIONS)) {
				emojis.forEach((value) => {
					msg.react(value).catch((err) => { 
						if(err.code == 10008) return;
						Util.error(err);
					});
				});
			}
		} else {
			emojis.forEach((value) => {
				msg.react(value).catch((err) => { 
					if(err.code == 10008) return;
					Util.error(err);
				});
			});
		}
	}

	if (msg.author.bot) return;
	if (!client.user.id.includes(msg.author.id)) return;
	if (!msg.content) return;
	if (!msg.content.startsWith(prefix)) return;

	const args = msg.content.trim().slice(prefix.length).split(' ');
	const command = args.shift().toLowerCase();

	commands.forEach(value => {
		value.aliases.forEach(alias => {
			if (command == alias) {
				value.func(msg, args);
			}
		});
	});

	msg.delete().catch(Util.error);
});
