const { SlashCommandBuilder } = require('@discordjs/builders'), { EmbedBuilder } = require('discord.js');
const {language} = require('../config.json'), lang = require('../languages/' + language + '.json'), sd = lang.nekoslife.slash_desc.split('-'), de = lang.nekoslife.desc.split('-'), er = lang.nekoslife.error_reply
const wait = require('node:timers/promises').setTimeout;
const nekoslife = require('nekos.life'), neko = new nekoslife();
module.exports = {
    cooldown: 5,
	data: new SlashCommandBuilder()
		.setName('nekoslife')
		.setDescription(sd[0])
        .addSubcommand(subcommand => subcommand
            .setName('wholesome')
            .setDescription(sd[1])
            .addStringOption(option => option.setName("sfw_w")
                .setDescription(de[0])
                .addChoices(
                    { name: "Baka", value: 'baka' },
                    { name: "Cuddle", value: 'cuddle' },
                    { name: "Feed", value: 'feed' },
                    { name: "Fox Girl", value: 'foxGirl' },
                    { name: "Holo", value: 'holo' },
                    { name: "Hug", value: 'hug' },
                    { name: "Kiss", value: 'kiss' },
                    { name: "Meow", value: 'meow' },
                    { name: "Neko", value: 'neko' },
                    { name: "Neko Gif", value: 'nekoGif' },
                    { name: "Pat", value: 'pat' },
                    { name: "Poke", value: 'poke' },
                    { name: "Slap", value: 'slap' },
                    { name: "Smug", value: 'smug' },
                    { name: "Tickle", value: 'tickle' },
                )
                .setRequired(true))
            .addUserOption(option => option.setName('target').setDescription(de[2]))
            .addNumberOption(option => option.setName('repeat').setDescription(lang.amount).setMinValue(1).setMaxValue(10))
        ).addSubcommand(subcommand => subcommand
            .setName('sfw_other')
            .setDescription(sd[2])
            .addStringOption(option => option.setName("sfw_o")
                .setDescription(de[0])
                .addChoices(
                    { name: "8ball", value: 'eightBall' },
                    { name: "Avatar / Profile Pictures", value: 'avatar' },
                    { name: "CatText", value: 'catText' },
                    { name: "Fact", value: 'fact' },
                    { name: "Genetically Engineered CatGirl", value: 'gecg' },
                    { name: "Goose", value: 'goose' },
                    { name: "Kemonomimi", value: 'kemonomini' },
                    { name: "Lizard", value: 'lizard' },
                    { name: "OwOify", value: 'OwOify' },
                    { name: "Spoiler", value: 'spoiler' },
                    { name: "Waifus", value: 'waifu' },
                    { name: "Wallpaper", value: 'wallpaper' },
                    { name: "Why", value: 'why' },
                    { name: "Woof", value: 'woof' },
                )
                .setRequired(true))
            .addStringOption(option => option.setName('text').setDescription(er))
            .addNumberOption(option => option.setName('repeat').setDescription(lang.amount).setMinValue(1).setMaxValue(10))
        ),
	async execute(interaction, client) {
        if (interaction.options.getNumber('repeat')) { var amount = Number(interaction.options.getNumber('repeat')) } else var amount = 1
        for (let a = 0; a < amount; a++) {
            if (interaction.options.getString('sfw_w')) { c = interaction.options.getString('sfw_w')}
            if (interaction.options.getString('sfw_o')) { c = interaction.options.getString('sfw_o')}
            const embed = new EmbedBuilder()
                .setColor('#00FF00')
                .setTitle("OwO, " + c)
                .setTimestamp()
                .setFooter({ text: client.user.tag, iconURL: client.user.displayAvatarURL() })
            if (interaction.options.getString('sfw_w') === 'tickle') {img = await neko.tickle()}
            if (interaction.options.getString('sfw_w') === 'slap') {img = await neko.slap()}
            if (interaction.options.getString('sfw_w') === 'poke') {img = await neko.poke()}
            if (interaction.options.getString('sfw_w') === 'pat') {img = await neko.pat()}
            if (interaction.options.getString('sfw_w') === 'neko') {img = await neko.neko()}
            if (interaction.options.getString('sfw_w') === 'meow') {img = await neko.meow()}
            if (interaction.options.getString('sfw_w') === 'kiss') {img = await neko.kiss()}
            if (interaction.options.getString('sfw_w') === 'hug') {img = await neko.hug()}
            if (interaction.options.getString('sfw_w') === 'foxGirl') {img = await neko.foxGirl()}
            if (interaction.options.getString('sfw_w') === 'feed') {img = await neko.feed()}
            if (interaction.options.getString('sfw_w') === 'cuddle') {img = await neko.cuddle()}
            if (interaction.options.getString('sfw_w') === 'nekoGif') {img = await neko.nekoGif()}
            if (interaction.options.getString('sfw_w') === 'holo') {img = await neko.holo()}
            if (interaction.options.getString('sfw_w') === 'smug') {img = await neko.smug()}
            if (interaction.options.getString('sfw_w') === 'baka') {img = await neko.baka()}
            if (interaction.options.getString('sfw_o') === 'woof') {img = await neko.woof()}
            if (interaction.options.getString('sfw_o') === 'wallpaper') {img = await neko.wallpaper()}
            if (interaction.options.getString('sfw_o') === 'goose') {img = await neko.goose()}
            if (interaction.options.getString('sfw_o') === 'gecg') {img = await neko.gecg()}
            if (interaction.options.getString('sfw_o') === 'avatar') {img = await neko.avatar()}
            if (interaction.options.getString('sfw_o') === 'waifu') {img = await neko.waifu()}
            if (interaction.options.getString('sfw_o') === 'lizard') {img = await neko.lizard()}
            if (interaction.options.getString('sfw_o') === 'kemonomimi') {img = await neko.kemonomimi()}
            if (interaction.options.getString('sfw_o') === 'why') {img = await neko.why(); let text = img.why; embed.setDescription(text); return interaction.reply({embeds: [embed]})}
            if (interaction.options.getString('sfw_o') === 'catText') {img = await neko.catText(); const text = img.cat; embed.setDescription(text); return interaction.reply({embeds: [embed]})}
            if (interaction.options.getString('sfw_o') === 'OwOify') {img = await neko.OwOify({text: interaction.options.getString('text')}); const text = img.owo ; if(interaction.options.getString('text')){ embed.setDescription(text); return interaction.reply({embeds: [embed]}) } else{ return interaction.reply(er)}}
            if (interaction.options.getString('sfw_o') === 'eightBall') {img = await neko.eightBall({text: interaction.options.getString('text')}); const text = img.response ; if(interaction.options.getString('text')){ embed.setDescription("**"+interaction.options.getString('text')+"**\n"+text); return interaction.reply({embeds: [embed]}) } else{ return interaction.reply(er)}}
            if (interaction.options.getString('sfw_o') === 'fact') {img = await neko.fact(); const text = img.fact; embed.setDescription(text); return interaction.reply({embeds: [embed]})}
            if (interaction.options.getString('sfw_o') === 'spoiler') {img = await neko.spoiler({text: interaction.options.getString('text')}); const text = img.owo ; if(interaction.options.getString('text')){ embed.setDescription(text); return interaction.reply({embeds: [embed]}) } else{ return interaction.reply(er)}}
            if (img.msg === '404') {embed.setDescription('**Error: 404**')} else {embed.setImage(img.url)}
            if (interaction.options.getUser('target')) {
                const user = interaction.options.getUser('target'), from = interaction.user
                embed.setDescription(from.toString() + de[3] + " " + interaction.options.getString('sfw_w') + ", " + user.toString() + ". :3")
                try{ await interaction.reply({ content: user.toString(), embeds: [embed]}) }
                catch{
                    await wait(1000)
                    await interaction.followUp({ embeds: [embed]})
                }
            } else {
                try{ await interaction.reply({ embeds: [embed]}) }
                catch{
                    await wait(1000)
                    await interaction.followUp({ embeds: [embed]})
                }
            }
        }
    }
};