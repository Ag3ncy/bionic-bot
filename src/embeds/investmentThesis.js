const { EmbedBuilder } = require('discord.js');

module.exports = () => {
    return new EmbedBuilder()
        .setTitle('Bionic Investment Thesis')
        .setDescription(`**Vision**\nAt Bionic, we're building the foundation for a decentralized, transparent, and empowered tomorrow. We accelerate the future by incubating, funding, and launching transformative technologies powered by Web3 principles.

**Four Pillars of Innovation**
• **Synthetic Reality (XR):** Immersive technologies that merge physical and digital worlds, revolutionizing education, entertainment, and collaboration.
• **Decentralized Science (DeSci):** Open-source, collaborative research advancing medicine and climate science, powered by tokenized contributions.
• **Artificial Intelligence (AI):** Ethical AI enhancing human capabilities, with decentralized AI training and learning models.
• **Next-Generation Infrastructure (iX):** Scalable blockchain solutions and quantum-resistant cryptography enabling the decentralized web.

**Our Approach**
• **Incubation:** Mentorship, resources, and collaboration for early-stage projects.
• **Funding:** Democratized investment through our DAO structure.
• **Launch:** Streamlined processes for bringing cutting-edge innovations to market.

**Why Web3 is Critical**
Web3 is the foundation of our vision—enabling decentralized innovation, fair value distribution, and trust-by-design systems.

Join us in shaping the future through transformative technology!`)
        .setColor('#af72ff');
};
