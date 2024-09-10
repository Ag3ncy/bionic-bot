const { EmbedBuilder } = require('discord.js');

module.exports = () => {
    return new EmbedBuilder()
        .setTitle('Bionic DAO Platform Features')
        .setDescription(`**Elegant Design & User Experience**
The Bionic DAO platform is designed with elegance and user experience in mind. Despite its powerful features, the clean interface ensures a seamless and efficient investment journey.

**Key Features**
• **One-Click Investing:** Invest effortlessly with our one-click feature, designed to provide quick access to pre-sales.
• **In-depth Analytics:** Access comprehensive project analytics to make informed investment decisions with clarity and insight.
• **DAO Governance:** Participate in decision-making through our governance structure, powered by Aragon's optimistic DAO framework, fostering transparency and community involvement.
• **Token Management:** Efficiently manage your $BCNX tokens for seamless transactions and staking.
• **Integrated Smart Wallet:** Securely manage your digital assets with the Bionic Smart Wallet, combining security with user-friendly interactions.
• **Zero, AI Concierge:** Get support and guidance across the platform with Zero, our AI concierge, assisting with investment insights and technical queries.`)
        .setColor('#af72ff');
};
