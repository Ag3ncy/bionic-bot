require('dotenv').config();
const {
	Client,
	Events,
	GatewayIntentBits,
	EmbedBuilder,
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
	StringSelectMenuBuilder,
	AttachmentBuilder
} = require('discord.js');
const {
	executeCommand
} = require('./handlers/commandHandler');
const analyticsService = require('./services/analyticsService');
const xpService = require('./services/xp/xpService');
const roleSelectionEmbed = require('./embeds/roleDescriptions');
const officialLinksEmbed = require('./embeds/officialLinks');
const aboutBionicEmbed = require('./embeds/aboutBionic');
const faqEmbed = require('./embeds/faq');
const fs = require('fs');
const path = require('path');

// Initialize Discord client
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildMessageReactions,
	],
});


client.once('ready', async () => {
    console.log('Bot is ready');
	try {
        teamProfiles = await loadProfiles();
        console.log("Team Profiles Loaded:", teamProfiles);
    } catch (error) {
        console.error("Error loading profiles:", error);
    }
    const channel = client.channels.cache.get('1232649437155954789'); 
    if (!channel) {
        console.log('Channel not found');
        return;
    }

    const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId('learn-about-bionic')
                .setLabel('💊 About Bionic')
                .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
                .setCustomId('get-roles')
                .setLabel('🌟 Get Roles')
                .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
                .setCustomId('meet-the-team')
                .setLabel('👥 Meet the Team')
                .setStyle(ButtonStyle.Secondary),
			new ButtonBuilder()
                .setCustomId('official-links')
                .setLabel('🔗 Official Links')
                .setStyle(ButtonStyle.Secondary),
			new ButtonBuilder()
                .setCustomId('faq')
                .setLabel('❓ FAQ')
                .setStyle(ButtonStyle.Secondary)
        );

    const imagePath = 'src/assets/welcome.png'; 
    const imageAttachment = new AttachmentBuilder(imagePath);

    try {
        await channel.send({
            content: '',
            components: [row],
            files: [imageAttachment]
        });
        console.log('Image sent to channel');
    } catch (error) {
        console.error('Error sending image to channel:', error);
    }
});


client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand() && !interaction.isButton() && !interaction.isStringSelectMenu()) return;

    try {
        if (interaction.isChatInputCommand()) {
            await executeCommand(interaction);
        } else if (interaction.isButton()) {
            switch (interaction.customId) {
                case 'get-roles':
                    await handleRoleSelection(interaction);
                    break;
                case 'learn-about-bionic':
                    await handleLearnAboutBionic(interaction);
                    break;
                case 'meet-the-team':
                    await handleMeetTheTeam(interaction);
                    break;
                case 'return_to_categories':
                    await handleReturnToCategories(interaction);
                    break;
                case 'notifications_role':
                case 'social_role':
                case 'project_role':
                    await handleRoleAssignment(interaction);
                    break;
				case 'official-links':
					await interaction.reply({ embeds: [officialLinksEmbed()], ephemeral: true});
					break;
				case 'faq':
					await interaction.reply({ embeds: [faqEmbed()], ephemeral: true});
					break;
                default:
                    await handleDynamicButtons(interaction);
                    break;
            }
        } else if (interaction.isStringSelectMenu()) {
            await handleSelectMenu(interaction);
        }
    } catch (error) {
        console.error('Error handling interaction:', error);
        if (!interaction.replied && !interaction.deferred) {
            await interaction.reply({ content: 'An error occurred while processing your request.', ephemeral: true });
        } else {
            await interaction.followUp({ content: 'An error occurred, please try again.', ephemeral: true });
        }
    }
});



async function handleRoleSelection(interaction) {
    const rolesRow = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId('notifications_role')
                .setLabel('🔔 Notifications')
                .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
                .setCustomId('social_role')
                .setLabel('🐦 Social Raid')
                .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
                .setCustomId('project_role')
                .setLabel('🔗 Project Hunter')
                .setStyle(ButtonStyle.Primary)
        );

    const embed = new EmbedBuilder()
	.setColor('#af72ff')
	.setTitle('Role Selection')
	.setDescription('Add or remove roles using the buttons below.')
	.addFields({
		name: ' ',
		value: '<@&1235909361134473327> - Stay up-to-date with the latest news and announcements.'
	}, {
		name: ' ',
		value: '<@&1208756025734336574> - Get notified whenever we post on socials.'
	}, {
		name: ' ',
		value: '<@&1214983147968659518> - Allows you to post links to projects you come across.'
	});

    await interaction.reply({ embeds: [embed], components: [rolesRow], ephemeral: true });
}


async function handleRoleAssignment(interaction) {
    const member = await interaction.guild.members.fetch(interaction.user.id);
    const roleMap = {
        notifications_role: '1235909361134473327', // Role IDs should be the actual IDs of the roles
        social_role: '1208756025734336574',
        project_role: '1214983147968659518'
    };

    const roleId = roleMap[interaction.customId];
    const role = interaction.guild.roles.cache.get(roleId); // Fetch the role object using its ID
    const hasRole = member.roles.cache.has(roleId);

    const embed = new EmbedBuilder()
        .setTitle('Role Update')
        .setDescription(`**${role ? role.toString() : 'Role'}** has been ${hasRole ? 'removed' : 'added'}.`)
        .setColor(hasRole ? '#FF5555' : '#55FF55'); // Red for removal, green for addition

    if (hasRole) {
        await member.roles.remove(roleId);
        embed.setFooter({ text: 'Role removed successfully.' });
    } else {
        await member.roles.add(roleId);
        embed.setFooter({ text: 'Role added successfully.' });
    }

    await interaction.reply({ embeds: [embed], ephemeral: true });
}


async function handleLearnAboutBionic(interaction) {
    const row = new ActionRowBuilder()
        .addComponents(
            new StringSelectMenuBuilder()
                .setCustomId('faq-select')
                .setPlaceholder('Select a section to learn more')
                .addOptions([
                    { label: '📜 About Bionic', description: 'Start your Bionic journey and learn what we\'re all about', value: 'about_bionic' },
					{ label: '👁️ Our Vision', description: 'Why we exist and what we\'re here to change', value: 'test1' },
					{ label: '📈 The Bionic Platform', description: 'The gamechanging data-rich investment hub', value: 'test2' },
					{ label: '👩‍🚀 ZERØ', description: 'Our AI concierge, here to guide you through your investment journey', value: 'test3' },
					{ label: '👽 Another Category', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ', value: 'test4' },
					{ label: '⭐ A great USP', description: 'Donec vitae sem at dolor bibendum sagittis.', value: 'test5' },
					{ label: '🌍 A final category', description: 'Integer enim lectus, sollicitudin ut convallis et, tristique non justo.', value: 'test6' },
                ])
        );

	const embed = new EmbedBuilder()
		.setTitle('About Bionic')
		.setDescription('Welcome to Bionic!\n\nBionic is a new Investment DAO that is set to connect the best Web3 founders with the savviest investors and supercharge the best and brightest ideas on the planet.\n\nBionic is not like any other investment platform. It is the place where new ideas are sparked into life, driven by collaboration and knowledge-sharing.\n\nFounded by established Web3 leaders and shaped by a world-class advisory board, Bionic is set to change the way that innovative ideas are fostered and delivered.')
		.setColor('#af72ff');

    await interaction.reply({
        content: 'Choose a section to learn more about Bionic:',
		embeds: [embed],
        components: [row],
        ephemeral: true
    });
}

async function loadProfiles() {
    try {
        // Construct the correct paths based on your directory structure
        const bionicTeamPath = path.join(__dirname, './embeds/team/bionic_team.json');
        const advisorsDealFlowPath = path.join(__dirname, './embeds/team/advisors_deal_flow.json');
        const advisorsStrategicPath = path.join(__dirname, './embeds/team/advisors_strategic.json');

        console.log("Loading profiles from:", bionicTeamPath, advisorsDealFlowPath, advisorsStrategicPath);

        // Read and parse JSON files
        const bionicTeam = JSON.parse(fs.readFileSync(bionicTeamPath, 'utf8'));
        const advisorsDealFlow = JSON.parse(fs.readFileSync(advisorsDealFlowPath, 'utf8'));
        const advisorsStrategic = JSON.parse(fs.readFileSync(advisorsStrategicPath, 'utf8'));

        console.log("Profiles successfully loaded from all paths.");
        console.log("Bionic Team Profiles:", bionicTeam);
        console.log("Advisors Deal Flow Profiles:", advisorsDealFlow);
        console.log("Advisors Strategic Profiles:", advisorsStrategic);

        return {
            bionic_team: bionicTeam,
            advisors_deal_flow: advisorsDealFlow,
            advisors_strategic: advisorsStrategic
        };
    } catch (error) {
        console.error("Failed to load or parse team profiles:", error);
        throw error; // Rethrow or handle as necessary
    }
}


let teamProfiles;

async function handleMeetTheTeam(interaction) {
    console.log("Handling 'Meet The Team' interaction.");
    const teamCategoryRow = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder().setCustomId('bionic_team_0').setLabel('💊 Bionic Team').setStyle(ButtonStyle.Primary),
            new ButtonBuilder().setCustomId('advisors_deal_flow_0').setLabel('🤝 Advisors (Deal-Flow)').setStyle(ButtonStyle.Primary),
            new ButtonBuilder().setCustomId('advisors_strategic_0').setLabel('💭 Advisors (Strategic)').setStyle(ButtonStyle.Primary)
        );

    console.log("Sending team category buttons to the user.");
    await interaction.reply({
        components: [teamCategoryRow],
        ephemeral: true
    });
}

async function handleDynamicButtons(interaction) {
    const customId = interaction.customId;
    console.log(`Button pressed: ${customId}`);

    // Splitting the customId to parse the category and possibly the action and index
    const parts = customId.split('_');
    const lastIndex = parts.length - 1;
    const index = parseInt(parts[lastIndex]); // Assume the last part is always an index
    let action = null;
    let category = parts.slice(0, lastIndex).join('_');

    // Check if the second last part is an action or part of the category
    if (parts[lastIndex - 1] === 'next' || parts[lastIndex - 1] === 'prev') {
        action = parts[lastIndex - 1];
        category = parts.slice(0, lastIndex - 1).join('_'); // Adjust category if an action is present
    }

    console.log(`Resolved category: ${category}, Action: ${action}, Index: ${index}`);

    if (isNaN(index)) {
        console.error('Invalid index from button:', customId);
        await interaction.reply({ content: "Invalid profile index.", ephemeral: true });
        return;
    }

    if (action) {
        // If there's a valid action, handle navigation
        await handleTeamNavigation(interaction, category, action, index);
    } else {
        // No action means this is an initial view of the profile at a given index
        await showTeamProfile(interaction, category, index);
    }
}


async function handleTeamNavigation(interaction, category, action, index) {
    console.log(`Handling team navigation for category: ${category} with action: ${action} at index: ${index}`);
    const profiles = teamProfiles[category];

    if (!profiles || profiles.length === 0) {
        console.log(`No profiles found for category: ${category}`);
        await interaction.reply({ content: "No profiles available for this category.", ephemeral: true });
        return;
    }

    // Calculate new index based on the action
    let newIndex = index;
    if (action === 'next' && index < profiles.length - 1) {
        newIndex++;
    } else if (action === 'prev' && index > 0) {
        newIndex--;
    }

    console.log(`New index after navigation: ${newIndex}`);
    if (newIndex === index) {
        console.log(`No more profiles to navigate in the direction of: ${action}`);
        await interaction.reply({ content: "No more profiles in this direction.", ephemeral: true });
        return;
    }

    // Show profile at the new index
    await showTeamProfile(interaction, category, newIndex);
}

async function showTeamProfile(interaction, category, index) {
    if (!teamProfiles || !teamProfiles[category] || index < 0 || index >= teamProfiles[category].length) {
        console.error(`Index out of bounds: ${index} for category: ${category}`);
        await interaction.reply({ content: "No profiles available in this direction.", ephemeral: true });
        return;
    }

    const profile = teamProfiles[category][index];
    const embed = new EmbedBuilder()
        .setTitle(profile.name)
        .setDescription(`${profile.role}\n\n${profile.bio}`)
        .setThumbnail(profile.image)
        .setColor('#af72ff');

    const socialMediaComponents = new ActionRowBuilder();
    if (profile.twitter) {
        socialMediaComponents.addComponents(
            new ButtonBuilder()
                .setLabel('🐦 Twitter')
                .setStyle(ButtonStyle.Link)
                .setURL(profile.twitter)
        );
    }
    if (profile.linkedin) {
        socialMediaComponents.addComponents(
            new ButtonBuilder()
                .setLabel('🔗 LinkedIn')
                .setStyle(ButtonStyle.Link)
                .setURL(profile.linkedin)
        );
    }

    const navigationComponents = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId(`${category}_prev_${index}`)
                .setLabel('Previous')
                .setStyle(ButtonStyle.Primary)
                .setDisabled(index === 0),
            new ButtonBuilder()
                .setCustomId('return_to_categories')
                .setLabel('Back to Categories')
                .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
                .setCustomId(`${category}_next_${index}`)
                .setLabel('Next')
                .setStyle(ButtonStyle.Primary)
                .setDisabled(index === teamProfiles[category].length - 1)
        );

    // Add the social media row only if it contains any components
    const components = [];
    if (socialMediaComponents.components.length > 0) {
        components.push(socialMediaComponents);
    }
    components.push(navigationComponents);

    await interaction.update({ embeds: [embed], components: components, ephemeral: true });
}

async function handleReturnToCategories(interaction) {
    // Define the team category buttons again to display
    const teamCategoryRow = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder().setCustomId('bionic_team_0').setLabel('Bionic Team').setStyle(ButtonStyle.Primary),
            new ButtonBuilder().setCustomId('advisors_deal_flow_0').setLabel('Advisors (Deal-Flow)').setStyle(ButtonStyle.Primary),
            new ButtonBuilder().setCustomId('advisors_strategic_0').setLabel('Advisors (Strategic)').setStyle(ButtonStyle.Primary)
        );

    // Clear the previous message content, embeds, and show only category buttons
    await interaction.update({
        content: 'Select a team category:',
        embeds: [], // Clears any previous embeds
        components: [teamCategoryRow],
        ephemeral: true
    });
}


async function handleSelectMenu(interaction) {
    const selectedValue = interaction.values[0];
    let embed;
    switch (selectedValue) {
        case 'about_bionic':
            embed = aboutBionicEmbed();
            break;
		case 'test1':
			embed = new EmbedBuilder().setTitle('👁️ Our Vision').setDescription('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae sem at dolor bibendum sagittis. Integer enim lectus, sollicitudin ut convallis et, tristique non justo. Donec nec leo id justo rhoncus accumsan. Pellentesque aliquet eleifend dapibus. Ut luctus nulla ac libero blandit tempus. Proin eu elit ipsum. In ornare et nisl et volutpat. Phasellus laoreet lacus magna, a tempus tellus semper eu. Vestibulum iaculis, quam vitae tristique volutpat, augue orci tincidunt odio, sit amet feugiat tortor lorem sed quam. Integer semper mauris et orci pretium ornare. \n \n Praesent id augue et dui facilisis venenatis. Sed velit dui, suscipit id tellus sit amet, volutpat fermentum nulla. Pellentesque iaculis lorem at blandit maximus. Curabitur luctus fringilla turpis, ut pulvinar nisi fermentum dignissim. Donec sodales nisl ac sapien vestibulum, ut imperdiet ipsum pulvinar. Nunc metus felis, tristique at sodales vitae, aliquam porttitor enim. Vestibulum molestie, diam a mollis sodales, purus nibh luctus odio, vitae efficitur sapien sem in magna. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.').setColor('#af72ff');
    }
    await interaction.update({
        embeds: [embed]
    });
}




client.on('messageCreate', async message => {
	if (!message.author.bot) {
		//analyticsService.logMessage(message);
		//analyticsService.logReply(message);

		// Basic XP for sending a message
		xpService.addXP(message.author.id, 10, message.member);

		// Check if this is a reply to a message
		if (message.reference && message.reference.messageId) {
			try {
				const referencedMessage = await message.channel.messages.fetch(message.reference.messageId);
				const referencedMember = referencedMessage.member;

				const bionicTeamRoleId = '1151898649824071691';
				const bionicDaoRoleId = '1209796268545806396';
				const projectTeamRoleId = '1209139700288331798';

				// Check for specific roles like Bionic team or project teams in the replied message
				const isBionicTeamReply = referencedMember.roles.cache.has(bionicTeamRoleId);
				const isProjectTeamReply = referencedMember.roles.cache.has(projectTeamRoleId);
				const isBionicDaoReply = referencedMember.roles.cache.has(bionicDaoRoleId);

				// Additional XP for replying to specific roles
				if (isBionicTeamReply || isProjectTeamReply || isBionicDaoReply) {
					xpService.addXP(message.author.id, 10, message.member);
				}
			} catch (error) {
				console.error('Failed to fetch referenced message:', error);
			}
		}
	}

	if (!message.author.bot) {
		const args = message.content.split(/\s+/); // Split message content into words by whitespace
		const command = args.shift().toLowerCase(); // Extract the command and convert to lower case
		const adminRoleId = '1208372802814476308';
		const member = message.member;
		// Check if the member has the admin role
		const isAdmin = member.roles.cache.has(adminRoleId);
		if (isAdmin) {
			switch (command) {
				case '!givexp':
					if (args.length >= 2) {
						const userId = args[0].replace(/\D/g, ''); // Extract numeric ID from mention
						const amount = parseInt(args[1], 10);
						if (!isNaN(amount)) {
							// Pass true for the ignoreLimit parameter to bypass the XP limit
							xpService.addXP(userId, amount, null, true);
							message.channel.send(`Given ${amount} XP to user <@${userId}>.`);
						}
					}
					break;

				case '!takexp':
					if (args.length >= 2) {
						const userId = args[0].replace(/\D/g, ''); // Extract numeric ID from mention
						const amount = parseInt(args[1], 10);
						if (!isNaN(amount)) {
							xpService.removeXP(userId, amount);
							message.channel.send(`Taken ${amount} XP from user <@${userId}>.`);
						}
					}
					break;

				case '!checkxp':
					if (args.length >= 1) {
						const userId = args[0].replace(/\D/g, ''); // Extract numeric ID from mention
						const userData = xpService.getUserXPData(userId);
						message.channel.send(`<@${userId}> has ${userData.xp} XP.`);
					}
					break;

				case '!topusers':
					const topUsers = xpService.getTopUsers();
					const itemsPerPage = 10; // Number of users to show per page
					const pages = Math.ceil(topUsers.length / itemsPerPage);
					let currentPage = 0;

					const generateEmbed = page => {
						const start = page * itemsPerPage;
						const end = start + itemsPerPage;
						const currentTopUsers = topUsers.slice(start, end);

						const embed = new EmbedBuilder()
							.setTitle(`Top Users by XP - Page ${page + 1} of ${pages}`)
							.setDescription(currentTopUsers.map((user, index) => `${start + index + 1}. ${user.nickname || `(Unknown ID: ${user.id})`} - ${user.xp} XP`).join('\n'))
							.setColor('#af72ff');

						return embed;
					};

					const buttons = new ActionRowBuilder()
						.addComponents(
							new ButtonBuilder()
							.setCustomId('previous_btn')
							.setLabel('Previous')
							.setStyle(ButtonStyle.Primary)
							.setDisabled(currentPage === 0),
							new ButtonBuilder()
							.setCustomId('next_btn')
							.setLabel('Next')
							.setStyle(ButtonStyle.Primary)
							.setDisabled(currentPage === pages - 1)
						);

					const messagePayload = {
						embeds: [generateEmbed(0)],
						components: [buttons]
					};

					const botMessage = await message.channel.send(messagePayload);

					// Collector for button interaction
					const filter = i => ['previous_btn', 'next_btn'].includes(i.customId) && i.user.id === message.author.id;
					const collector = botMessage.createMessageComponentCollector({
						filter,
						time: 60000
					}); // 60 sec timeout

					collector.on('collect', async i => {
						if (i.customId === 'next_btn' && currentPage < pages - 1) {
							currentPage++;
						} else if (i.customId === 'previous_btn' && currentPage > 0) {
							currentPage--;
						}

						await i.update({
							embeds: [generateEmbed(currentPage)],
							components: [
								new ActionRowBuilder()
								.addComponents(
									new ButtonBuilder()
									.setCustomId('previous_btn')
									.setLabel('Previous')
									.setStyle(ButtonStyle.Primary)
									.setDisabled(currentPage === 0),
									new ButtonBuilder()
									.setCustomId('next_btn')
									.setLabel('Next')
									.setStyle(ButtonStyle.Primary)
									.setDisabled(currentPage === pages - 1)
								)
							]
						});
					});

					collector.on('end', () => {
						botMessage.edit({
							components: []
						}); // Disable buttons after the collector ends
					});
					break;

				case '!admincommands':
					try {
						let commandEmbed = new EmbedBuilder()
							.setTitle('Admin Commands')
							.setDescription('List of admin commands:')
							.addFields({
								name: '!givexp @user <amount>',
								value: 'Give XP to a user.'
							}, {
								name: '!takexp @user <amount>',
								value: 'Take XP from a user.'
							}, {
								name: '!checkxp @user',
								value: 'Check XP of a user.'
							}, {
								name: '!topusers',
								value: 'Get the top users by XP.'
							}, )
							.setColor('#af72ff');
						message.channel.send({
							embeds: [commandEmbed]
						});
					} catch (error) {
						console.error('Failed to send admin commands:', error);
					}
					break;
			}
		}
	}
});

client.on('messageReactionAdd', async (reaction, user) => {
	analyticsService.logReaction(reaction, user);
	if (user.bot) return; // Ignore bots

	// Fetch the full user member object to check for server booster status
	const guild = reaction.message.guild;
	const member = await guild.members.fetch(user.id);
	xpService.addXP(user.id, 5, member);
});

// Example for voice state update to track users in voice chat
client.on('voiceStateUpdate', (oldState, newState) => {
	// Logic to handle voice state updates
	// Award XP based on time spent in voice chat
});

client.on('guildMemberAdd', member => {
	analyticsService.logNewMember(member);
});

client.on('guildMemberRemove', member => {
	analyticsService.logMemberLeft(member);
});

client.login(process.env.DISCORD_BOT_TOKEN);