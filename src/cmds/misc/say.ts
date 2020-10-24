import { Client, Message, MessageEmbed } from "discord.js-light";
module.exports.run = async (client: Client, message: Message, args: string[]) => {
	if (!message.member?.roles.cache.map(val => val.id).includes("766011830355099738")) return message.channel.send("Sorry! You do not have permission to use this command!")
	if (!client.user) return;
	if (args.length === 0 || !args || !args.join(" ").includes("|")) return message.channel.send(`Usage: ${module.exports.help.usage}`)
	let joined: string = args.join(" ")
	let mArray: string[] = joined.split("|")
	let title: string = mArray[0]
	let desc: string = mArray[1]
	let embed = new MessageEmbed()
		.setTitle(title)
		.setFooter(`${ client.user.username }`, client.user.displayAvatarURL()!)
		.setDescription(desc)
		.setColor("#16daff")
	message.channel.send({ embed: embed })
}
module.exports.help = {
	name: "say",
	description: "Make the bot say something on your behalf.",
	aliases: [],
	usage: "?say <title>|<description>",
	permissions: "<@766011830355099738>",
}