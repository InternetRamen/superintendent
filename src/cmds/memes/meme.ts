import { Client, Message, MessageEmbed } from "discord.js-light";
import randomPuppy from "random-puppy";
module.exports.run = async (client: Client, message: Message, args: string[]) => {

	let memeEmbed = new MessageEmbed()
		.setTitle("Relatable!")
		.setImage(await randomPuppy('ProgrammerHumor'))
		.setColor("#16daff")
	message.channel.send({ embed: memeEmbed })

}
module.exports.help = {
	name: "meme",
	description: "Sends a random programming meme from r/ProgrammerHumor, so we can laugh our tears away.",
	aliases: ["m"],
	usage: "?meme",
	permissions: "",
}
