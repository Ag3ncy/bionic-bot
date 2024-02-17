const {
  SlashCommandBuilder
} = require('discord.js');
const {
  EmbedBuilder
} = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
      .setName('info')
      .setDescription('Information about Bionic'),
  async execute(interaction) {
      const embed = new EmbedBuilder()
          .setColor(0x349eea)
          .setTitle('Welcome to Bionic')
          .setURL('https://bionicdao.com')
          .setAuthor({
              name: 'Some name',
              iconURL: 'https://pbs.twimg.com/profile_images/1735589406910656512/VDXbIvLI_400x400.jpg',
              url: 'https://bionicdao.com'
          })
          .setDescription('Put some copy here')
          .setThumbnail('https://pbs.twimg.com/profile_images/1735589406910656512/VDXbIvLI_400x400.jpg')
          .addFields({
              name: 'Copy title',
              value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc mollis dapibus nibh, vel aliquet dui faucibus vitae. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nunc bibendum lacus nec odio tincidunt, vel congue justo commodo. Donec quis metus ac ligula lacinia tempus id ac urna. Suspendisse auctor non velit ut posuere. Suspendisse quis mollis tortor. Nunc velit libero, vulputate eu sodales eu, efficitur vitae arcu. Ut faucibus arcu ut leo pulvinar, non pretium velit vulputate. Aenean molestie risus eu malesuada pulvinar. Cras ornare est diam, a fermentum tortor ultricies vitae. Nam non urna in felis efficitur cursus.',
              inline: true
          })
          .setTimestamp()
          .setFooter({
              text: 'Some footer text here',
              iconURL: 'https://pbs.twimg.com/profile_images/1735589406910656512/VDXbIvLI_400x400.jpg'
          });

      await interaction.reply({
          embeds: [embed]
      });
  },
};