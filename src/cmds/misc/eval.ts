import { Client, Message, MessageEmbed } from "discord.js-light";
module.exports.run = async (client: Client, message: Message, args: string[]) => {
	if (message.author.id !== "728255006079189022") return message.channel.send("You do not have the permissions to use this command.")


	function clean(text: string) {
		if (typeof (text) === "string")
			return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
		else
			return text;
	}
	if (message.author.id !== "728255006079189022") return;
	try {
		const code = args.join(" ");
		let evaled = eval(code);
		if (code.includes("process.env")) return;
		if (typeof evaled !== "string")
			evaled = require("util").inspect(evaled);

		message.channel.send(clean(evaled), { code: "xl" });
	} catch (err) {
		message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
	}



}
module.exports.help = {
	name: "eval",
	description: "A developer only command that allows the developer to run code without having to edit a file.",
	aliases: [],
	usage: "?eval <code>",
	permissions: "<@728255006079189022>",
}
