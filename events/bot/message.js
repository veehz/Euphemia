const { RichEmbed } = require('discord.js');

module.exports = message => {
    if (!message.guild && !message.author.bot) {
        message.client.owners.forEach(owner => {
            if (message.author.id !== owner) {
                owner.send(new RichEmbed()
                    .setColor('BLUE')
                    .setTitle('Bot has received a DM')
                    .addField(message.author.tag, message.content || '-')
                );
            }
        });
    }
}