const Discord = require('discord.js');
const { prefix, token, giphyapi } = require('./config.json');
const client = new Discord.Client();

//giphy client
var GphApiClient = require('giphy-js-sdk-core');
const giphy = GphApiClient(giphyapi);

client.once('ready', () => {
  console.log('Ready!');
});

client.on('message', (message) => {
  if (message.member.hasPermission(['KICK_MEMBERS', 'BAN_MEMBERS'])) {
    if (message.content.startsWith(`${prefix}kick`)) {
      // message.channel.send('Kick.');

      let member = message.mentions.members.first();
      member.kick().then((member) => {
        giphy
          .search('gifs', { q: 'fail' })
          .then((response) => {
            let totalResponses = response.data.length;
            let responseIndex =
              Math.floor(Math.random() * 10 + 1) % totalResponses;
            let finalResponse = response.data[responseIndex];

            message.channel.send(
              ':wave: ' + member.displayName + ' has been kicked!',
              {
                files: [finalResponse.images.fixed_height.url],
              }
            );
          })
          .catch(() => {
            message.channel.send('Darn! An error...');
          });
      });
    }
  }
});

client.login(token);
