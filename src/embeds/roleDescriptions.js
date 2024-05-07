const { EmbedBuilder } = require("discord.js")

module.exports = () => {
    return new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle('Role Selection')
                .setDescription('Add or remove roles using the buttons below.')
                .addFields(
                    { name: 'Notifications', value: '<@&1235909361134473327> - Stay up-to-date with the latest news and announcements.' },
                    { name: 'Social Raid', value: '<@&1208756025734336574> - Get notified whenever we post on socials.' },
                    { name: 'Project Hunter', value: '<@&1214983147968659518> - Allows you to post links to projects you come across.' }
                );
            };