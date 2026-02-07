const express = require('express');
const { Client, GatewayIntentBits } = require('discord.js');
const bot = require('./bot');  // bot.js をインポート

const app = express();
const PORT = process.env.PORT || 3000;

// Renderの健康チェック & Uptime対策用のシンプルエンドポイント
app.get('/', (req, res) => {
  res.status(200).send('Bot is alive!');
});

app.listen(PORT, () => {
  console.log(`Web server running on port ${PORT}`);
});

// Botの起動（別ファイルで管理）
bot.start();
