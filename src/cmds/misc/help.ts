import { Client, Message, MessageEmbed } from "discord.js-light";

module.exports.run = async (client: Client, message: Message, args: string[]) => {
	// get all the command names
	if (!client.user) return;
	let commands: string[] = []
	client.cmds.forEach(cmd => {
		commands.push(cmd.name)
	})

	let helpEmbed = new MessageEmbed()
		.setTitle(`Command list for **${client.user.username}**`)
		.setFooter(`${client.user.username} `, client.user.displayAvatarURL() || "")
		.setTimestamp()
		.setDescription("Use `?help [command name]` for more info about a certain command.")
		.setColor("#16daff")
	if (args.length == 0) {
		// default
		helpEmbed.addField("Commands", commands.join('\n'))
	} else {
		// If there is a command name argument
		let cmd: string = args[0].toLowerCase()
		let cmdObj = client.cmds.get(cmd)
		let alias: string[] = cmdObj.aliases
		let permission: string = cmdObj.permissions
		if (alias.length === 0) alias = ["None"]
		if (permission === "") permission = "Everyone"

		helpEmbed.addField("Name", cmdObj.name, true)
		helpEmbed.addField("Category", cmdObj.category || undefined, true)
		helpEmbed.addField("Description", cmdObj.description, true)
		helpEmbed.addField("Aliases", alias.join(", "), true)
		helpEmbed.addField("Usage", cmdObj.usage, true)
		helpEmbed.addField("Permissions", permission, true)

	}
	message.channel.send({ embed: helpEmbed })

}

module.exports.help = {
	name: "help",
	description: "Displays all the commands",
	aliases: ["h"],
	usage: "?help [command name]",
	permissions: "",
}