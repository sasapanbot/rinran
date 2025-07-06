const { Client, GatewayIntentBits, Partials, ActivityType } = require('discord.js');
const fetch = require('node-fetch'); // node-fetch@2 を使用
const emoji = require('node-emoji');
require('dotenv').config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.DirectMessageTyping,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.MessageContent // メッセージ内容の取得に必要
    ],
    partials: [
        Partials.Message,
        Partials.Channel,
        Partials.Reaction
    ]
});

const CH_INOUT = "847051605198766100";    // 入退出Ch   

const GLD_HOA = "823862101021556776";    // HOALOHA部屋
const GLD_SASA = "846319928495570944";    // ささぱーし部屋 
const GLD_TEST = "842176515185180722";    // テスト部屋

const CH_TEST = "842176515185180724";    // テストCh dorothea
const CH_JIGU4_BOSS = "921044856074301440";    // 4鯖赤ドロCh
const CH_JIGU4_CHAOS = "939048230967189544";    // 4鯖傲慢&狂気Ch
const CH_JIGU6_BOSS = "889540213104332811";    // 6鯖赤ドロ（ささぱーし）Ch
const CH_SASAPACI = "921335401799643147";    // ささぱーしh
const CH_JIGU2_BOSS = "976383794997260288";    // 2鯖赤ドロCh
const CH_JIGU5_BOSS = "913632478932127755";    //  5鯖赤ドロCh 
const CH_KAI6_BOSS = "1006859929610633226";    // カイン6鯖赤ドロCh

const CH_KAI5_BOSS = "1157173245917798440";    // カイ５
const CH_KAI4_BOSS = "1157185576429162586";    // カイ4
const CH_KAI3_BOSS = "1157189673991553095";    // カイ3
const CH_KAI2_BOSS = "1157232656111644742";    // カイ2
const CH_KAI2_BOSS1 = "1157232656111644742";    // カイ2
const CH_KAI2_BOSS2 = "1157232656111644742";    // カイ2 

// botが準備できれば発動され、 上から順に処理される。 
client.on('ready', () => {
    // コンソールにBot準備完了～と表示 リネレボ
    console.log('Bot準備完了～');
    // ステータスに〇〇をプレイ中と表示
    client.user.setActivity('!ヘルプ｜L2M', {
        type: ActivityType.Playing
    });
});

// 脱退ログ発行
client.on('guildMemberRemove', (guildMember) => {
    var str = guildMember.guild.name + "から" + guildMember.displayName + "がサーバーから脱退しました";
    client.channels.cache.get(CH_INOUT).send(str);
    //client.channels.cache.get(CH_INOUT).send(str)
    if (guildMember.guild.name === "ホバーツ") {
        // ホバーツの場合
        client.channels.cache.get("1156383619108061194").send(str)

    }
    else if (guildMember.guild.name === "ソラシド") {
        // ソラシドの場合
        client.channels.cache.get("1027032767378235473").send(str)
    }
    else if (guildMember.guild.name === "バツ２用") {
        // バツ２用の場合
        client.channels.cache.get("1166583973384818768").send(str)
    }
    else if (guildMember.guild.name === "無幻ランド") {
        // 夢
        client.channels.cache.get("1135184690387624059").send(str)
    }
    else {
        client.channels.cache.get(CH_INOUT).send(str)
    }
});

// botがメッセージを受信すると発動され、 上から順に処理される。
client.on('messageCreate', async message => {
    // 再帰を防止
    if (message.author.id === client.user.id || message.author.bot) {
        return;
    }

    // 説明時の接頭語
    if (message.content.match(/###/)) {
        console.log("message.content" + message.content);
        return;
    }



    // MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
    //  全体ヘルプ
    // MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
    if (message.content.match(/!ヘルプ/)) {

        // ささぱーし部屋
        if (message.guild.id === GLD_SASA) {
            let text = "";
            // ささぱーし
            // ささぱーし
            text = "リンランだよ！\n" +
                "わたしはささぱん・ぱーし専用botだよ" + emoji.get('panda_face') + "\n" +
                "今わたしができることはこれだけだよ" + emoji.get('kissing_heart') + "\n" +
                "\n" +
                "●<#855451522158166016>でオークションアイテムの安全取引の計算をリンランがしてくれるよ！\n" +
                "\n" +
                "以下はリンランの専用コマンドだよ\n" +
                "!サイコロ\n" +
                "リアクションでサイコロを返すよ！\n" +
                "!さいころでも大丈夫だよ\n" +
                "!説明\n" +
                "各チャンネルで「!説明」って打つとリンランが説明しにいくよ！\n" +
                "!ヘルプ\n" +
                "このヘルプをだすよ\n" +
                "コマンド忘れたときに使ってね" + emoji.get('kissing_heart') + "\n";

            sendMsg(message.channel.id, text);
        }
        else {
            let text = "";
            // HOALOHA
            text = "リンランだよ！\n" +
                "わたしはリネ２Ｍ専用botだよ" + emoji.get('panda_face') + "\n" +
                "今わたしができることはこれだけだよ" + emoji.get('kissing_heart') + "\n" +
                "\n" +
                "!サイコロ\n" +
                "リアクションでサイコロを返すよ！\n" +
                "!さいころでも大丈夫だよ\n\n" +
                "!説明\n" +
                "リンランが書き込むチャンネルで「!説明」って打つとわたしがが説明しにいくよ！\n\n" +
                "!ヘルプ\n" +
                "このヘルプをだすよ\n" +
                "コマンド忘れたときに使ってね" + emoji.get('kissing_heart') + "\n";

            sendMsg(message.channel.id, text);
        }

        return;

    }

    // MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
    //  あいさつ
    // MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
    if (message.content.match(/にゅー/)) {
        let text = "にゅー" + emoji.get('sunglasses');
        sendMsg(message.channel.id, text);
        return;
    }

    // MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
    //  さいころ
    // MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
    if (message.content.match(/!サイコロ|!さいころ/)) {
        var strResult = "false";
        if (message.content.match(/!サイコロ/)) {
            strResult = message.content.replace("!サイコロ", "");
            console.log("strResult" + strResult);
        }
        else {
            strResult = message.content.replace("!さいころ", "");
            console.log("strResult" + strResult);
        }
        if (strResult === "") {
            var min = 1;
            var max = 6;

            var dice = Math.floor(Math.random() * (max + 1 - min)) + min;
            let pref = '';

            switch (dice) {
                case 1:
                    pref = emoji.get('one');
                    break;
                case 2:
                    pref = emoji.get('two');
                    break;
                case 3:
                    pref = emoji.get('three');
                    break;
                case 4:
                    pref = emoji.get('four');
                    break;
                case 5:
                    pref = emoji.get('five');
                    break;
                case 6:
                    pref = emoji.get('six');
                    break;
                default:
                    pref = emoji.get('six');
            }
            const reaction = await message.react(pref);
        }
        return;
    }

    // MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM 
    //  ボス討伐時刻報告
    // MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
    // ボス討伐時刻報告チャンネル
    const CH_JIG4_BOSS_ENTRY = "923479489864933436";    // ジグ４
    const CH_JIG6_BOSS_ENTRY = "924277763651825724";    // ジグ６
    const CH_BATSU_BOSS_ENTRY = "960878596312924160";    // バーツ
    const CH_JIG2_BOSS_ENTRY = "976387274470223902";    // ジグ２
    const CH_JIG1_BOSS_ENTRY = "980529357170819082";    // ジグ１
    const CH_JIG5_BOSS_ENTRY = "982239979474399273";    // ジグ5
    const CH_KAI6_BOSS_ENTRY = "1006851192887984178";    // カイ6
    const CH_KAI2_BOSS_ENTRY = "1156373670873276526";    // カイ2
    const CH_KAI3_BOSS_ENTRY = "1156374081889902653";    // カイ3
    const CH_KAI4_BOSS_ENTRY = "1156374278934114374";    // カイ4
    const CH_KAI5_BOSS_ENTRY = "1156374426397458452";    // カイ5

    if (
        [
            CH_JIG4_BOSS_ENTRY, CH_JIG5_BOSS_ENTRY, CH_JIG6_BOSS_ENTRY,
            CH_JIG2_BOSS_ENTRY, CH_JIG1_BOSS_ENTRY, CH_KAI6_BOSS_ENTRY,
            CH_KAI2_BOSS_ENTRY, CH_KAI3_BOSS_ENTRY, CH_KAI4_BOSS_ENTRY, CH_KAI5_BOSS_ENTRY,
            "1336811041308278865", "1179024611350958090", "1199576694445584394", "1212224665095770162",
            "1327420127788007474", "1252568320780009542", "1253281439454204015", "1263636724614041712",
            "1359471770431652050", CH_BATSU_BOSS_ENTRY
        ].includes(message.channel.id)
    ) {
        if (message.content.match(/!説明/)) {
            let text = "リンランだよ！\n" +
                "このチャンネルではボスの討伐時刻を更新するよ\n" +
                "ボス討伐時刻をこのチャンネルに書き込んでね♪\n" +
                "時刻(4桁)　ボス名　備考\n" +
                "1455　フリント\n" +
                "こんな風に書いてね！\n" +
                "ボス名はボス名の一部を書くだけで大丈夫だよ！\n" +
                "汚染したクルマなら「汚染」、パンドライドなら「パンド」とかだよ\n" +
                "チェルトゥバなら「チェル」、トロンバなら「トロ」でも大丈夫だよ！\n" +
                "備考は「わきなし」、「マップ」、「ロスト」、「ログ」等を書き込んでね\n" +
                "数分の誤差がある場合は「マップ　だいたい」とかって書いてくれると嬉しいな♪\n" +
                "時刻、ボス名、備考の間には必ず空白を入れてね\n" +
                "ボスの討伐時刻は1発言に1つのみにしてね\n" +
                "みんなどんどんボス討伐に参加してね" + emoji.get('kissing_heart') + "\n";

            sendMsg(message.channel.id, text);
            return;
        }

        console.log("message.content" + message.content);
        let displayName = encodeURI(message.member?.displayName || message.author.username);
        console.log("id" + message.author.id);
        let postMsg = encodeURI(message.author.id + " " + message.content);
        console.log("displayName" + displayName);

        var URL = "";
        switch (message.channel.id) {
            case CH_JIG4_BOSS_ENTRY:
                URL = "https://script.google.com/macros/s/AKfycbxVKQqRLJ9vGpaLetUBUl9jJPS1AmOkID4SioQ8unQP4eQEcT4s/exec?";
                break;
            case CH_JIG5_BOSS_ENTRY:
                URL = "https://script.google.com/macros/s/AKfycbyPzY_uR2ot-o4TIKAj3LZ3l1FL-NJHg5D6gu7_QxUlu_EctTFj/exec?";
                break;
            case CH_JIG6_BOSS_ENTRY:
                URL = "https://script.google.com/macros/s/AKfycbxRlOGkuHKhwC9muSA3Dak_N_EudVSVv9QzqjApN7jBhkaoF8x9FBTrqXHLvn9VAFj0/exec?";
                break;
            case CH_JIG2_BOSS_ENTRY:
                URL = "https://script.google.com/macros/s/AKfycbzxza-YuhMOBMkO4skETdwWpEb7Y0iyRUY5gOIn7mSLPBfaAJLf/exec?";
                break;
            case CH_JIG1_BOSS_ENTRY:
                URL = "https://script.google.com/macros/s/AKfycbzQ1Z8jdkkD7UMuanyHyj2T34XC_sk-o8Fobgu67hLO99EH5HAVWxdS9ylQL9eE4wHD/exec?";
                break;
            case CH_KAI6_BOSS_ENTRY:
                URL = "https://script.google.com/macros/s/AKfycbytmrOJpPHXIN2bUVVJYoJh1rEB8Cm1wsj1W1JjK1u3cI0k5gaYqUVOcV6Ur62iz8Wevw/exec?";
                break;
            case CH_BATSU_BOSS_ENTRY:
                URL = "https://script.google.com/macros/s/AKfycbw8y41cj90jDR1BT_FStjPyBn1CIk4_9Pe9J_GsExiYriVOvl1rd_mW0FLmiTsv_GRn/exec?";
                break;
            case CH_KAI2_BOSS_ENTRY:
                URL = "https://script.google.com/macros/s/AKfycbxVKQqRLJ9vGpaLetUBUl9jJPS1AmOkID4SioQ8unQP4eQEcT4s/exec?";
                break;
            case CH_KAI3_BOSS_ENTRY:
                URL = "https://script.google.com/macros/s/AKfycbzxza-YuhMOBMkO4skETdwWpEb7Y0iyRUY5gOIn7mSLPBfaAJLf/exec?";
                break;
            case CH_KAI4_BOSS_ENTRY:
                URL = "https://script.google.com/macros/s/AKfycbw8y41cj90jDR1BT_FStjPyBn1CIk4_9Pe9J_GsExiYriVOvl1rd_mW0FLmiTsv_GRn/exec?";
                break;
            case CH_KAI5_BOSS_ENTRY:
                URL = "https://script.google.com/macros/s/AKfycbyPzY_uR2ot-o4TIKAj3LZ3l1FL-NJHg5D6gu7_QxUlu_EctTFj/exec?";
                break;
            case "1336811041308278865":
                URL = "https://script.google.com/macros/s/AKfycbzehjxANQkAYYHPNrITA1DOWyOD5Ej0KLism380crGsheRmx8R98i2BmfxwHi4Gt1rW/exec?";
                break;
            case "1179024611350958090":
                URL = "https://script.google.com/macros/s/AKfycby3z5N1nLMYbQYRPRv3u0TiwZLnUUzh7UKlPjEIjJIcuFycVgHhalwN_6ekdNvNCLmdjQ/exec?";
                break;
            case "1199576694445584394":
                URL = "https://script.google.com/macros/s/AKfycbw2n0p5SLp8j3yY9iVdNmzBRX1J860WiVdNNekQgzTwsB3YilvQP2S5LvexpS-P4fippA/exec?";
                break;
            case "1212224665095770162":
                URL = "https://script.google.com/macros/s/AKfycbwX7-NyfCckJae98iF4wVicahAZyo9beaAO4HkgdnEowuPjlgeMPagEOtse2vaI6Bt0/exec?";
                break;
            case "1232692299822268457":
                URL = "https://script.google.com/macros/s/AKfycby9zJB5l7bds9Js5kbgl8H0malscFpsvCy16ORvFv5Hjh7Qk2tsS3GlHV50zW7t_t9I/exec?";
                break;
            case "1252568320780009542":
                URL = "https://script.google.com/macros/s/AKfycbx-dI5hyNAvfYoAKBKGsC688-aShtg7MZLfBmZE4eYAW57UOnXPDMHzcIR3wvsW_RsD/exec?";
                break;
            case "1327420127788007474":
                URL = "https://script.google.com/macros/s/AKfycbyKbtEQJoFG74uZTAGmcsk1bRMk4OSyes9wM5c4vauVXPvh9pXRpXcYk16SvZXfYYY4/exec?";
                break;
            case "1263636724614041712":
                URL = "https://script.google.com/macros/s/AKfycbxnmEKYxIjSdHBSnl2cUZYAd3nUzquZ6xRC9g82FG063HNOtoJ_SOQsOF4dkRas3zZQzw/exec?";
                break;
            case "1359471770431652050":
                URL = "https://script.google.com/macros/s/AKfycbxk7xQO-5i17l8J58dYCB-IY7Q0X3b6Vv2-A7eUk9VVWj61D7lVBLPjtF4zrhAnzJKLGA/exec?";
                break;
            default:
                return;
        }
       
        URL += "name=" + displayName;
        URL += "?msg=" + postMsg;
        console.log("URL討伐報告 " + URL);

        fetch(URL)
            .then(response => response.json())
            .then(json => {
                const string = json.data;
                sendMsg(message.channel.id, {
                    embeds: [{
                        color: 0xe91e63,
                        description: string
                    }]
                });
                console.log(json);
            });

        return;
    }


    // MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
    //  ボスリスト取得
    // MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
    // ボスリスト取得ジグ４
    // ささぱーしとHOAジグ４ボス時間アラーム
    const CH_JIG4_BOSS_ALARM = "923479326140272682";    // ジグ４
    const CH_JIG6_BOSS_ALARM = "924277688523456562";    // ジグ６
    const CH_BATSU_BOSS_ALARM = "960878468340523038";    // バーツ
    const CH_JIG2_BOSS_ALARM = "976387133063450695";    // ジグ２
    const CH_JIG1_BOSS_ALARM = "981188487246143488";    // ジグ１
    const CH_JIG5_BOSS_ALARM = "982153927460016168";    // ジグ5
    const CH_KAI6_BOSS_ALARM = "1006851365928194069";    // カイン6 
    const CH_KAI2_BOSS_ALARM = "1156373582998409247";  // ホバーツ
    const CH_KAI3_BOSS_ALARM = "1156373993822113954";
    const CH_KAI4_BOSS_ALARM = "1156374192921509928";
    const CH_KAI5_BOSS_ALARM = "1156374377349263371";
    // ボスメンテナンス時刻設定
    if ((message.channel.id === CH_JIG4_BOSS_ALARM) ||
        (message.channel.id === CH_JIG5_BOSS_ALARM) ||
        (message.channel.id === CH_JIG6_BOSS_ALARM) ||
        (message.channel.id === CH_JIG2_BOSS_ALARM) ||
        (message.channel.id === CH_JIG1_BOSS_ALARM) ||
        (message.channel.id === CH_KAI6_BOSS_ALARM) ||
        (message.channel.id === CH_KAI2_BOSS_ALARM) ||
        (message.channel.id === CH_KAI3_BOSS_ALARM) ||
        (message.channel.id === CH_KAI4_BOSS_ALARM) ||
        (message.channel.id === CH_KAI5_BOSS_ALARM) ||
        (message.channel.id === "1261894015247454249") || // うさぎ
        (message.channel.id === "1179024660973760553") || // 夢
        (message.channel.id === "1199576616209235998") || // はぐれ 
        (message.channel.id === "1212224624826253372") || // はぐれ3
        (message.channel.id === "1232692374753509377") || // らむ
        (message.channel.id === "1252568263603388466") || // 次官
        (message.channel.id === "1253281576696156170") || // ラム２
        (message.channel.id === "1263636820210749481") || // カレー
        (message.channel.id === "1359471728908042290") || // うどん
        (message.channel.id === CH_BATSU_BOSS_ALARM)) {
        //    if ((message.channel.id === TESTCH) || (message.channel.id === TESTCH)) {   // てすと
        console.log("message.content " + message.content);
        //// 接頭語に"!"がない場合
        //if (!(message.content.startsWith('!')) === true) {
        //    // なにもせずに終わる
        //    return;
        //}
        // 接頭語に"!"がない場合
        var strStart = message.content.substr(0, 1);
        if (strStart === "!") {
            // このまま処理続行
        }
        else {
            return;
        }

        if (message.content.match(/!リンラン/)) {
            let listUrl = "";
            var channel = message.channel.id;
            switch (channel) {
                case CH_JIG4_BOSS_ALARM:
                    listUrl = "https://script.google.com/macros/s/AKfycbx_y_axKD52_lH5z7hc-pDrbEPv_T8lQEexNQnk6clf9gG3I4aO/exec";
                    break;
                case CH_JIG5_BOSS_ALARM:
                    listUrl = "https://script.google.com/macros/s/AKfycby2tFpIGMmE8qQGKyhPTZBxDxCVFMvn5wrTC3PLP16BM-oyLwo/exec";
                    break;
                case CH_JIG6_BOSS_ALARM:
                    listUrl = "https://script.google.com/macros/s/AKfycbzQI_psds8bvmy1cBO2u0tSpRj5GEaa0s3zeWGYJU3SvedXl6sM2SJ9CS-5NjzVIBz8/exec";
                    break;
                case CH_JIG2_BOSS_ALARM:
                    listUrl = "https://script.google.com/macros/s/AKfycbzWKr4KWb6MuRh1IBYoPiFJ6aifgqBsRhucfMWr/exec";
                    break;
                case CH_JIG1_BOSS_ALARM:
                    listUrl = "https://script.google.com/macros/s/AKfycbydCmjNRIuIF9f3NDRb4IbxBPGyZpMbE9Lpke92nRkUOw-W55Niush7tto6pJExoyGTHg/exec";
                    break;
                case CH_KAI6_BOSS_ALARM:
                    listUrl = "https://script.google.com/macros/s/AKfycbwko8MWtXlMx6Zq1Sn0-EgrvkluvtDcaZfRZdf4MGQXeyMAIn-EedjxcGZheRyBayfvXA/exec";
                    break;
                case CH_KAI2_BOSS_ALARM:
                    listUrl = "https://script.google.com/macros/s/AKfycbx_y_axKD52_lH5z7hc-pDrbEPv_T8lQEexNQnk6clf9gG3I4aO/exec";
                    break;
                case CH_KAI3_BOSS_ALARM:
                    listUrl = "https://script.google.com/macros/s/AKfycbzqaBJFX3YVVGIoPPmWT54nbl8j6y6Lqs7JHbmqPOYSfEB7cEg/exec";
                    break;
                case CH_KAI4_BOSS_ALARM:
                    listUrl = "https://script.google.com/macros/s/AKfycbyh_cooE2bAKROOFSdbvKGhZNCZBFui26GHAi9OZEo0EMzwBPOmJueoIt3PtSDgPEva/exec";
                    break;
                case CH_KAI5_BOSS_ALARM:
                    listUrl = "https://script.google.com/macros/s/AKfycby2tFpIGMmE8qQGKyhPTZBxDxCVFMvn5wrTC3PLP16BM-oyLwo/exec";
                    break;
                case CH_BATSU_BOSS_ALARM:
                    listUrl = "https://script.google.com/macros/s/AKfycbyh_cooE2bAKROOFSdbvKGhZNCZBFui26GHAi9OZEo0EMzwBPOmJueoIt3PtSDgPEva/exec";
                    break;
                case "1261894015247454249": // うさぎ
                    listUrl = "https://script.google.com/macros/s/AKfycbwbRhBjqYmFhAokBT0MJ0DOmXrKwI79MrDsPhzGXADe0FNnku_PEeFprA6TJsEApwWW/exec";
                    break;
                case "1179024660973760553": // 夢
                    listUrl = "https://script.google.com/macros/s/AKfycbwXY6tuABYAEOuEcRPcIiOpWmxdiZrrXZB-sQgz68AG3D3S8090d-hx0zCAcy8zTn96VA/exec";
                    break;
                case "1199576616209235998": // はぐれ
                    listUrl = "https://script.google.com/macros/s/AKfycbxn4c_f3oUIHFRMVJY2Xumaa6tyT9N3JdqgTXtLQuVm3K7qvdNBGsXjZh8VTh_Nl4wjjA/exec";
                    break;
                case "1212224624826253372": // はぐれ3
                    listUrl = "https://script.google.com/macros/s/AKfycbxp83lEpH2CP3s3ppnzXvUJ2vtWfD0YyFSg_MwlEp-yOdSRzkQYZI1kfieuxwuVqxwP/exec";
                    break;
                case "1232692374753509377": // らむ
                    listUrl = "https://script.google.com/macros/s/AKfycbwqdRN_SGpahBisaVW5e47OKLEUtUFXKH-nX6_IvFT25Ns2IhDsgrY5R9ztMeQlY4Iu/exec";
                    break;
                case "1252568263603388466": // 次官
                    listUrl = "https://script.google.com/macros/s/AKfycbxbXl3qCSkvXZsmcan1-G6u9_lf_kazHh-nEKJw9VsuIGXpomwlRw_cANAD1DNi6cbWPQ/exec";
                    break;
                case "1253281576696156170": // ラム２
                    listUrl = "https://script.google.com/macros/s/AKfycbz6StURfR-mzPEy7kfWiVdvXYx83itr6c0gIBogFQv-AC2KnaCtelGEFM0-BU9c6eGaJg/exec";
                    break;
                case "1263636820210749481": // カレー
                    listUrl = "https://script.google.com/macros/s/AKfycbxpLqX8e3YUy79FYhPAX0BjsRXyspBpo62upmmkN9pbfBwxMxvSK1n02L6V3zDf1q1Dcg/exec";
                    break;
                case "1359471728908042290": // うどん
                    listUrl = "https://script.google.com/macros/s/AKfycbzMKbk4k_Q2QDqVjhJ0DNfUN-eBjt4FAeRT9mxhFdq-Yfpj4C-un0soSWjB4naah0GP/exec";
                    break;
                default:
            }

            fetch(listUrl)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                })
                .catch(error => {
                    console.log("失敗しました");
                });
            return;
        }

        if (message.content.match(/!説明/)) {
            let text = "リンランだよ！\n" +
                "このチャンネルではボス関連の通知、設定をするよ！\n\n" +
                "!リンラン\n" +
                "ボスの出現時刻リストを出すよ！\n\n" +
                "!メンテ　日付(4桁)　開始時刻(4桁)　終了時刻(4桁)　鯖リセット時刻(4桁)\n" +
                "メンテナンス日時設定をするよ！\n" +
                "こんな風に入力してね！\n" +
                "!メンテ　0101　0450　0700 0510\n" +
                "↑みたいに入力すると、__鯖リセットは5時10分、1月1日の午前4時50分から7時までメンテ__って登録するよ♪\n\n" +
                "!リセット　サーバーリセット時刻(4桁)\n" +
                "鯖のリセット時刻設定をするよ！\n" +
                "こんな風に入力してね！\n" +
                "!リセット　0515\n" +
                "↑みたいに入力すると、__午前5時15分に鯖リセット__って登録するよ♪\n" +
                "みんなどんどん書き込んでね" + emoji.get('kissing_heart') + "\n";

            sendMsg(message.channel.id, text);
            return;
        }


        if (message.content.match(/!メンテ/)) {
            // パンダ７でメンテ・リセット
            var strcont = message.content.replace(/　/g, ' ');
            const strmsg = strcont.split(" ")
            console.log("strmsg0 " + strmsg[0]);
            console.log("strmsg1 " + strmsg[1]);
            console.log("strmsg2 " + strmsg[2]);
            console.log("strmsg3 " + strmsg[3]);
            console.log("strmsg4 " + strmsg[3]);
            console.log("strmsg1 " + String(strmsg[1]).length);
            console.log("strmsg2 " + String(strmsg[2]).length);
            console.log("strmsg3 " + String(strmsg[3]).length);
            console.log("strmsg4 " + String(strmsg[4]).length);

            if (!(String(strmsg[1]).length === 4) === true) {
                sendMsg(message.channel.id, {
                    embeds: [{
                        color: 15258703,
                        description: "メンテ日付が正しくないよー(；´･ω･)"
                    }]
                });
                return;
            }
            if (!(String(strmsg[2]).length === 4) === true) {
                sendMsg(message.channel.id, {
                    embeds: [{
                        color: 15258703,
                        description: "メンテ開始時刻が正しくないよー(；´･ω･)"
                    }]
                });
                return;
            }
            if (!(String(strmsg[3]).length === 4) === true) {
                sendMsg(message.channel.id, {
                    embeds: [{
                        color: 15258703,
                        description: "メンテ終了時刻が正しくないよー(；´･ω･)"
                    }]
                });
                return;
            }

            var timeorg = new Date();
            timeorg.setHours(timeorg.getHours() + 9);
            // 現在年を取得
            var year = timeorg.getFullYear();
            var str = year + "年" + strmsg[1].substr(0, 2) + "月" + strmsg[1].substr(2, 2) + "日 " +
                strmsg[2].substr(0, 2) + ":" + strmsg[2].substr(2, 2) + " ～ " + strmsg[3].substr(0, 2) + ":" + strmsg[3].substr(2, 2);

            // メンテ日時設定
            var type = "1";
            var URL = "";
            // うどんの場合
            if (message.channel.id === "1359471728908042290") {
                URL = "https://script.google.com/macros/s/AKfycbzJZudQWyeyqa1MXzHYk5xyP8pw3q7y10EJYV94MtZtXPWhqPjBfasx_eEAgcmgY63W/exec?";
            }
            else {
                URL = "https://script.google.com/macros/s/AKfycbzne9DeOVayod5Yk4cEm5KKTJdwagCj7bnBsCTzvQzOKEjbaJ6mqRGJFFoq3Q5OHS54/exec?";
            }

            let displayName = message.member.displayName;
            URL += "name=" + displayName;

            // 処理番号1(メンテ日時設定)
            var strcont = message.content.replace(/　/g, ' ');
            var string = type + "?msg=" + strcont;
            let strMsg = string;
            URL += "?msg=" + strMsg;
            console.log("URL " + URL);

            fetch(URL)
                .then(function (response) {
                    return response.json();
                })
                .then(function (json) {
                    console.log(json);
                });

            return;
        }

        if (message.content.match(/!リセット/)) {

            var strcont = message.content.replace(/　/g, ' ');
            const strmsg = strcont.split(" ")
            console.log("strmsg0 " + strmsg[0]);
            console.log("strmsg1 " + strmsg[1]);
            console.log("strmsg1 " + String(strmsg[1]).length);

            if (!(String(strmsg[1]).length === 4) === true) {
                sendMsg(message.channel.id, {
                    embeds: [{
                        color: 15258703,
                        description: "鯖リセット時刻が正しくないよー(；´･ω･)"
                    }]
                });
                return;
            }

            var type = "2";
            var URL = "";
            if (message.channel.id === "1359471728908042290") {
                URL = "https://script.google.com/macros/s/AKfycbzJZudQWyeyqa1MXzHYk5xyP8pw3q7y10EJYV94MtZtXPWhqPjBfasx_eEAgcmgY63W/exec?";
            }
            else {
                URL = "https://script.google.com/macros/s/AKfycbzne9DeOVayod5Yk4cEm5KKTJdwagCj7bnBsCTzvQzOKEjbaJ6mqRGJFFoq3Q5OHS54/exec?";
            }

            let displayName = encodeURI(message.member.displayName);
            URL += "name=" + displayName;

            var strcont = message.content.replace(/　/g, ' ');
            var string = type + "?msg=" + strcont;
            let strMsg = encodeURI(string);
            URL += "?msg=" + strMsg;
            console.log("URL " + URL);

            fetch(URL)
                .then(function (response) {
                    return response.json();
                })
                .then(function (json) {
                    console.log(json);
                });

            sendMsg(message.channel.id, {
                embeds: [{
                    color: 15258703,
                    description: "設定が終わるまで5分ほど待ってねー！(｡･ω･｡)ﾉ♡"
                }]
            });
            return;
        }













    }


});

client.login(process.env.DISCORD_BOT_TOKEN)
    .then(() => console.log('ボットログイン成功'))
    .catch(error => console.error(`ボットログインエラー: ${error.message}`));

// 送信相手にメッセージを返信
function sendReply(message, text) {
    message.reply(text)
        .then(() => console.log("リプライ送信: " + text))
        .catch(error => console.error("リプライエラー:", error));
}

// メッセージをチャンネルに送信
function sendMsg(channelId, option = {}) {
    client.channels.cache.get(channelId).send(option)
        .then(() => console.log("メッセージ送信: " + JSON.stringify(option)))
        .catch(error => console.error("メッセージ送信エラー:", error));
}
