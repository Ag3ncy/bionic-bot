require('dotenv').config();
const { Client, Events, GatewayIntentBits } = require('discord.js');
const { executeCommand } = require('./handlers/commandHandler');
const analyticsService = require('./services/analyticsService');
const xpService = require('./services/xpService');


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
client.once('ready', async () => {
    console.log('Bot is ready');
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

client.on('messageCreate', async message => {
    if (!message.author.bot) {
        analyticsService.logMessage(message);
        analyticsService.logReply(message);

        // Basic XP for sending a message
        xpService.addXP(message.author.id, 10, message.member);

        // Check if this is a reply to a message
        if (message.reference && message.reference.messageId) {
            try {
                const referencedMessage = await message.channel.messages.fetch(message.reference.messageId);
                const referencedMember = referencedMessage.member;

                const bionicTeamRoleId = '1151898649824071691';
                const bionicDaoRoleId = '1209796268545806396';
                const projectTeamRoleId = '1209139700288331798';

                // Check for specific roles like Bionic team or project teams in the replied message
                const isBionicTeamReply = referencedMember.roles.cache.has(bionicTeamRoleId);
                const isProjectTeamReply = referencedMember.roles.cache.has(projectTeamRoleId);
                const isBionicDaoReply = referencedMember.roles.cache.has(bionicDaoRoleId);

                // Additional XP for replying to specific roles
                if (isBionicTeamReply || isProjectTeamReply || isBionicDaoReply) {
                    xpService.addXP(message.author.id, 10, message.member);
                }
            } catch (error) {
                console.error('Failed to fetch referenced message:', error);
            }
        }
    }

    if (!message.author.bot) {
        const args = message.content.split(/\s+/); // Split message content into words by whitespace
        const command = args.shift().toLowerCase(); // Extract the command and convert to lower case
        const adminRoleId = '1208372802814476308'; 
        const member = message.member;
        // Check if the member has the admin role
        const isAdmin = member.roles.cache.has(adminRoleId);
        if (isAdmin) {
        switch (command) {
            case '!givexp':
            if (args.length >= 2) {
                const userId = args[0].replace(/\D/g, ''); // Extract numeric ID from mention
                const amount = parseInt(args[1], 10);
                if (!isNaN(amount)) {
                    // Pass true for the ignoreLimit parameter to bypass the XP limit
                    xpService.addXP(userId, amount, null, true);
                    message.channel.send(`Given ${amount} XP to user <@${userId}>.`);
                }
            }
            break;
            case '!takexp':
                if (args.length >= 2) {
                    const userId = args[0].replace(/\D/g, ''); // Extract numeric ID from mention
                    const amount = parseInt(args[1], 10);
                    if (!isNaN(amount)) {
                        xpService.removeXP(userId, amount);
                        message.channel.send(`Taken ${amount} XP from user <@${userId}>.`);
                    }
                }
                break;
            case '!checkxp':
                if (args.length >= 1) {
                    const userId = args[0].replace(/\D/g, ''); // Extract numeric ID from mention
                    const userData = xpService.getUserXPData(userId);
                    message.channel.send(`<@${userId}> has ${userData.xp} XP.`);
                }
                break;
            case '!topusers':
                // Assuming you have a function getTopUsers in xpService which returns an array of top users by XP
                const topUsers = xpService.getTopUsers();
                let reply = 'Top Users by XP:\n';
                topUsers.forEach((user, index) => {
                    reply += `${index + 1}. <@${user.id}> - ${user.xp} XP\n`;
                });
                message.channel.send(reply);
                break;
        }
    }
}
});


client.on('messageReactionAdd', async (reaction, user) => {
    analyticsService.logReaction(reaction, user);
    if (user.bot) return; // Ignore bots

    // Fetch the full user member object to check for server booster status
    const guild = reaction.message.guild;
    const member = await guild.members.fetch(user.id);
    xpService.addXP(user.id, 5, member);
});

// Example for voice state update to track users in voice chat
client.on('voiceStateUpdate', (oldState, newState) => {
    // Logic to handle voice state updates
    // Award XP based on time spent in voice chat
});

client.on('guildMemberAdd', member => {
    analyticsService.logNewMember(member);
});

client.on('guildMemberRemove', member => {
    analyticsService.logMemberLeft(member);
});



client.login(process.env.DISCORD_BOT_TOKEN);
