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
* Inside index.js
```
commands.push({
  name: "command name",
  aliases: [ "command alias 1", "command alias 2" ],
  description: "command description",
  func: (msg, args) => { // msg - message sent, args - message arguments
    // command code
  }
});
```
* Externally
Must be in `commands` directory!
```
module.exports = {
  name: "command name",
  aliases: [ "command alias 1", "command alias 2" ],
  description: "command description",
  func: (msg, args) => { // msg - message sent, args - message arguments
    // command code
  }
};
```
## Examples
You can find examples [here](./examples/)