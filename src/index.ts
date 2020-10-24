import { Client, Collection, Intents, Message } from 'discord.js-light';
import config from '../configs/config.json';
import fs from 'fs';
const i: Intents = new Intents(Intents.ALL).remove("GUILD_MESSAGE_TYPING");
const client: Client = new Client({
	ws: { intents: i },
	cacheGuilds: true,
	cacheChannels: false,
	cacheOverwrites: false,
	cacheRoles: false,
	cacheEmojis: false,
	cachePresences: false
});

const cmdFolders: string[] = fs.readdirSync(__dirname + "/cmds/")

client.cmds = new Collection()
// Command Handler
cmdFolders.forEach(folder => {

	const cmdFile: string[] = fs.readdirSync(__dirname + `/cmds/${folder}`)
	const tsfiles: string[] = cmdFile.filter(f => f.split(".").pop() === "js")
	if (tsfiles.length <= 0) throw "Err: Could not find commands."
	tsfiles.forEach((f, i) => {
		let prop = require(`./cmds/${folder}/${f}`);
		console.log(`${f} loaded!`);
		// interface setFace {
		// 	func: (client: Client, message: Message, args: string[]) => void,
		// 	name: string,
		// 	description: string,
		// 	aliases: string[],
		// 	usage: string,
		// 	permissions: string,
		// 	category: string
		// }
		const set = {
			func: prop,
			name: prop.help.name,
			description: prop.help.description,
			aliases: prop.help.aliases,
			usage: prop.help.usage,
			permissions: prop.help.permissions,
			category: folder,
		}
		client.cmds.set(prop.help.name, set);

	});
})


// Ready event
client.on("ready", () => {
	console.log("Ready!")
})

// Message event
client.on("message", message => {
	if (message.channel.type === "dm") return;
	if (message.author.bot) return;
	if (!message.content.startsWith(config.prefix)) return;
	const messageArray: string[] = message.content.split(" ");
	const cmd: string = messageArray[0].slice(config.prefix.length)
	const args: string[] = messageArray.slice(1);
	let cmdFile = client.cmds.get(cmd)
	if (cmdFile) {
		cmdFile = cmdFile.func
		cmdFile.run(client, message, args);
	} else if (client.cmds.find(val => val.aliases.includes(cmd))) {
		let aliasFile = client.cmds.find(val => val.aliases.includes(cmd))
		aliasFile = aliasFile.func
		aliasFile.run(client, message, args);
	}
})




client.login(config.token)