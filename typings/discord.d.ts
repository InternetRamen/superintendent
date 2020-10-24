import { Collection } from "discord.js-light";

declare module "discord.js" {
    export interface Client {
		cmds: Collection<unknown, any>,
		desc: Collection<unknown, any>
    }
}