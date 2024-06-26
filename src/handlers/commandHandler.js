const fs = require('fs');
const path = require('path');

const commands = new Map();

const loadCommands = () => {
    const commandFolders = fs.readdirSync('../commands');
    for (const folder of commandFolders) {
        const commandFiles = fs.readdirSync(`../commands/${folder}`).filter(file => file.endsWith('.js'));
        for (const file of commandFiles) {
            const command = require(`../commands/${folder}/${file}`);
            commands.set(command.data.name, command);
        }
    }
};

loadCommands(); // Call this function once to load the commands when your bot starts

module.exports = {
    commands,
    executeCommand: async (interaction) => {
      const command = commands.get(interaction.commandName);
      if (!command) return;
  
      try {
        await command.execute(interaction);
      } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error executing this command!', ephemeral: true });
      }
    }
  };
