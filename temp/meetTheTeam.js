const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('meet_team')
    .setDescription('Updates or sends new embeds about the team'),
    async execute(message, args) {
        const channelId = '1208364017362538536';
        const channel = message.guild.channels.cache.get(channelId);

        if (!channel) return console.error("Channel not found.");

        try {
            // Example user profile information
            const domProfile = {
                title: "Dom Rodwell - CPO",
                description: "Brought multiple tech platforms to market across mobile, web and web3 reaching billions of users. Deep experience as CEO & CPO building and scaling teams and projects.",
                imageUrl: 'https://media.licdn.com/dms/image/D4E03AQFCT2BbeJ3BBg/profile-displayphoto-shrink_200_200/0/1695732558142?e=1713398400&v=beta&t=Kw17URg61Dowhp0zsKxsChd6HzaydIrLdmGt7dc9qys', // Replace with the user's image URL
                twitterUrl: 'arkit3kt.eth' // Replace with the user's Twitter URL
            };

            // Create an embed with the user's profile information using EmbedBuilder
            const domEmbed = new EmbedBuilder()
            .setColor(0xea4678) // Set the line color of the embed
            .setTitle(domProfile.title) // Set the title of the embed
            .setDescription(domProfile.description) // Set the description of the embed
            .setThumbnail(domProfile.imageUrl) // Set the thumbnail of the embed, which appears to the left of the text
            .setFooter({ text: `@${domProfile.twitterUrl}` }); // Set the footer of the embed with the Twitter URL

            const richProfile = {
                title: "Richard Simpson - CSO",
                description: "Ex CEO of Launcpool.xyz and senior team member ALphabit. Delivered over $20m of capital formation for 40 web3 and crypto projects across DeFi, gaming, fashion, metaverse & infrastructure.",
                imageUrl: 'https://media.licdn.com/dms/image/C5603AQF-CYMbwEV-Zg/profile-displayphoto-shrink_200_200/0/1537429403092?e=1713398400&v=beta&t=LiJQdCsIJJbAXA929iBut3hMUNQB05IYHV21jdwCPjg', // Replace with the user's image URL
                twitterUrl: '0xsimmo' // Replace with the user's Twitter URL
            }

            const richEmbed = new EmbedBuilder()
            .setColor(0xa24ca5) // Set the line color of the embed
            .setTitle(richProfile.title) // Set the title of the embed
            .setDescription(richProfile.description) // Set the description of the embed
            .setThumbnail(richProfile.imageUrl) // Set the thumbnail of the embed, which appears to the left of the text
            .setFooter({ text: `@${richProfile.twitterUrl}` }); // Set the footer of the embed with the Twitter URL

            const rebeccaProfile = {
                title: "Rebecca Short - COO",
                description: "Ex-agency director and former head of product and delivery at a tech incubator. 4 years experience working with tech founders to scale their product and business.",
                imageUrl: 'https://media.licdn.com/dms/image/D4E03AQHU4MRGigfkbA/profile-displayphoto-shrink_200_200/0/1678122148320?e=1713398400&v=beta&t=-I9jUUHAFIEhtsMc7K8tL_UMnF_Eio3SkoAElEDI1-8', // Replace with the user's image URL
                twitterUrl: 'RebeccaCShort1' // Replace with the user's Twitter URL
            }

            const rebeccaEmbed = new EmbedBuilder()
            .setColor(0x339fe9) // Set the line color of the embed
            .setTitle(rebeccaProfile.title) // Set the title of the embed
            .setDescription(rebeccaProfile.description) // Set the description of the embed
            .setThumbnail(rebeccaProfile.imageUrl) // Set the thumbnail of the embed, which appears to the left of the text
            .setFooter({ text: `@${rebeccaProfile.twitterUrl}` }); // Set the footer of the embed with the Twitter URL

            const ahmadProfile = {
                title: "Ahmad Pouladzadeh - CTO",
                description: "Software architect with 8 years working in web3 including identity, gaming, DeFi & building exchanges. Strong builder and leader of technical teams.",
                imageUrl: 'https://media.licdn.com/dms/image/C5603AQHAO-WBJ9xd8g/profile-displayphoto-shrink_200_200/0/1628597625808?e=1714003200&v=beta&t=cGfnY11SyQ8qw9klW90P9lM4mO1Qq_nIItOLrg84ZRU', // Replace with the user's image URL
                twitterUrl: 'pouladzade' // Replace with the user's Twitter URL
            }

            const ahmadEmbed = new EmbedBuilder()
            .setColor(0x00e4a1) // Set the line color of the embed
            .setTitle(ahmadProfile.title) // Set the title of the embed
            .setDescription(ahmadProfile.description) // Set the description of the embed
            .setThumbnail(ahmadProfile.imageUrl) // Set the thumbnail of the embed, which appears to the left of the text
            .setFooter({ text: `@${ahmadProfile.twitterUrl}` }); // Set the footer of the embed with the Twitter URL


            await channel.send({embeds: [domEmbed, richEmbed, rebeccaEmbed, ahmadEmbed]});
            
        } catch (error) {
            console.error("An error occurred while sending/updating the embed:", error);
        }
    },
};
