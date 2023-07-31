const Util = require("../Util");

module.exports = {
    name: "external",
    aliases: [ "example", "ex" ],
    description: "Example external command",
    func: (msg, args) => {
        msg.channel.send("Argument 1: " + args[0]).catch(Util.error);
    }
};