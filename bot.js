// bot.js（診断用）

const { Client, GatewayIntentBits } = require('discord.js');

const token = process.env.DISCORD_BOT_TOKEN;

console.log('🧪 TOKEN length:', token ? token.length : 'undefined');

if (!token || token.length < 50) {
  console.error('❌ トークンが不正です');
  process.exit(1);
}

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

process.on('unhandledRejection', console.error);
process.on('uncaughtException', console.error);

client.once('ready', () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

console.log('🟡 Discord login 開始');

client.login(token)
  .then(() => console.log('🟢 Discord login 成功'))
  .catch(err => console.error('🔴 Discord login 失敗', err));

// 15秒たっても ready が来なければ異常
setTimeout(() => {
  console.error('⏱ ready イベントが来ません（Discord 側問題）');
}, 15000);
