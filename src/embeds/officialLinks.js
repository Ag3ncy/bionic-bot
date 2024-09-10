const { EmbedBuilder } = require('discord.js');

module.exports = () => {
    return new EmbedBuilder()
        .setTitle('Official Links')
        .setDescription('Discover all our official links below.')
        .addFields({
            name: '🕸️ Website',
            value: '[BionicDAO](https://bionicdao.com/)',
            inline: true
        }, {
            name: '🐦 Twitter',
            value: '[Follow Us](https://twitter.com/bionicdao_)',
            inline: true
        }, {
            name: '📽️ YouTube',
            value: '[Subscribe](https://www.youtube.com/@BionicDAO)',
            inline: true
        }, {
            name: '🖇️ LinkedIn',
            value: '[Connect](https://www.linkedin.com/company/thebionicdao/)',
            inline: true
        }, {
            name: '📑 Medium',
            value: '[Read](https://bionicdao.medium.com/)',
            inline: true
        }, {
            name: '🗞️ Newsletter',
            value: '[Subscribe](https://next.bionicdao.com/)',
            inline: true
        }, {
            name: '📜 Whitepaper',
            value: '[Explore](https://bionic-dao.gitbook.io/bionic-dao-docs)',
            inline: true
        }, {
            name: '📺 TikTok',
            value: '[Watch](https://www.tiktok.com/@bionicdao_)',
            inline: true
        }, {
            name: '💬 Telegram',
            value: '[Join](https://t.me/officialbionicdao)',
            inline: true
        })
        .setColor('#af72ff');
};
