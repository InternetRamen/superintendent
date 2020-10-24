import { Client, Message, MessageEmbed } from "discord.js-light";
import { exec, execSync } from "child_process";
module.exports.run = async (client: Client, message: Message, args: string[]) => {
	if (message.author.id !== "728255006079189022") return message.channel.send("You do not have the permissions to use this command.")

	let command = args.join(" ")
	const output = execSync(command, { encoding: 'utf-8' });  // the default is 'buffer'
	message.channel.send(`\`\`\`${output}\`\`\``)

}
module.exports.help = {
	name: "exec",
	description: "Execute a shell script",
	aliases: [],
	usage: "?exec <command>",
	permissions: "<@728255006079189022>",
}