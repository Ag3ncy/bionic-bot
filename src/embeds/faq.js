const { EmbedBuilder } = require('discord.js');

module.exports = () => {
    return new EmbedBuilder()
        .setTitle('Frequently Asked Questions')
        .setDescription('Our FAQ section is regularly updated to ensure you have the latest info. Check back often for new answers and alpha.')
        .addFields({
            name: '👉 What is Bionic DAO?',
            value: 'Bionic is a new Investment DAO that focuses on capital formation for Web3 projects in four key areas of focus: Artificial Intelligence, Next-Gen Infrastructure, Decentralized Science and Extended Reality. Bionic exists to support the delivery of world-changing Web3 innovations that will help meet the challenges that humanity faces.'
        }, {
            name: '👉 Our vision',
            value: 'We stand at the forefront of a transformative era, fueled by the convergence of web3 and other groundbreaking technologies. Our vision is a future where the challenges of today, from environmental crises to health dilemmas, are not just addressed but conquered through decentralized innovation. Bionic will achieve this by creating a transparent, trusted, and community-led platform that connects the best ideas to the most well-informed and engaged investors.'
        }, {
            name: '👉 How is Bionic different?',
            value: 'Bionic stands out from other investment platforms by fostering collaboration and knowledge-sharing among a select community of bold leaders in the Web3 space. It emphasizes exclusivity, transparency, and a data-driven approach to drive transformational change. Unlike other fundraising platforms, Bionic focuses on propelling game-changing ideas forward by assembling the right people rather than the most people.'
        }, {
            name: '👉 Do you have a roadmap?',
            value: 'We are continually developing the Bionic platform and ecosystem but do not currently have a public roadmap. Our plans will be shared with community members in due course.'
        }, {
            name: '👉 What projects will Bionic invest in?',
            value: 'Every one of our projects is handpicked, creating the most exclusive platform for founders and investors in Web3. We have partnerships with multiple VCs and blockchain platforms for deal flow, and projects will be announced in due course.'
        }, {
            name: '👉 What benefits do members receive?',
            value: 'We only select the best. Members are selected through an application process that evaluates their contribution to, and engagement in, the Web3 space. Through the application process we will evaluate whether members are aligned with Bionics ethos.'
        }, {
            name: '👉 How are community members selected?',
            value: 'We only select the best. Members are selected through an application process that evaluates their contribution to, and engagement in, the Web3 space. Through the application process we will evaluate whether members are aligned with Bionics ethos.'
        }, {
            name: '👉 Is there a membership limit?',
            value: 'Yes, to maintain community quality and engagement, the total membership will be capped, with more details to be announced in the coming weeks.'
        })
        .setColor('#af72ff');
};
