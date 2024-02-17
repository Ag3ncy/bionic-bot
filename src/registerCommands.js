const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { commands } = require('./handlers/commandHandler');
require('dotenv').config();

const clientId = process.env.CLIENT_ID;
const guildId = process.env.BIONIC_GUILD_ID;
const token = process.env.DISCORD_BOT_TOKEN;
const adminRole = process.env.ADMIN_ROLE_ID;

const rest = new REST({ version: '9' }).setToken(token);

async function registerCommands() {
    try {
        console.log('Started refreshing application (/) commands.');

        const commandsData = Array.from(commands.values()).map(cmd => cmd.data);

        // Register commands
        await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: commandsData },
        );

        console.log('Successfully reloaded application (/) commands.');

        // Fetch the full list of commands registered in the guild
        const registeredCommands = await rest.get(
            Routes.applicationGuildCommands(clientId, guildId),
        );

        // Assuming admin commands are tagged with isAdmin: true
        const adminCommands = registeredCommands.filter(cmd => commands.get(cmd.name).isAdmin);

        // Set permissions for admin commands
        for (const cmd of adminCommands) {
            const permissions = [
                {
                    id: guildId,
                    type: 1, // Use 1 for ROLE
                    permission: false,
                },
                {
                    id: adminRole,
                    type: 1, // Use 1 for ROLE
                    permission: true,
                },
            ];
        
            await rest.put(
                Routes.applicationCommandPermissions(clientId, guildId, cmd.id),
                { body: { permissions } },
            );
        }

        console.log('Permissions set for admin commands.');
    } catch (error) {
        console.error(error);
    }
}

module.exports = { registerCommands };