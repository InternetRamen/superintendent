import { Client, Message, MessageEmbed, TextChannel } from "discord.js-light";

module.exports.run = async (client: Client, message: Message, args: string[]) => {

    if(message.member?.roles.highest.name != "Operator") return

    client.channels.fetch(String(args[0].match(/\d+/)))
		.then(channel => {
            (channel as TextChannel).messages.fetch(args[1])
                .then(targetMsg => {
                    var targetEmbed: MessageEmbed = targetMsg.embeds[0]
                    var indexComplete: number = -1
                    for(const [index, field] of targetEmbed.fields.entries()) {
                        if(field.name === "Completed by") {
                            indexComplete = index;
                        }
                    }
                    if(indexComplete != -1) {
                        targetEmbed.fields[indexComplete].value += `, ${args[2]}`
                    } else {
                        targetEmbed.addField('Completed by', args[2])
                    }
                    targetMsg.edit(targetEmbed);
                })
		})
        .catch(err => console.error(err))
}
module.exports.help = {
	name: "completeb",
	description: "A command that allows operators to mark a bounty as complete.",
	aliases: [],
	usage: "?completeb <#channel> <message id> <completed user with additional text>",
	permissions: "<@&766011830355099738>",
}
