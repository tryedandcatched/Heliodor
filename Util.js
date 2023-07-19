const prompt = require('prompt');
const fs = require('fs');
const gradient = require('gradient-string');

function getToken() {
    return new Promise((resolve) => {
        prompt.start();
        prompt.get([{
            name: 'token',
            hidden: true,
            replace: '*',
            conform: function (value) {
                return true;
            }
        }], function (err, result) {
            if(err) {
                error(err);
                resolve(null);
                return;
            }

            fs.writeFile("token.txt", result.token, function(err) {
                if(err) {
                    error("Couldn't save file!");
                    resolve(null);
                } else {
                    good("Token Saved successfully!");
                    resolve(result.token);
                }
            });
        });
    });
}

function retrieveToken() {
    return new Promise((resolve) => {
        fs.readFile('token.txt', 'utf8', function (err, data) {
            if (err) {
                getToken().then((value) => {
                    resolve(value);
                });
                return;
            }

            if (data != "") {
                good("Token Restored Successfully!");
                resolve(data);
            } else {
                getToken().then((value) => {
                    resolve(value);
                });
            }
        });
    });
}

function loadExternalCommands(commandList) {
    new Promise((resolve) => {
        fs.access("./commands", fs.constants.F_OK, (err) => {
            if(!err) {
                resolve(true);
                return;
            }

            error("Error while accessing commands directory!");
            resolve(false);
        });
    }).then((value) => {
        if(!value) {
            error("Failed to load external commands");
            return;
        }

        const files = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
        for (const file of files) {
            const command = require("./commands/" + file);
            commandList.push(command);
        }
    });
}

function log(msg, gradient) {
    console.log(gradient.multiline(msg));
}

function good(msg) {
    log(msg, gradient('#14ff14', '#92fa92'));
}

function error(err) {
    log(err, gradient('#ff1414', '#fa7272'));
}

function sendWebEmbed(channel, embed) {
    embed.toMessage().then((value) => channel.send(value).catch(error));
}

function verifyCommands(commandList) {
    let violations = [ ];
    commandList.forEach((command) => {
        let commandIndex = commandList.indexOf(command);
        if (command.name == undefined) {
            violations.push("Command Name is undefined [Command Index: " + commandIndex + "]");
        } else {
            if (typeof command.name !== 'string') {
                violations.push("Invalid Command Name Type [must be String, Command Index: " + commandIndex + "]");
            }
        }
        if (command.aliases == undefined) {
            violations.push("Command Aliases is undefined [Command Index: " + commandIndex + "]");
        } else {
            if (!Array.isArray(command.aliases)) {
                violations.push("Invalid Command Aliases Type [must be Array, Command Index: " + commandIndex + "]");
            } else {
                command.aliases.forEach((alias) => {
                    if (typeof alias !== 'string') {
                        violations.push("Invalid Command Alias Type [must be String, Command Index: " + commandIndex + ", Alias Index: " + command.aliases.indexOf(alias) + "]");
                    }
                });
            }
        }
        if (command.description == undefined) {
            violations.push("Command Description is undefined [Command Index: " + commandIndex + "]");
        } else {
            if (typeof command.description !== 'string') {
                violations.push("Invalid Command Description Type [must be String, Command Index: " + commandIndex + "]");
            }
        }
        if (command.func == undefined) {
            violations.push("Command Function is undefined [Command Index: " + commandIndex + "]");
        } else {
            if (typeof command.func !== 'function') {
                violations.push("Invalid Command Func Type [must be a function, Command Index: " + commandIndex + "]");
            }
        }

        commandList.forEach((compare) => {
            if (commandList.indexOf(compare) == commandIndex) return;
            if (command.name == undefined || compare.name == undefined) return;
            if (command.aliases == undefined || compare.aliases == undefined) return;

            if (command.name.toLowerCase() == compare.name.toLowerCase()) {
                violations.push("Command Name Duplicate [" + command.name + ", Command Index: " + commandIndex + "]");
            }
            command.aliases.forEach((alias) => {
                compare.aliases.forEach((compareAlias) => {
                    if (alias.toLowerCase() == compareAlias.toLowerCase()) {
                        violations.push("Command Alias Duplicate [" + alias + ", Command Index: " + commandIndex + "]");
                    }
                });
            });
        });
    });
    if (violations.length > 0) {
        violations.forEach((violation) => {
            error("[" + violations.indexOf(violation) + "] Found command violation! " + violation);
        });
        return false;
    }
    return true;
}

module.exports.getToken = getToken;
module.exports.retrieveToken = retrieveToken;
module.exports.loadExternalCommands = loadExternalCommands;
module.exports.log = log;
module.exports.good = good;
module.exports.error = error;
module.exports.sendWebEmbed = sendWebEmbed;
module.exports.verifyCommands = verifyCommands;