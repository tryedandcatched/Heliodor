const prompt = require('prompt');
const fs = require('fs');
const { Client } = require('discord.js-selfbot-v13');

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

  let token = "";
  let userID = "";
  function getUserID(){
	prompt.start();

	prompt.get([{
	  name: 'userID',
	  hidden: false,
	  replace: '*',
	  conform: function (value) {
		return true;
	  }
	}], function (err, result) {
  
	userID = result.userID;
  });
  
  fs.writeFile("UserID.txt", token, function(err) {
	  if(err) {
		  return console.log("Invalid UserID");
	  }
	  console.log("UserID Saved successfully!");
  });}

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
  
	token = result.token;
  });
  
  fs.writeFile("token.txt", token, function(err) {
	  if(err) {
		  return console.log("Invalid Token");
	  }
	  console.log("Token Saved successfully!");
  });}


  fs.readFile('token.txt', function (err, data) {

	console.log("Token Restored Successfully");

	token = data;

	if (err) throw err;
	getToken();
 });

 fs.readFile('UserID.txt', function (err, data) {
	if (err) throw err;
	getUserID();

	console.log("UserID Restored Successfully");

	UserId = data;


 });






client.on('ready', async () => {
  console.log(`${client.user.username} is ready!`);
})
if (token == String){client.login(token); 
} else {console.log("Invalid Token, Contact Support.")}

