require('dotenv').config();
const { Client, Events, GatewayIntentBits } = require('discord.js');
const { executeCommand } = require('./handlers/commandHandler');
const analyticsService = require('./services/analyticsService');
const { registerCommands } = require('./registerCommands');


// Initialize Discord client
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessageReactions,
    ],
});

// Discord bot event listeners and login
client.once(Events.ClientReady, async readyClient => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);
    await registerCommands();
});

// Listen for interactions and execute commands
client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    try {
        await executeCommand(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error executing this command!', ephemeral: true });
    }
});

client.on('messageCreate', message => {
    if (!message.author.bot) {
        analyticsService.logMessage(message);
        // For replies, you can use the same messageCreate event
        analyticsService.logReply(message);
    }

    //if length > 20 sentiment(analyse)
});

client.on('messageReactionAdd', (reaction, user) => {
    analyticsService.logReaction(reaction, user);
});

client.on('guildMemberAdd', member => {
    analyticsService.logNewMember(member);
});

client.on('guildMemberRemove', member => {
    analyticsService.logMemberLeft(member);
});

client.login(process.env.DISCORD_BOT_TOKEN);
