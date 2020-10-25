import { Console, error } from "console";
import { Client, Message, MessageEmbed } from "discord.js-light";

module.exports.run = async (client: Client, message: Message, args: string[]) => {

	var i;
	
	var embedColor = "#eb4034"

	var bountyEmbed = new MessageEmbed()
		.setColor(embedColor)
		.setFooter("Created by " + message.author.username)

	//Create Embed with color and footer

	var messageList: string[] = ["What do you want your title to be?", "What is the description?", "What is the language?", "What is the difficulty?", "What will be the reward?"]
	var responses: string[] = []

	//Create an array of messages as well as an array of responses, I did this so it'll be easier to add more.

	var response;
	var ended = false;

	const filter = (response: Message) => response.author.id === message.author.id;

	var sentMessages: number = 1;

	//Create some variables, also create a filter. response is for storing responses, ended is for seeing if it ende
	//And sentMessages is for keeping track of the number of messages to delete, it starts at 1 to get rid of
	//the initial command

	for(i = 0; i < 5; i++) {
		if(ended) {
			continue
		}
		await message.channel.send(messageList[i])
		sentMessages++;

		await message.channel.awaitMessages(filter, { max: 1, time: 600000, errors: ['time'] })
			.then(collected => {
				response = collected.first()!.content

				sentMessages++;
				
				if(response.toLowerCase() == "cancel") {
					throw 'User cancelled';
				} else {
					responses.push(response)
				}
			})
			.catch(_ => {
				message.channel.send("You didn't answer in time or cancelled.")
				ended = true;
			});
	}

	if(ended) {
		return
	}

	await message.channel.messages.fetch( {limit: sentMessages} ).then(messages => {
		if(message.channel.type == "text") {
			message.channel.bulkDelete(messages)
		}
	})

	//deletes the number of messages

	bountyEmbed.setTitle(responses[0])
	bountyEmbed.setDescription(responses[1])
	bountyEmbed.addField('Language', responses[2])
	bountyEmbed.addField('Difficulty', responses[3])
	bountyEmbed.addField('Reward', responses[4])

	await message.channel.send( {embed: bountyEmbed} )

}

module.exports.help = {
	name: "createb",
	description: "Creates a code-bounty",
	aliases: ["m"],
	usage: "?createb",
	permissions: ["<@728255006079189022>", "<@304357555688308736>"],
}