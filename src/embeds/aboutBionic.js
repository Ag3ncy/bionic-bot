const { EmbedBuilder } = require('discord.js');

module.exports = () => {
    return new EmbedBuilder()
        .setTitle('About Bionic')
        .setDescription('Welcome to Bionic!\n\nBionic is a new Investment DAO that is set to connect the best Web3 founders with the savviest investors and supercharge the best and brightest ideas on the planet.\n\nBionic is not like any other investment platform. It is the place where new ideas are sparked into life, driven by collaboration and knowledge-sharing.\n\nFounded by established Web3 leaders and shaped by a world-class advisory board, Bionic is set to change the way that innovative ideas are fostered and delivered.')
        .setColor('#af72ff');
};
