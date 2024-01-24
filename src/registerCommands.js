const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { commands } = require('./handlers/commandHandler');
require('dotenv').config();

const clientId = process.env.CLIENT_ID;
const guildId = process.env.BIONIC_GUILD_ID;
const token = process.env.DISCORD_BOT_TOKEN;


const rest = new REST({ version: '9' }).setToken(token);

const commandsData = Array.from(commands.values()).map(cmd => cmd.data);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: commandsData },
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();