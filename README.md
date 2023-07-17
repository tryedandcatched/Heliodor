# Heliodor - Discord SelfBot
## Running SelfBot from Source Code
* Install Node.js
  - [Download](https://nodejs.org/en/download) & install
* Setup Node packages
  - Run `setup.bat`
* Run SelfBot
  - Open `cmd` and run `node index.js`
## How to contribute
### Creating new commands
```
commandMap.set("command name", {desc: "command description", func: (msg, args) => {
	// command code, msg = message sent, args = message arguments
}});
```
