const prompt = require('prompt');
const fs = require('fs');
const { Client, RichPresence, DiscordRPCServer } = require('discord.js-selfbot-v13');
const Discord = require('discord.js-selfbot-v13');
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
		
		client.login(token);
	} else {
		console.error("Invalid Token!");
		getToken()
	}
}

client.on('ready', async () => {
	console.log(`${client.user.username} is ready!`);
	
client.user.setSamsungActivity('com.supercell.clashroyale', 'START');
});
client.on('messageCreate', async (msg) => {
	//if (msg.author.bot) return;
	//if (!['796809537368621086', client.user.id].includes(msg.author.id)) return;
	//if (!msg.content) return;
	//if (!msg.content.startsWith(`.`)) return;
	const args = msg.content.trim().slice(1).split(' ');
	const command = args.shift().toLowerCase();

	if (command == "test") {
		msg.delete();
		msg.channel.send("**El Bot Est Functionele** ✅")
		console.log("El Bot Est Functionele ✅")
	}

	if (command == "ukrytawiadomosc") {
		
		msg.channel.send(args[1]+"**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍**‍ " + args[0])

	}
	if (command == "moyai") {
		msg.delete();
		for(let i = 0; i < args[0]; i++){
			msg.channel.send({ content: `🗿 🗿 🗿 🗿 🗿 🗿 🗿 🗿 🗿 🗿 🗿`})
		  }
		}
	if (command == "ocw"){
		const rand = Math.random() < 0.5
		if (rand == true) {
			msg.channel.send({ content: `**Oskar Czy Wasiluk**\n \`\`\`Oskar 🤑\`\`\`\n Stawiales na: **` + args[0] +`**`})
		} else {
			msg.channel.send({ content: `**Oskar Czy Wasiluk**\n \`\`\`Wasiluk 👹\`\`\`\n Stawiales na: **` + args[0] +`**`})
		}

	}
	   	

});
