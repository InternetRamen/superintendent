import { Client, Message, MessageEmbed } from "discord.js-light";

module.exports.run = async (client: Client, message: Message, args: string[]) => {
    message.channel.messages.fetch(args[0])
        .then(targetMsg => {
            var targetEmbed: MessageEmbed = targetMsg.embeds[0]
            targetEmbed.addField('Completed by', args[1])
            targetMsg.edit(targetEmbed);
        })
        .catch(console.error);
}
module.exports.help = {
	name: "completeb",
	description: "A command that allows operators to mark a bounty as complete.",
	aliases: [],
	usage: "?completeb <message id> <completed user with additional text>",
	permissions: "<@&766011830355099738>",
}
