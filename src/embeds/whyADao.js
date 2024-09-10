const { EmbedBuilder } = require('discord.js');

module.exports = () => {
    return new EmbedBuilder()
        .setTitle('Why an Investment DAO?')
        .setDescription(`**The Problem with Traditional Launchpads**
The current launchpad model often emphasizes short-term gains, influenced by key opinion leaders (KOLs) and token overallocation, which skews market dynamics.

**Why Bionic DAO?**
• **Ensuring Investment Quality:** By leveraging collective expertise, Bionic carefully vets and selects only the most promising projects.
• **Focusing on Long-Term Value:** Bionic promotes sustainable investment practices that prioritize long-term growth over short-term profits.
• **Increasing Transparency and Control:** Members have deep insight and control over the investment process, aligning with our values of transparency and integrity.
• **Pioneering Future Tech:** We position our community as early adopters and supporters of the most innovative projects in tech.
• **Building a High-Quality Investment Community:** We attract knowledgeable investors to foster an informed, sophisticated investment environment.`)
        .setColor('#af72ff');
};
