require('dotenv').config();
const express = require('express');
const axios = require('axios');
const { Client, Events, GatewayIntentBits } = require('discord.js');
const { executeCommand } = require('./handlers/commandHandler');
const analyticsService = require('./services/analyticsService');
const { registerCommands } = require('./registerCommands');
const { saveTokens, loadTokens, refreshAccessToken } = require('./services/tokenManager');




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

// Initialize Express app
const app = express();
const port = 3000; // You can use any port that's free on your system

app.use(express.json());

// Webhook route for Discord or other services
app.post('/webhook', (req, res) => {
    console.log('Received webhook:', req.body);
    res.status(200).send('Webhook received');
});

// Simple test route
app.get('/', (req, res) => {
    res.send('Hello World!');
});


// OAuth2 flow for Discord
app.get('/auth/discord', (req, res) => {
    const clientId = process.env.DISCORD_CLIENT_ID;
    const redirectUri = encodeURIComponent(process.env.DISCORD_REDIRECT_URI);
    const scope = encodeURIComponent('applications.commands.update applications.commands.permissions.update');
    res.redirect(`https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}+bot`);
});

app.get('/auth/discord/callback', async (req, res) => {
    const code = req.query.code;
    if (!code) {
        return res.status(400).send('No code provided');
    }

    try {
        const response = await axios.post('https://discord.com/api/oauth2/token', new URLSearchParams({
            client_id: process.env.DISCORD_CLIENT_ID,
            client_secret: process.env.DISCORD_CLIENT_SECRET,
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: process.env.DISCORD_REDIRECT_URI,
        }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        const tokens = {
            accessToken: response.data.access_token,
            refreshToken: response.data.refresh_token,
            expiry: Date.now() + response.data.expires_in * 1000, // Calculate expiry time
        };

        await saveTokens(tokens); // Save tokens for future use

        console.log('Access Token:', tokens.accessToken);
        res.send('Authorization successful! You can close this page.');
    } catch (error) {
        console.error('Error exchanging code for token:', error.response.data);
        res.status(500).send('Internal Server Error');
    }
});

// Start the web server
app.listen(port, () => {
    console.log(`Web server listening at http://ag3ncy.tools:${port}`);
});

// Discord bot event listeners and login
client.once(Events.ClientReady, async readyClient => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);
    await registerCommands();
});

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

module.exports = { loadTokens };