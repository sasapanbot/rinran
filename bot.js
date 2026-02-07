// bot.js（Render 安定版）

const {
  Client,
  GatewayIntentBits,
  ActivityType
} = require('discord.js');

// ===== Client 作成（最小・安全）=====
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// ===== エラーを必ずログに出す =====
process.on('unhandledRejection', console.error);
process.on('uncaughtException', console.error);

console.log('🟢 bot.js 読み込み開始');

// ===== ready =====
client.once('ready', () => {
  console.log(`✅ Logged in as ${client.user.tag}`);

  client.user.setActivity('!ヘルプ｜L2M', {
    type: ActivityType.Playing
  });
});

// ===== メッセージ受信（テスト用）=====
client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  if (message.content === '!ping') {
    await message.channel.send('pong!');
  }
});

// ===== Discord login =====
console.log('🟡 Discord login 開始');

client.login(process.env.DISCORD_BOT_TOKEN)
  .then(() => console.log('🟢 Discord login 成功'))
  .catch(err => console.error('🔴 Discord login 失敗', err));
