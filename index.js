// index.js

// Response for Uptime Robot and GAS
require('dotenv').config();
const http = require('http');
const querystring = require('querystring');
const { isLocked, createLock, clearLockOnExit } = require('./lock');  // 多重起動防止ロック

// ★ 多重起動を防止する処理
if (isLocked()) {
    console.log('⚠ Botはすでに起動しています。重複起動を防ぐため終了します。');
    process.exit(0);
}
createLock();
clearLockOnExit();

// ★ PORT は Render が自動的に指定する環境変数に対応
const PORT = process.env.PORT || 3000;

// Webサーバー（GASやUptimeRobot用）
http.createServer(function (req, res) {
    if (req.method === 'POST') {
        let data = "";
        req.on('data', function (chunk) {
            data += chunk;
        });
        req.on('end', function () {
            if (!data) {
                res.end("No post data");
                return;
            }
            const dataObject = querystring.parse(data);
            if (dataObject.type === "wake") {
                res.end("Woke up via POST");
                return;
            }
            res.end("POST received");
        });
    } else if (req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Discord Bot is active now\n');
    }
}).listen(PORT, () => {
    console.log(`✅ HTTPサーバー起動中：ポート ${PORT}`);
});

// Botトークンが設定されていなければ終了
if (!process.env.DISCORD_BOT_TOKEN) {
    console.error('❌ DISCORD_BOT_TOKEN が設定されていません！');
    process.exit(1);
}

// Botの本体起動
require('./bot.js');
