const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { commands } = require('./handlers/commandHandler');
require('dotenv').config();

const clientId = process.env.CLIENT_ID;
const guildId = process.env.BIONIC_GUILD_ID;
const botToken = process.env.DISCORD_BOT_TOKEN; // Ensure this is your bot token
const adminRole = process.env.ADMIN_ROLE_ID; // The role ID for admins

async function registerCommands() {
    const rest = new REST({ version: '9' }).setToken(`Bot ${botToken}`);

    try {
        console.log('Started refreshing application (/) commands.');

        const commandsData = Array.from(commands.values()).map(cmd => cmd.data.toJSON());

        // Register commands
        await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: commandsData },
        );

        console.log('Successfully reloaded application (/) commands.');

        // Optionally, fetch the full list of commands registered in the guild to get their IDs
        // This step is necessary if you need command IDs for setting permissions
        const registeredCommands = await rest.get(
            Routes.applicationGuildCommands(clientId, guildId),
        );
        
        } catch (error) {
                console.error('Failed to register commands or set permissions:', error);
         }
            
}   

module.exports = { registerCommands };
