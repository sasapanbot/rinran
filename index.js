// index.js

// Render本番では dotenv 不要だが、ローカル用に条件付きで読み込む
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const http = require('http');
const querystring = require('querystring');

// ===== Render Web Service 用 HTTP サーバ =====
const PORT = process.env.PORT || 3000;

http.createServer((req, res) => {
  if (req.method === 'POST') {
    let data = '';
    req.on('data', chunk => {
      data += chunk;
    });
    req.on('end', () => {
      if (!data) {
        res.end('No post data');
        return;
      }

      const dataObject = querystring.parse(data);
      if (dataObject.type === 'wake') {
        res.end('Woke up via POST');
        return;
      }

      res.end('POST received');
    });
  } else {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Discord Bot is alive\n');
  }
}).listen(PORT, () => {
  console.log(`✅ HTTPサーバー起動中：ポート ${PORT}`);
});

// ===== Discord Bot 起動 =====

// 環境変数チェック
if (!process.env.DISCORD_BOT_TOKEN) {
  console.error('❌ DISCORD_BOT_TOKEN が設定されていません');
  process.exit(1);
}

// エラーを必ずログに出す（Render重要）
process.on('unhandledRejection', console.error);
process.on('uncaughtException', console.error);

// Bot本体読み込み
require('./bot.js');

console.log('🚀 Bot 起動処理完了');
