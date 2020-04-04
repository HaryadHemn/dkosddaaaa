module.exports = {
    config: {
        name: 'skip',
        description: 'Skip command.',
        category: "music",
        aliases: ["s"],
        usage: " ",
        accessableby: "everyone"
    },
    run: async (bot, message, args, ops) => {
        const { channel } = message.member.voice;
        if (!channel) return message.channel.send('I\'m sorry but you need to be in a voice channel to play music!');
        const serverQueue = ops.queue.get(message.guild.id);
        if (!serverQueue) return message.channel.send('❌ **Nothing playing in this server**');
        serverQueue.connection.dispatcher.end();
        return message.channel.send('⏩ Skipped')
    }
};