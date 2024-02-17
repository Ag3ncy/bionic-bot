const analyticsService = {
    logMessage: (message) => {
        // Basic Message Details
        console.log(`Message ID: ${message.id}`);
        console.log(`Message Content: ${message.content}`);
        console.log(`Author: ${message.author.username}${message.author.discriminator !== '0' ? `#${message.author.discriminator}` : ''} (ID: ${message.author.id})`);
        console.log(`Created At: ${message.createdAt}`);
        console.log(`Channel: ${message.channel.name} (ID: ${message.channel.id})`);
    
        // Guild (Server) Details
        if (message.guild) { // Check if the message is not from a DM
            console.log(`Guild: ${message.guild.name} (ID: ${message.guild.id})`);
        } else {
            console.log(`Guild: DM`);
        }
    
        // Message Type (e.g., DEFAULT, REPLY, etc.)
        console.log(`Type: ${message.type}`);
    
        // Attachments
        if (message.attachments.size > 0) {
            console.log(`Attachments:`);
            message.attachments.forEach(attachment => {
                console.log(`- URL: ${attachment.url}, Name: ${attachment.name}, ID: ${attachment.id}`);
            });
        }
    
        // Mentions
        console.log(`Mentions:`);
        console.log(`- Users: ${message.mentions.users.map(user => user.tag).join(', ')}`);
        console.log(`- Roles: ${message.mentions.roles.map(role => role.name).join(', ')}`);
        console.log(`- Channels: ${message.mentions.channels.map(channel => channel.name).join(', ')}`);
    },

    logReaction: (reaction, user) => {
        const message = reaction.message;
        console.log(`Reaction: ${reaction.emoji.name} by ${user.tag} (User ID: ${user.id}) on message ID: ${message.id}`);
        console.log(`Message Content: ${message.content}`);
        console.log(`In Channel: ${message.channel.name} (ID: ${message.channel.id})`);
        if (message.guild) {
            console.log(`In Guild: ${message.guild.name} (ID: ${message.guild.id})`);
        } else {
            console.log(`In a Direct Message`);
        }
    },

    logReply: (message) => {
        if (message.reference) {
            console.log(`Reply by ${message.author.tag} to ${message.reference.messageId}: ${message.content}`);
        }
    },

    logNewMember: (member) => {
        console.log(`New Member: ${member.user.tag} (User ID: ${member.user.id}) joined ${member.guild.name}`);
        console.log(`Total Members Now: ${member.guild.memberCount}`);
    },
    
    logMemberLeft: (member) => {
        // Assuming member is a GuildMember object, which may not always provide user details upon leaving
        console.log(`Member Left: ${member.user ? member.user.tag : 'A user'} (User ID: ${member.user ? member.user.id : 'N/A'}) left ${member.guild.name}`);
        console.log(`Total Members Now: ${member.guild.memberCount}`);
        if (member.roles.cache.size > 0) {
            console.log(`Roles Had: ${member.roles.cache.map(role => role.name).join(', ')}`);
        }
    },
};

module.exports = analyticsService;