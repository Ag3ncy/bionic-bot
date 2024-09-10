const { EmbedBuilder } = require('discord.js');

module.exports = () => {
    return new EmbedBuilder()
        .setTitle('How Bionic DAO Works')
        .setDescription(`**Private Investment Platform**
Bionic DAO offers members exclusive access to invest in upcoming high-tier blockchain projects.

**Application Process**
Potential members apply for membership, and we evaluate both on-chain and off-chain data to ensure they align with our community standards.

**Member Access**
Approved members gain access to detailed project data and early investment opportunities at pre-launch prices. Members also hold voting rights, influencing key DAO decisions.

**Allocation System**
Investment opportunities are distributed through the Bionic Distribution System, ensuring fairness. Members can increase their allocation chances based on contributions and involvement. More details can be found under the Bionic Presales section.

**Ongoing Involvement**
Members are encouraged to stay active, participate in governance, and contribute to the platform to maximize returns and influence.

**Service Provisions**
Members can offer their skills and services to the community. Proposals for contributions can be submitted, and approved members actively shape the DAO’s future.

**User-Friendly Platform**
Our platform is straightforward and designed to ensure all members can easily navigate and optimize their investment experience.`)
        .setColor('#af72ff');
};
