const { EmbedBuilder } = require('discord.js');

module.exports = () => {
    return new EmbedBuilder()
        .setTitle('Bionic DAO Overview')
        .setDescription(`**Why a DAO?**
The Bionic DAO structure decentralizes authority, encouraging community engagement in decision-making processes, bringing several key benefits:

**Key Benefits**
• **Community Control:** Members directly influence project selections and strategic decisions, ensuring the platform reflects community interests.
• **Enhanced Transparency:** All actions are recorded on-chain, providing an immutable record for trust and accountability.
• **Adaptability:** The DAO can pivot quickly based on new information or market shifts, allowing for flexible and responsive governance.
• **Inclusive Participation:** Every member, not just major stakeholders, can contribute, fostering a more inclusive and collaborative environment.

**Benefits of a DAO Structure**
• **Decentralized Management:** Reduces centralized control, ensuring fair decision-making.
• **Alignment of Interests:** Members act in the DAO's best interest, as their participation directly impacts its success.
• **Collective Knowledge:** Leverages the diverse expertise of the community for more informed decisions.

**How the DAO Operates**
• **Proposals and Voting:** Members propose changes or projects, and decisions are made through community voting.
• **Transparent Funding:** Funds are allocated based on clear, community-approved criteria to drive innovation.
• **Regular Updates:** The DAO framework facilitates updates and feedback sessions, keeping members informed and engaged.`)
        .setColor('#af72ff');
};
