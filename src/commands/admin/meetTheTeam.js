const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('meet_team')
    .setDescription('Updates or sends new embeds about the team'),
    async execute(message, args) {
        if (!message.member.permissions.has("ADMINISTRATOR")) {
            return message.reply("You do not have the required permissions to use this command.");
        }

        const channelId = '1208364017362538536'; // Replace with your target channel ID
        const channel = message.guild.channels.cache.get(channelId);

        if (!channel) return console.error("Channel not found.");

        try {
            // Attempt to find an existing message with the embed
            const messages = await channel.messages.fetch({ limit: 100 });
            const embedMessage = messages.find(msg => msg.embeds.length > 0 && msg.embeds[0].footer && msg.embeds[0].footer.text === 'UniqueIdentifier');

            const embed = new EmbedBuilder()
                .setTitle('Meet The Team')
                .setDescription('Details about the team')
                .setFooter({ text: 'UniqueIdentifier' });

            // If the embed exists, edit it
            if (embedMessage) {
                await embedMessage.edit({ embeds: [embed] });
            } else {
                // If the embed doesn't exist, send a new one
                await channel.send({ embeds: [embed] });
            }
        } catch (error) {
            console.error("An error occurred while sending/updating the embed:", error);
        }
    },
};
