const WebEmbed = require("../WebEmbed");
const Util = require("../Util");

module.exports = {
    name: "webembed",
    aliases: [ "embedexample", "webex" ],
    description: "WebEmbed example",
    func: (msg, args) => {
        Util.sendWebEmbed(msg.channel, new WebEmbed({shorten: true, hidden: true})
            .setAuthor({ name: 'WebEmbed', url: '' })
            .setColor('GREEN')
            .setDescription("Example"));
    }
};