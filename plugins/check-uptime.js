const { cmd } = require('../command');
const { runtime } = require('../lib/functions');
const config = require('../config');

cmd({
    pattern: "وقت-التشغيل",
    alias: ["وقت", "up", "uptime"],
    desc: "يعرض مدة تشغيل البوت",
    category: "main",
    react: "⏱️",
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {
        const uptime = runtime(process.uptime());
        const startTime = new Date(Date.now() - process.uptime() * 1000);

        const style = `╭━━〔 *⎝⎝⛥ 𝐋𝐔𝐂𝐈𝐅𝐄𝐑 ⛥⎠⎠* 〕━┈⊷
┃ 🧠 شغال بقالي: ${uptime}
┃ 📅 من وقت: ${startTime.toLocaleString()}
┃ 🧞‍♂️ البوت دا معمول علشانك يا معلم 😎
╰──────────────────────┈⊷

> *✪『𝙇𝙐𝘾𝙄𝙁𝙀𝙍』✪*`;

        await conn.sendMessage(from, {
            text: style,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363400024202153@newsletter',
                    newsletterName: config.OWNER_NAME || '⎝⎝⛥ 𝐋𝐔𝐂𝐈𝐅𝐄𝐑 ⛥⎠⎠',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (e) {
        console.error("Uptime Error:", e);
        reply(`❌ حصلت مشكلة يا كبير:\n${e.message}`);
    }
});