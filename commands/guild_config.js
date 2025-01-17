const { SlashCommandBuilder } = require('@discordjs/builders');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionsBitField } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;
module.exports = {
    guildOnly: true,
    permissions: PermissionsBitField.Flags.Administrator,
	data: new SlashCommandBuilder()
        .setName('guild_config')
        .setDescription('Configure the bot for your server. Only give one at a time. (No option gives current config)')
        .addSubcommand(subcommand => subcommand.setName('text').setDescription('Configure text settings and also display current settings.')
            .addStringOption(option => option.setName('welcome_message').setDescription('What the welcome message should be.'))
            .addChannelOption(option => option.setName('moderation_channel').setDescription('Change mod channel.'))
            .addRoleOption(option => option.setName('welcome_roles').setDescription('What role for new members.(If empty, no role)'))
            .addRoleOption(option => option.setName('welcome_roles_remove').setDescription('You want to remove the welcome role.'))
            .addRoleOption(option => option.setName('add_role').setDescription('What optional rola can people choose from.'))
            .addRoleOption(option => option.setName('remove_role').setDescription('What optional role can people remove.'))
        )
        .addSubcommand(subcommand => subcommand.setName('button').setDescription('Configure button settings.'))
        .addSubcommand(subcommand => subcommand.setName('emit_event').setDescription('For testing purposes.')
            .addStringOption(option => option.setName('event').setDescription('Event to emit.').setRequired(true))
            .addStringOption(option => option.setName('data').setDescription('If more data needed'))
        ),
    async execute(interaction, client, config) {
        try {
            if (interaction.options.getSubcommand() === 'text') {
                if(interaction.options.getString('welcome_message')) {
                    client.settings.set(interaction.guild.id, interaction.options.getString('welcome_message'), "welcomeMessage");
                    return interaction.reply(`Guild configuration item "welcomeMessage" has been changed to: \`${interaction.options.getString('welcome_message')}\``);
                } else if(interaction.options.getChannel('moderation_channel')) {
                    client.settings.set(interaction.guild.id, interaction.options.getChannel('moderation_channel').id, "moderationChannel");
                    return interaction.reply(`Guild configuration item "moderationChannel" has been changed to: \`${interaction.options.getChannel('moderation_channel')}\``);
                } else if(interaction.options.getRole('welcome_roles')) {
                    let ro = client.settings.get(interaction.guild.id, "welcomeRoles");
                    if (Array.isArray(ro)) { } else { ro = [""] }
                    ar = interaction.options.getRole('welcome_roles'); 
                    if (ro.includes(ar.name)) { return interaction.reply(`Role \`${ar.name}\` is already in the list.`) }
                    ro.push(ar.name);
                    if (ro.includes("")) { ro.splice(ro.indexOf(""), 1) }
                    client.settings.set(interaction.guild.id, ro, "welcomeRoles");
                    return interaction.reply(`Guild configuration item "welcomeRoles" has been added: \`${ar.name}\``);
                } else if(interaction.options.getRole('welcome_roles_remove')) {
                    let ro = client.settings.get(interaction.guild.id, "welcomeRoles");
                    if (Array.isArray(ro)) { } else { return interaction.reply(`Guild configuration item "welcomeRoles" has not been set.`) }
                    a = interaction.options.getRole('welcome_roles_remove')
                    if (ro.includes(a.name)) { } else { return interaction.reply(`Guild role was not found.`) }
                    client.settings.remove(interaction.guild.id, a.name, "welcomeRoles");
                    return interaction.reply(`Guild configuration item "welcomeRoles" has been removed: \`${a.name}\``);
                } else if(interaction.options.getRole('add_role')) {
                    let ro = client.settings.get(interaction.guild.id, "freeRoles");
                    if (Array.isArray(ro)) { } else { ro = ["test"] }
                    ar = interaction.options.getRole('add_role'); 
                    if (ro.includes(ar.name)) { return interaction.reply(`Role \`${ar.name}\` is already in the list.`) }
                    ro.push(ar.name);
                    if (ro.includes("test")) { ro.splice(ro.indexOf("test"), 1) };
                    if (ro.includes("")) { ro.splice(ro.indexOf(""), 1) }
                    client.settings.set(interaction.guild.id, ro, "freeRoles");
                    return interaction.reply(`Guild configuration item "freeRoles" has been added: \`${ar.name}\``);
                } else if(interaction.options.getRole('remove_role')) {
                    let ro = client.settings.get(interaction.guild.id, "freeRoles");
                    if (Array.isArray(ro)) { } else { return interaction.reply(`Guild configuration item "freeRoles" has not been set.`) }
                    a = interaction.options.getRole('remove_role')
                    if (ro.includes(a.name)) { } else { return interaction.reply(`Guild role was not found.`) }
                    client.settings.remove(interaction.guild.id, a.name, "freeRoles");
                    return interaction.reply(`Guild configuration item "freeRoles" has been removed: \`${a.name}\``);
                }
                else {
                    const guildConf = client.settings.get(interaction.guild.id);
                    let configProps = Object.keys(guildConf).map(prop => { return `${prop}  :  ${guildConf[prop]}` });
                    return interaction.reply(`The following are the server's current configuration:\n\`\`\`${configProps.join("\n")}\`\`\``);
                }
            }
            if (interaction.options.getSubcommand() === 'button') {
                await interaction.deferReply(`Loading...`);
                const filter = i => i.user.id === interaction.user.id
                const collector = interaction.channel.createMessageComponentCollector({filter, time: 30000 });
                async function setting(interaction, client) {
                    if (client.settings.get(interaction.guild.id, "welcome")===true) {welc=ButtonStyle.Success} else {welc=ButtonStyle.Danger}
                    if (client.settings.get(interaction.guild.id, "goodbye")===true) {goodbye=ButtonStyle.Success} else {goodbye=ButtonStyle.Danger}
                    if (client.settings.get(interaction.guild.id, "welcomeUserCheck")===true) {wUC=ButtonStyle.Success} else {wUC=ButtonStyle.Danger}
                    if (client.settings.get(interaction.guild.id, "enableNSFW")===true) {nsfw=ButtonStyle.Success} else {nsfw=ButtonStyle.Danger}
                    if (client.settings.get(interaction.guild.id, "messageLogs")===true) {msgUD=ButtonStyle.Success} else {msgUD=ButtonStyle.Danger}
                    if (client.settings.get(interaction.guild.id, "invitesLogs")===true) {inv=ButtonStyle.Success} else {inv=ButtonStyle.Danger}
                    if (client.settings.get(interaction.guild.id, "schedulesLogs")===true) {sch=ButtonStyle.Success} else {sch=ButtonStyle.Danger}
                    if (client.settings.get(interaction.guild.id, "banKickLogs")===true) {banK=ButtonStyle.Success} else {banK=ButtonStyle.Danger}
                    if (client.settings.get(interaction.guild.id, "memberUpdateLogs")===true) {mul=ButtonStyle.Success} else {mul=ButtonStyle.Danger}
                    test = new ActionRowBuilder().addComponents( 
                        new ButtonBuilder().setCustomId('welcome').setLabel('Welcome message').setStyle(welc),
                        new ButtonBuilder().setCustomId('goodbye').setLabel('Goodbye message').setStyle(goodbye),
                        new ButtonBuilder().setCustomId('enableNSFW').setLabel('NSFW').setStyle(nsfw),
                        new ButtonBuilder().setCustomId('welcomeUserCheck').setLabel('Welcome user check').setStyle(wUC),
                    )
                    test2 = new ActionRowBuilder().addComponents(
                        new ButtonBuilder().setCustomId('messageLogs').setLabel('Message updates').setStyle(msgUD),
                        new ButtonBuilder().setCustomId('invitesLogs').setLabel('Invites').setStyle(inv),
                        new ButtonBuilder().setCustomId('schedulesLogs').setLabel('Schedules').setStyle(sch),
                        new ButtonBuilder().setCustomId('banKickLogs').setLabel('Ban/Kick').setStyle(banK),
                        new ButtonBuilder().setCustomId('memberUpdateLogs').setLabel('Member updates').setStyle(mul),
                    )
                    const del = new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('delete').setLabel('Delete message').setStyle(ButtonStyle.Danger))
                    interaction.editReply({content: "Buttons to turn features on and off \n*2nd row for message and other logging for checking*",components: [test, test2, del]})
                }
                setting(interaction, client);
                collector.on('collect', async button => {
                    if (button.customId === 'delete') {interaction.deleteReply(); collector.stop(); return}
                    if (client.settings.get(interaction.guild.id, button.customId)===true) { client.settings.set(interaction.guild.id, false, button.customId)
                    } else { client.settings.set(interaction.guild.id, true, button.customId)}
                    await button.update({components: interaction.components})
                    setting(interaction, client);
                });
                //collector.on('end' , collected => console.log(`Collected ${collected.size} items`) )
            }
            if (interaction.options.getSubcommand() === 'emit_event') {
                const event = interaction.options.getString('event'); 
                //console.log(interaction);               
                try {
                    switch (event) {
                        //case "emojiCreate": { client.emit('emojiCreate', interaction.member.guild.emoji); interaction.reply(`Event \`${event}\` has been emitted.`); break}
                        //case "emojiDelete": { client.emit('emojiDelete', interaction.member.guild.emoji); interaction.reply(`Event \`${event}\` has been emitted.`); break}
                        case "guildBanAdd": { client.emit('guildBanAdd', interaction.member); interaction.reply(`Event \`${event}\` has been emitted.`); break}
                        case "guildBanRemove": { client.emit('guildBanRemove', interaction.member); interaction.reply(`Event \`${event}\` has been emitted.`); break}
                        case "guildCreate": { client.emit('guildCreate', interaction.guild); interaction.reply(`Event \`${event}\` has been emitted.`); break}
                        case "guildDelete": { client.emit('guildDelete', interaction.guild); interaction.reply(`Event \`${event}\` has been emitted.`); break}
                        case "guildMemberAdd": { client.emit('guildMemberAdd', interaction.member); interaction.reply(`Event \`${event}\` has been emitted.`); break}
                        case "guildMemberRemove": { client.emit('guildMemberRemove', interaction.member); interaction.reply(`Event \`${event}\` has been emitted.`); break}
                        case "guildMemberUpdate": { client.emit('guildMemberUpdate', interaction.member, interaction.member); interaction.reply(`Event \`${event}\` has been emitted.`); break}
                    }
                } catch (err) {
                    console.log(err);
                    return interaction.reply(`This is only for development, do not use!!! \nEvent \`${event}\` has failed to emit. \nHere are the events: https://discord.js.org/#/docs/discord.js/stable/class/Client`);
                }
            }
        }catch(error) {
            console.log(error)
        }
    }
}