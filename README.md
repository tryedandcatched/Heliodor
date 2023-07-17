# Heliodor - Discord SelfBot
## Running SelfBot from Source Code
* Install Node.js
  - [Download](https://nodejs.org/en/download) & install
* Setup Node packages
  - Open `cmd` and run `npm install prompt fs discord.js-selfbot-v13 discord-bettermarkdown gradient-string`
* Run SelfBot
  - Open `cmd` in SelfBot directory and run `node index.js`
## How to contribute
### Creating new commands
```
commandMap.set("command name", {desc: "command description", func: (msg, args) => {
	// command code, msg = message sent, args = message arguments
}});
```
