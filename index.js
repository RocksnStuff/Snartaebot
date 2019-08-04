const discord = require('discord.js');
const token = require('../key.js');

const client = new discord.Client();

client.login(token);

client.on('presenceUpdate', function(o, newMember) {
	if (!isNaN(newMember.voiceChannelID)) {
		if (newMember.presence.game !== null) {
			newMember.setVoiceChannel(getVoiceChannel(newMember, newMember.presence.game.name));
		} else {
			newMember.setVoiceChannel(getVoiceChannel(newMember, 'General'));
		}
	}
});

function getVoiceChannel(guildMember, name) {
	let channels = guildMember.guild.channels;
	
	let voiceChs = channels.filter(val => val.type === 'voice');
	
	if (voiceChs.find(val => val.name === name) !== null) {
		return voiceChs.find(val => val.name === name);
	} else {
		return guildMember.voiceChannel;
	}
}