// MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
//  日がな一日
// MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
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

const CH_INOUT = "480280730115768364";    // 入退出Ch

// botが準備できれば発動され、 上から順に処理される。 
client.on('ready', () => {
    // コンソールにBot準備完了～と表示 リネレボ
    console.log('Bot準備完了～');
    // ステータスに〇〇をプレイ中と表示
    client.user.setActivity('!ヘルプ｜リネレボ', {
        type: ActivityType.Playing
    });
});

// 脱退ログ発行
client.on('guildMemberRemove', (guildMember) => {
    var str = guildMember.guild.name + "から" + guildMember.displayName + "がサーバーから脱退しました";
    client.channels.cache.get(CH_INOUT).send(str);
    //client.channels.cache.get(CH_INOUT).send(str)
    if (guildMember.guild.name === "日がな一日") {
        // 日がな
        client.channels.cache.get("480280730115768364").send(str);
    }
    else {
        // お試し用
        client.channels.cache.get("1267742343050690621").send(str);
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
    //  ヘルプ
    // MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
    if (message.content.match(/!ヘルプ/)) {
        let text = "トマトッツォだよ！" + emoji.get('tomato') + "\n" +
            "わたしは日がな一日専用botだよ！\n" +
            "日がな一日のみんなをサポートするよ" + emoji.get('kissing_heart') + "\n" +
            "\n" +
            "以下はわたしの専用コマンドだよ\n" +
            "!サイコロ\n" +
            "リアクションでサイコロを返すよ！\n" +
            "!さいころでも大丈夫だよ\n\n" +
            "!説明\n" +
            "各チャンネルで「!説明」って打つとわたしが説明しにいくよ！\n\n" +
            "!ヘルプ\n" +
            "このヘルプをだすよ\n" +
            "コマンド忘れたときに使ってね" + emoji.get('kissing_heart') + "\n";

        sendMsg(message.channel.id, {
            embeds: [{
                color: 0xff0000,
                description: text
            }]
        });

        return;
        // start
    }

    // MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
    //  あいさつ
    // MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
    if (message.content.match(/おつかれさま/)) {
        let text = "おつかれさま(｡･ω･｡)ﾉ♡";
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
    //  武器コス登録
    // MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
    // 武器コス登録
    if (message.channel.id === '980131809721466930') {
        if (message.content.match(/!説明/)) {
            let text = "トマトッツォだよ！" + emoji.get('tomato') + "\n" +
                "このチャンネルでは武器コス特性を登録できるよ！\n\n" +
                "■新しい武器コスが登場したら「!登録　〇〇」と書き込んでね！\n" +
                "〇〇は武器コスの名前だよ\n\n" +
                "■「!テンプレ」と入力すると、現在登録済みの武器コス一覧が見れるよ！\n\n" +
                "■特性を登録したい場合は以下のように書いてね\n" +
                "三国志:10\n" +
                "左側には武器コスの名前、右側は特性レベルの数値だよ！\n" +
                "武器コスの名前と特性レベルの間にある、\n「:」を消しちゃうとわたしが困るので消さないでね" + emoji.get('kissing_heart') + "\n";

            sendMsg(message.channel.id, {
                embeds: [{
                    color: 0xff0000,
                    description: text
                }]
            });
            return;
        }

        console.log("displayName" + message.member.displayName);
        console.log("message.content" + message.content);
        let displayName = encodeURI(message.member.displayName);

        //console.log("displayName" + displayName);
        //console.log("id" + message.member.id);
        var URL = "";
        // 武器コス登録　
        URL = "https://script.google.com/macros/s/AKfycby1hv4zdCt5dmBCR26b-5BpbbCW_gsGnyRgIexlPw/exec?";

        URL += "name=" + displayName;
        URL += "?id=" + message.member.id;
        URL += "?comment=" + encodeURI(message.content);

        console.log("URL  " + URL);

        var string = "";
        fetch(URL)
            .then(function (response) {
                return response.json();
            })
            .then(function (json) {
                string = json.data;
                if (message.content.match(/!テンプレ/)) {
                    sendMsg(message.channel.id, string);
                }
                else {
                    sendReply(message, string);
                }
                console.log(json);
            })
            .catch(error => console.error("Fetchエラー:", error));
        return;
    }

    // MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
    //  通常要塞戦出欠
    // MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
    // 通常要塞戦出欠(土曜2130)
    if (message.channel.id === '980123304180449350') {
        if (message.content.match(/!説明/)) {
            let text = "トマトッツォだよ！" + emoji.get('tomato') + "\n" +
                "このチャンネルでは通常要塞戦の出欠を登録できるよ！\n\n" +
                "出欠は「参加」「不参加」「未定」の3つの内のどれかを書き込んでね\n" +
                "なにかコメントも一緒に書き込みたい場合は、\n" +
                "参加　少し遅刻\n" +
                "みたいに間に空白をいれてコメントを書き込むこともできるよ！\n" +
                "VCができる人は「VC」って書くとVC可で登録されるよ！\n" +
                "聞き専に戻りたい時は「聞き専」って書くと聞き専で登録されるよ！\n" +
                "通常要塞戦にどんどん参加してね" + emoji.get('kissing_heart') + "\n";

            sendMsg(message.channel.id, {
                embeds: [{
                    color: 0xff0000,
                    description: text
                }]
            });
            return;
        }

        console.log("displayName" + message.member.displayName);
        console.log("message.content" + message.content);
        let displayName = encodeURI(message.member.displayName);

        //console.log("displayName" + displayName);
        //console.log("id" + message.member.id);

        console.log("displayName" + displayName);
        console.log("id" + message.member.id);
        var URL = "";
        // 日がな一日
        URL = "https://script.google.com/macros/s/AKfycbxH-0u5eJKut51cKeBw9oI_Wirytawlf6goxGUlXQdqxpu9Pig/exec?";

        URL += "name=" + displayName;
        URL += "?id=" + message.member.id;
        URL += "?comment=" + encodeURI(message.content);

        console.log("URL  " + URL);

        var string = "";
        fetch(URL)
            .then(function (response) {
                return response.json();
            })
            .then(function (json) {
                string = json.data;
                if (message.content === '!アナウンス') {
                    sendMsg(message.channel.id, string);
                }
                else {
                    sendReply(message, string);
                }
                console.log(json);
            })
            .catch(error => console.error("Fetchエラー:", error));
        return;
    }

    // MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
    //  土曜定期戦出欠
    // MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
    // 土曜定期戦出欠(土曜2230)
    if (message.channel.id === '980123511169351712') {
        if (message.content.match(/!説明/)) {
            let text = "トマトッツォだよ！" + emoji.get('tomato') + "\n" +
                "このチャンネルでは土曜定期戦の出欠を登録できるよ！\n\n" +
                "出欠は「参加」「不参加」「未定」の3つの内のどれかを書き込んでね\n" +
                "なにかコメントも一緒に書き込みたい場合は、\n" +
                "参加　少し遅刻\n" +
                "みたいに間に空白をいれてコメントを書き込むこともできるよ！\n" +
                "VCができる人は「VC」って書くとVC可で登録されるよ！\n" +
                "聞き専に戻りたい時は「聞き専」って書くと聞き専で登録されるよ！\n" +
                "土曜定期戦にどんどん参加してね" + emoji.get('kissing_heart') + "\n";

            sendMsg(message.channel.id, {
                embeds: [{
                    color: 0xff0000,
                    description: text
                }]
            });
            return;
        }

        console.log("displayName" + message.member.displayName);
        console.log("message.content" + message.content);
        let displayName = encodeURI(message.member.displayName);

        //console.log("displayName" + displayName);
        //console.log("id" + message.member.id);

        console.log("displayName" + displayName);
        console.log("id" + message.member.id);
        var URL = "";
        // 日がな一日
        URL = "https://script.google.com/macros/s/AKfycbzr909x84GyAjHK9KHRAAquu99zLZU3FGQgVtab_rNCd2if5l0/exec?";

        URL += "name=" + displayName;
        URL += "?id=" + message.member.id;
        URL += "?comment=" + encodeURI(message.content);

        console.log("URL  " + URL);

        var string = "";
        fetch(URL)
            .then(function (response) {
                return response.json();
            })
            .then(function (json) {
                string = json.data;
                if (message.content === '!アナウンス') {
                    sendMsg(message.channel.id, string);
                }
                else {
                    sendReply(message, string);
                }
                console.log(json);
            })
            .catch(error => console.error("Fetchエラー:", error));
        return;
    }


    // MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
    //  水曜定期戦出欠
    // MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
    // 水曜定期戦出欠(水曜2230)
    if (message.channel.id === '980123799741673522') {
        if (message.content.match(/!説明/)) {
            let text = "トマトッツォだよ！" + emoji.get('tomato') + "\n" +
                "このチャンネルでは水曜定期戦の出欠を登録できるよ！\n\n" +
                "出欠は「参加」「不参加」「未定」の3つの内のどれかを書き込んでね\n" +
                "なにかコメントも一緒に書き込みたい場合は、\n" +
                "参加　少し遅刻\n" +
                "みたいに間に空白をいれてコメントを書き込むこともできるよ！\n" +
                "VCができる人は「VC」って書くとVC可で登録されるよ！\n" +
                "聞き専に戻りたい時は「聞き専」って書くと聞き専で登録されるよ！\n" +
                "水曜定期戦にどんどん参加してね" + emoji.get('kissing_heart') + "\n";

            sendMsg(message.channel.id, {
                embeds: [{
                    color: 0xff0000,
                    description: text
                }]
            });
            return;
        }

        console.log("displayName" + message.member.displayName);
        console.log("message.content" + message.content);
        let displayName = encodeURI(message.member.displayName);

        //console.log("displayName" + displayName);
        //console.log("id" + message.member.id);

        console.log("displayName" + displayName);
        console.log("id" + message.member.id);
        var URL = "";
        // 日がな一日
        URL = "https://script.google.com/macros/s/AKfycbzrd0uIFYrmPtBO9PX-GMlcvnZHAc97XMyarkzcrk7KKxN9F9o/exec?";

        URL += "name=" + displayName;
        URL += "?id=" + message.member.id;
        URL += "?comment=" + encodeURI(message.content);

        console.log("URL  " + URL);

        var string = "";
        fetch(URL)
            .then(function (response) {
                return response.json();
            })
            .then(function (json) {
                string = json.data;
                if (message.content === '!アナウンス') {
                    sendMsg(message.channel.id, string);
                }
                else {
                    sendReply(message, string);
                }
                console.log(json);
            })
            .catch(error => console.error("Fetchエラー:", error));
        return;
    }

    // MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
    //  レイド希望
    // MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
    // レイド希望
    if (message.channel.id === '980123459524894752') {
        if (message.content.match(/!説明/)) {
            let text = "トマトッツォだよ！" + emoji.get('tomato') + "\n" +
                "このチャンネルではレイドの出欠を登録できるよ！\n\n" +
                "出欠は「土」「日」「両」「未定」の4つの内のどれかを書き込んでね\n" +
                "なにかコメントも一緒に書き込みたい場合は、\n" +
                "土　少し遅刻\n" +
                "みたいに間に空白をいれてコメントを書き込むこともできるよ！\n" +
                "レイドの参加よろしくね" + emoji.get('kissing_heart') + "\n";

            sendMsg(message.channel.id, {
                embeds: [{
                    color: 0xff0000,
                    description: text
                }]
            });
            return;
        }

        console.log("displayName" + message.member.displayName);
        console.log("message.content" + message.content);
        let displayName = encodeURI(message.member.displayName);

        //console.log("displayName" + displayName);
        //console.log("id" + message.member.id);

        console.log("displayName" + displayName);
        console.log("id" + message.member.id);
        var URL = "";
        // 日がな一日
        URL = "https://script.google.com/macros/s/AKfycbxLp9ei3TUL8pHDNRbSEOGrjIc1TSiEvMYelLvjMRXiosmdte0/exec?";

        URL += "name=" + displayName;
        URL += "?id=" + message.member.id;
        URL += "?comment=" + encodeURI(message.content);

        console.log("URL  " + URL);

        var string = "";
        fetch(URL)
            .then(function (response) {
                return response.json();
            })
            .then(function (json) {
                string = json.data;
                if (message.content === '!アナウンス') {
                    sendMsg(message.channel.id, string);
                }
                else {
                    sendReply(message, string);
                }
                console.log(json);
            })
            .catch(error => console.error("Fetchエラー:", error));
        return;
    }

    // MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
    //  CP登録
    // MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
    // CP登録
    if ((message.channel.id === "752501637011996702") ||
        (message.channel.id === "1270677710821392425")) {
        if (message.content.match(/!説明/)) {
            let text = "トマトッツォだよ！\n" +
                "このチャンネルではCPを登録するよ！\n" +
                "\n" +
                "!ランキング\n" +
                "みんなのCPをランキングにして表示するよ！\n" +
                "みんなどんどん書き込んでね" + emoji.get('kissing_heart') + "\n";

            sendMsg(message.channel.id, text);
            return;
        }

        console.log("message.content" + message.content);

        var URL = "";
        var channel = message.channel.id;
        switch (channel) {
            case "752501637011996702":    // 日がな
                URL = "https://script.google.com/macros/s/AKfycbzkh3ZaldAeJZeKxFh9BP6LetZ8fskWGuOvn67tfUV5xactLYOg/exec?";
                break;

            case "1270677710821392425":  // お試し
                URL = "https://script.google.com/macros/s/AKfycbzf9NNlU8NNOCaDg62UZJ8UHdlVuEH61rCcdkcEyfwinpgFRYWE3fDzZkL0zdA5_Yz6Xw/exec?";
                break;

            default:
        }

        let displayName = encodeURI(message.member.displayName);
        URL += "name=" + displayName;  // キャラ名
        URL += "?id=" + message.author.id;          // id
        URL += "?ch=1";       // type
        URL += "?comment=" + encodeURI(message.content);          // 登録CP
        console.log("URL " + URL);

        var string = "";
        fetch(URL)
            .then(function (response) {
                return response.json();
            })
            .then(function (json) {
                string = json.data;
                sendReply(message, string);
            })
            .catch(error => console.error("Fetchエラー:", error));
        return;
    }

    // MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
    //  フリー１
    // MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
    // フリー１
    if ((message.channel.id === "980125472065208352") ||
        (message.channel.id === "1269320953389912126")) {
        if (message.content.match(/!説明/)) {
            let text = "トマトッツォだよ！" + emoji.get('tomato') + "\n" +
                "このチャンネルではイベント戦の出欠を登録できるよ！\n\n" +
                "出欠は「参加」「不参加」「未定」の3つの内のどれかを書き込んでね\n" +
                "なにかコメントも一緒に書き込みたい場合は、\n" +
                "参加　少し遅刻\n" +
                "みたいに間に空白をいれてコメントを書き込むこともできるよ！\n" +
                "VCができる人は「VC」って書くとVC可で登録されるよ！\n" +
                "聞き専に戻りたい時は「聞き専」って書くと聞き専で登録されるよ！\n" +
                "イベント戦にどんどん参加してね" + emoji.get('kissing_heart') + "\n";

            sendMsg(message.channel.id, {
                embeds: [{
                    color: 0xff0000,
                    description: text
                }]
            });
            return;
        }

        console.log("displayName" + message.member.displayName);
        console.log("message.content" + message.content);
        let displayName = encodeURI(message.member.displayName);

        //console.log("displayName" + displayName);
        //console.log("id" + message.member.id);
        var URL = "";
        var channel = message.channel.id;
        switch (channel) {
            case "980125472065208352":    // 日がな
                URL = "https://script.google.com/macros/s/AKfycbwNsY25A2z-Fi0xcIxr8mgtQVIlLM9AaYZhxTzoGVt8MngUxaGs/exec?";
                break;

            case "1269320953389912126":  // お試し
                URL = "https://script.google.com/macros/s/AKfycbwGIFXwaWL3d8s73asw_JBF6bTOZC-e10jD52hqyG7o_GEr4xA4quMa-u0HRSy0-s4g3w/exec?";
                break;

            default:
        }

        URL += "name=" + displayName;
        URL += "?id=" + message.member.id;
        URL += "?comment=" + encodeURI(message.content);
        console.log("message.content  " + message.content);
        console.log("URL  " + URL);

        var string = "";
        fetch(URL)
            .then(function (response) {
                return response.json();
            })
            .then(function (json) {
                string = json.data;
                if (message.content === '!アナウンス') {
                    sendMsg(message.channel.id, string);
                }
                else {
                    sendReply(message, string);
                }
                console.log(json);
            })
            .catch(error => console.error("Fetchエラー:", error));
        return;
    }

    // MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
    //  フリー２
    // MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
    // フリー２
    if ((message.channel.id === "980125502100615199") ||
        (message.channel.id === "1269321042103636028")) {
        if (message.content.match(/!説明/)) {
            let text = "トマトッツォだよ！" + emoji.get('tomato') + "\n" +
                "このチャンネルではイベント戦の出欠を登録できるよ！\n\n" +
                "出欠は「参加」「不参加」「未定」の3つの内のどれかを書き込んでね\n" +
                "なにかコメントも一緒に書き込みたい場合は、\n" +
                "参加　少し遅刻\n" +
                "みたいに間に空白をいれてコメントを書き込むこともできるよ！\n" +
                "VCができる人は「VC」って書くとVC可で登録されるよ！\n" +
                "聞き専に戻りたい時は「聞き専」って書くと聞き専で登録されるよ！\n" +
                "イベント戦にどんどん参加してね" + emoji.get('kissing_heart') + "\n";

            sendMsg(message.channel.id, {
                embeds: [{
                    color: 0xff0000,
                    description: text
                }]
            });
            return;
        }

        console.log("displayName" + message.member.displayName);
        console.log("message.content" + message.content);
        let displayName = encodeURI(message.member.displayName);

        //console.log("displayName" + displayName);
        //console.log("id" + message.member.id);
        var URL = "";
        var channel = message.channel.id;
        switch (channel) {
            case "980125502100615199":    // 日がな
                URL = "https://script.google.com/macros/s/AKfycbx6YtIhfDwFYycHDahYR4m4AMd02MV49AeuvBX3S9_2JgxwQvwu/exec?";
                break;

            case "1269321042103636028":  // お試し
                URL = "https://script.google.com/macros/s/AKfycbzLZCxnDiAsT865xtRlSKaPgqu1tBFsuec3xV47Cabd5cjPzclYsYjoD657diCoVUlt8w/exec?";
                break;

            default:
        }

        URL += "name=" + displayName;
        URL += "?id=" + message.member.id;
        URL += "?comment=" + encodeURI(message.content);

        console.log("URL  " + URL);

        var string = "";
        fetch(URL)
            .then(function (response) {
                return response.json();
            })
            .then(function (json) {
                string = json.data;
                if (message.content === '!アナウンス') {
                    sendMsg(message.channel.id, string);
                }
                else {
                    sendReply(message, string);
                }
                console.log(json);
            })
            .catch(error => console.error("Fetchエラー:", error));
        return;
    }

    // MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
    //  フリー３
    // MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
    // フリー３
    if ((message.channel.id === "986650877945348106") ||
        (message.channel.id === "1269321095115444254")) {
        if (message.content.match(/!説明/)) {
            let text = "トマトッツォだよ！" + emoji.get('tomato') + "\n" +
                "このチャンネルではイベント戦の出欠を登録できるよ！\n\n" +
                "出欠は「参加」「不参加」「未定」の3つの内のどれかを書き込んでね\n" +
                "なにかコメントも一緒に書き込みたい場合は、\n" +
                "参加　少し遅刻\n" +
                "みたいに間に空白をいれてコメントを書き込むこともできるよ！\n" +
                "VCができる人は「VC」って書くとVC可で登録されるよ！\n" +
                "聞き専に戻りたい時は「聞き専」って書くと聞き専で登録されるよ！\n" +
                "イベント戦にどんどん参加してね" + emoji.get('kissing_heart') + "\n";

            sendMsg(message.channel.id, {
                embeds: [{
                    color: 0xff0000,
                    description: text
                }]
            });
            return;
        }

        console.log("displayName" + message.member.displayName);
        console.log("message.content" + message.content);
        let displayName = encodeURI(message.member.displayName);

        //console.log("displayName" + displayName);
        //console.log("id" + message.member.id);
        var URL = "";
        var channel = message.channel.id;
        switch (channel) {
            case "986650877945348106":    // 日がな
                URL = "https://script.google.com/macros/s/AKfycbxI8b3euTZ5a-rHo3bIGY6BT2lW12c1KLEyAoF0mht_X9t6_jDw/exec?";
                break;

            case "1269321095115444254":  // お試し
                URL = "https://script.google.com/macros/s/AKfycbyHWre_qj1JYr1BCBMQSJpbSPIOsX7eFox9SS9DRKzr4HqqiFg9OeF_pYftFo5vRyOd/exec?";
                break;

            default:
        }

        URL += "name=" + displayName;
        URL += "?id=" + message.member.id;
        URL += "?comment=" + encodeURI(message.content);

        console.log("URL  " + URL);

        var string = "";
        fetch(URL)
            .then(function (response) {
                return response.json();
            })
            .then(function (json) {
                string = json.data;
                if (message.content === '!アナウンス') {
                    sendMsg(message.channel.id, string);
                }
                else {
                    sendReply(message, string);
                }
                console.log(json);
            })
            .catch(error => console.error("Fetchエラー:", error));
        return;
    }

    // MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
    //  フリー４
    // MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
    // フリー４
    if ((message.channel.id === "986651257957670952") ||
        (message.channel.id === "1269321267966902322")) {
        if (message.content.match(/!説明/)) {
            let text = "トマトッツォだよ！" + emoji.get('tomato') + "\n" +
                "このチャンネルではイベント戦の出欠を登録できるよ！\n\n" +
                "出欠は「参加」「不参加」「未定」の3つの内のどれかを書き込んでね\n" +
                "なにかコメントも一緒に書き込みたい場合は、\n" +
                "参加　少し遅刻\n" +
                "みたいに間に空白をいれてコメントを書き込むこともできるよ！\n" +
                "VCができる人は「VC」って書くとVC可で登録されるよ！\n" +
                "聞き専に戻りたい時は「聞き専」って書くと聞き専で登録されるよ！\n" +
                "イベント戦にどんどん参加してね" + emoji.get('kissing_heart') + "\n";

            sendMsg(message.channel.id, {
                embeds: [{
                    color: 0xff0000,
                    description: text
                }]
            });
            return;
        }

        console.log("displayName" + message.member.displayName);
        console.log("message.content" + message.content);
        let displayName = encodeURI(message.member.displayName);

        //console.log("displayName" + displayName);
        //console.log("id" + message.member.id);
        var URL = "";
        var channel = message.channel.id;
        switch (channel) {
            case "986651257957670952":    // 日がな
                URL = "https://script.google.com/macros/s/AKfycbzuO6LTgvjhF0-eZzhK6eSlwxlQ0fvGrtuYbXfchiAy-v728M4/exec?";
                break;

            case "1269321267966902322":  // お試し
                URL = "https://script.google.com/macros/s/AKfycbzvFAXYfUBL-Qp0bNraKLT4_qa0R4uDhxYnDWSMuFch7cyCxt2x4QEY-t14jub1S773/exec?";
                break;

            default:
        }

        URL += "name=" + displayName;
        URL += "?id=" + message.member.id;
        URL += "?comment=" + encodeURI(message.content);

        console.log("URL  " + URL);

        var string = "";
        fetch(URL)
            .then(function (response) {
                return response.json();
            })
            .then(function (json) {
                string = json.data;
                if (message.content === '!アナウンス') {
                    sendMsg(message.channel.id, string);
                }
                else {
                    sendReply(message, string);
                }
                console.log(json);
            })
            .catch(error => console.error("Fetchエラー:", error));
        return;
    }

    // MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
    //  フリー５
    // MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
    // フリー５
    if ((message.channel.id === "986651450132287549") ||
        (message.channel.id === "1269321397260521576")) {
        if (message.content.match(/!説明/)) {
            let text = "トマトッツォだよ！" + emoji.get('tomato') + "\n" +
                "このチャンネルではイベント戦の出欠を登録できるよ！\n\n" +
                "出欠は「参加」「不参加」「未定」の3つの内のどれかを書き込んでね\n" +
                "なにかコメントも一緒に書き込みたい場合は、\n" +
                "参加　少し遅刻\n" +
                "みたいに間に空白をいれてコメントを書き込むこともできるよ！\n" +
                "VCができる人は「VC」って書くとVC可で登録されるよ！\n" +
                "聞き専に戻りたい時は「聞き専」って書くと聞き専で登録されるよ！\n" +
                "イベント戦にどんどん参加してね" + emoji.get('kissing_heart') + "\n";

            sendMsg(message.channel.id, {
                embeds: [{
                    color: 0xff0000,
                    description: text
                }]
            });
            return;
        }

        console.log("displayName" + message.member.displayName);
        console.log("message.content" + message.content);
        let displayName = encodeURI(message.member.displayName);

        //console.log("displayName" + displayName);
        //console.log("id" + message.member.id);
        var URL = "";
        var channel = message.channel.id;
        switch (channel) {
            case "986651450132287549":    // 日がな
                URL = "https://script.google.com/macros/s/AKfycbyVfDppba8c2Ic8KuzvJg-dxw2aEytkjpUMfP0chqXrQ9BpCQt6/exec?";
                break;

            case "1269321397260521576":  // お試し
                URL = "https://script.google.com/macros/s/AKfycbwnr7ijWsRyeaz7ZZbD4DrbT13gCaC1WwqcFxGTonJ_MuojmB0XPC_4IV7Crg4fyWaQXw/exec?";
                break;

            default:
        }

        URL += "name=" + displayName;
        URL += "?id=" + message.member.id;
        URL += "?comment=" + encodeURI(message.content);

        console.log("URL  " + URL);

        var string = "";
        fetch(URL)
            .then(function (response) {
                return response.json();
            })
            .then(function (json) {
                string = json.data;
                if (message.content === '!アナウンス') {
                    sendMsg(message.channel.id, string);
                }
                else {
                    sendReply(message, string);
                }
                console.log(json);
            })
            .catch(error => console.error("Fetchエラー:", error));
        return;
    }

    // MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
    //  テスト
    // MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
    // テスト
    if (message.channel.id === '986604823518523422') {
        console.log("displayName" + message.member.displayName);
        console.log("message.content" + message.content);
        let displayName = encodeURI(message.member.displayName);

        var URL = "";
        // 日がな一日
        URL = "https://script.google.com/macros/s/AKfycbxg5aYc78hZV_rFqnGisg1Cekjg1Rp5TGr7_4mJJN1Hqp2bXpJ0QkhfMOzXMokQiEQV/exec?";

        URL += "name=" + displayName;
        URL += "?id=" + message.member.id;
        URL += "?comment=" + encodeURI(message.content);

        console.log("URL  " + URL);

        var string = "";
        fetch(URL)
            .then(function (response) {
                return response.json();
            })
            .then(function (json) {
                string = json.data;
                if (message.content === '!アナウンス') {
                    sendMsg(message.channel.id, string);
                }
                else {
                    sendReply(message, string);
                }
                console.log(json);
            })
            .catch(error => console.error("Fetchエラー:", error));
        return;
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
