const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent  // メッセージ内容を読むのに必要（v14以降必須）
  ]
});

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  console.log('Bot is online and ready.');
});

client.on('messageCreate', message => {
  // 自分自身のメッセージは無視
  if (message.author.bot) return;

  // シンプルなテストコマンド
  if (message.content === '!ping') {
    message.reply('Pong!');
  }

  // 追加のコマンドはここに書いていけます
});

function start() {
  const token = process.env.DISCORD_BOT_TOKEN;
  if (!token) {
    console.error('DISCORD_BOT_TOKEN が設定されていません！');
    process.exit(1);
  }
  client.login(token);
}

module.exports = { start };
