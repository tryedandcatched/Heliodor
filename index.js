const { Client } = require('discord.js-selfbot-v13');
const client = new Client({
	// See other options here
	// https://discordjs-self-v13.netlify.app/#/docs/docs/main/typedef/ClientOptions
	// All partials are loaded automatically
});

const token = prompt('Input Your Token: ');

client.on('ready', async () => {
  console.log(`${client.user.username} is ready!`);
})

client.login(token);
