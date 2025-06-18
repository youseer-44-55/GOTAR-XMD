const { cmd } = require('../command');
const os = require("os");
const { runtime } = require('../lib/functions');
const config = require('../config');

cmd({
    pattern: "معلومات",
    alias: ["bot", "alive"],
    desc: "Check bot is alive or not",
    category: "main",
    react: "⚡",
    filename: __filename
},
async (conn, mek, m, { from, sender, reply }) => {
    try {
        const status = `
╭───〔 ⎝⎝⛥ 𝐋𝐔𝐂𝐈𝐅𝐄𝐑 ⛥⎠⎠ 〕───◉
│ 🍷 *3MK LUCIFER KEN HNE* 🍷
│
│👨‍💻 *Owner:* ${config.OWNER_NAME}
│⚡ *Version:* 1.0.0
│📝 *Prefix:* [${config.PREFIX}]
│📳 *Mode:* [${config.MODE}]
│💾 *RAM:* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${(os.totalmem() / 1024 / 1024).toFixed(2)}MB
│🖥️ *Host:* ${os.hostname()}
│⌛ *Uptime:* ${runtime(process.uptime())}
╰────────────────────◉
> *✪『𝙇𝙐𝘾𝙄𝙁𝙀𝙍』✪*`;

        await conn.sendMessage(from, {
            image: { url: `https://files.catbox.moe/3qt5au.jpg` },
            caption: status,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 1000,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363400024202153@newsletter',
                    newsletterName: '⎝⎝⛥ 𝐋𝐔𝐂𝐈𝐅𝐄𝐑 ⛥⎠⎠',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (e) {
        console.error("Alive Error:", e);
        reply(` ❌ Error ❌: ${e.message}`);
    }
});
