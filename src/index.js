require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const { executeCommand } = require('./handlers/commandHandler');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.once('ready', () => {
    console.log('Ready!');
});

// Listen for interactions and execute commands
client.on('interactionCreate', async interaction => {
    // Ensure the interaction is a command before proceeding
    if (!interaction.isCommand()) return;

    try {
        await executeCommand(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error executing this command!', ephemeral: true });
    }
});

client.login(process.env.DISCORD_BOT_TOKEN);
