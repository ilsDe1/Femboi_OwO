const config = require('../config.json'), { MessageEmbed } = require('discord.js'), fs = require('fs'), lang = require('../languages/' + config.language + '.json');
module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
        const channel = client.channels.cache.get(config.bot_status_channelId);
        let con = lang.ready.console_log.split('-')
        let emb = lang.ready.embed.split('-')
        client.user.setActivity(lang.ready.set_activity)
        console.log(client)
        //client.on("error", (e) => console.error(e))
        //client.on("warn", (e) => console.warn(e))
        //client.on("debug", (e) => console.info(e))
        const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
        const languageFiles = fs.readdirSync('./languages').filter(file => file.endsWith('.json'));
        console.log(eventFiles)
        console.log(languageFiles)
        const Guilds = client.guilds.cache.map(guild => guild.name);
		console.log(`\n --` + con[0] + client.user.tag
            + `\n\t --` + con[1] + config.language
            + `\n\t --` + con[2] + config.clientId
            + `\n\t --` + con[3] + config.stopPassword
            + `\n\t --` + con[4] + client.readyAt
            + `\n\t --` + con[5]+" "+ Guilds)
        channel.bulkDelete(1, true).catch(error => {console.error(error)})
        const embed = new MessageEmbed()
            .setColor('#00FF00')
            .setTitle(emb[0])
            .setDescription(emb[1] + ` \n<t:${Math.floor(client.readyTimestamp / 1000)}:f> \n${emb[2]} <t:${Math.floor(client.readyTimestamp / 1000)}:R>`);
        channel.send({embeds: [embed]})
	}
}