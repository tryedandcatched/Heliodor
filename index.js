const prompt = require('prompt');
const fs = require('fs');
const { Client } = require('discord.js-selfbot-v13');

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

fs.readFile('token.txt', function (err, data) {
	if (err) {
		getToken(); 
		return;
	}
 	if (data) {
		console.log("Token Restored Successfully!");
		token = data;
		runClient();
 	} else {
		getToken(); 
	}
});

const client = new Client({
	fetchAllMembers: false,
	restTimeOffset: 0,
	restWsBridgetimeout: 100,
	shards: "auto",
	allowedMentions: {
	  parse: [],
	  repliedUser: true,
	},
	presence: {
	  activity: {
		name: `Wasi Music`,
		type: "LISTENING",
	  },
	  status: "online"
	}
});

function runClient() {
	if(token) {
		client.login(token);
	} else {
		console.error("Invalid Token!");
		getToken()
	}
}

client.on('ready', async () => {
	console.log(`${client.user.username} is ready!`);
});