const { EmbedBuilder } = require('discord.js');

module.exports = () => {
    return new EmbedBuilder()
        .setTitle('Bionic DAO')
        .setDescription(`**Our Belief**
We believe in a decentralized future and a better way to drive innovation.

**Mission**
Bionic is building an open protocol that provides projects of all sizes with a permissionless framework for starting, funding, and launching technologies that push humanity forward.

**Starting the Journey**
We begin with a members-only community that offers exclusive access to top-tier investment opportunities and a DAO dedicated to optimizing systems for startup growth. This community of forward-thinkers will be the catalysts of change.

**DAO Incentives**
Members are incentivized to support, promote, and advise projects on Bionic, laying the crypto-economic foundation for future technology launches.

**Focus Areas**
Bionic is focused on Synthetic Reality, AI, DeSci, and smart infrastructure. These technologies demand new models for funding, incubation, and acceleration.

**Vision for the Future**
Over the next three years, Bionic will fully decentralize, operating almost entirely on smart contract rails. These rails will connect people and ideas to resources and ensure that the best ideas have a chance to reshape the world.`)
        .setColor('#af72ff');
};
