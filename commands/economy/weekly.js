const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");

module.exports = {
    config: {
        name: "weekly",
        aliases: ["week"],
        category: "economy",
        description: "Gives You 5000 per Day",
        usage: " ",
        accessableby: "everyone"
    },
    run: async (bot, message, args) => {

        let user = message.author;
        let timeout = 604800000;
        let amount = 5000;

        let weekly = await db.fetch(`weekly_${message.guild.id}_${user.id}`);

        if (weekly !== null && timeout - (Date.now() - weekly) > 0) {
            let time = ms(timeout - (Date.now() - weekly));

            let timeEmbed = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`❌ You have already collected your weekly reward\n\nCollect it again in ${time.days}d ${time.hours}h ${time.minutes}m ${time.seconds}s `);
            message.channel.send(timeEmbed)
        } else {
            let moneyEmbed = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`✅ You've collected your weekly reward of ${amount} coins`); 
            message.channel.send(moneyEmbed)
            db.add(`money_${message.guild.id}_${user.id}`, amount)
            db.set(`weekly_${message.guild.id}_${user.id}`, Date.now())


        }
    }
}