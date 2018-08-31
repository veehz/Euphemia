const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const EuphemiaPaginatedMessage = require('../../util/EuphemiaPaginatedMessage.js');
const _ = require('lodash');

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'discriminator',
            group: 'utility',
            memberName: 'discriminator',
            description: 'Lists members with the same discriminator',
            aliases: ['discrim'],
            throttling: {
                usages: 1,
                duration: 15
            },
            guildOnly: true
        });
    }

   async run(message) {
       const match = message.content.match(/\d{4}/);
       const discriminator = match ? match[0] : message.author.discriminator;
       if (message.guild.members.size !== message.guild.memberCount) {
           await message.guild.fetchMembers();
       }
       const members = message.guild.members
            .filter(member => member.user.discriminator === discriminator)
            .map(member => member.user.username)
            .sort();
        const chunks = _.chunk(members, 20);
        return EuphemiaPaginatedMessage(chunks.map(chunk => new RichEmbed()
                    .addField(`Users with discriminator ${discriminator}`, '```' + chunk.join('\n') + '```')
                    .setColor(global.BOT_DEFAULT_COLOR)
        ), message);
        const joined = members.join('\n');
        message.channel.send(new RichEmbed()
            .setColor(global.BOT_DEFAULT_COLOR)
            .addField(`Users with discriminator ${discriminator}`, '```' +
                (joined.length <= 1800 ? (joined + '```') : (joined.substring(0, 1800) + '\n...```')))
        );
    }
};
