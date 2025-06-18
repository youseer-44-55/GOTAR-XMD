const config = require('../config')
const { cmd, commands } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson } = require('../lib/functions')

cmd({
    pattern: "منشن-جماعي",
    react: "🔊",
    alias: ["سمع-منك-لي"],
    desc: "To Tag all Members",
    category: "group",
    use: '.tagall [message]',
    filename: __filename
},
async (conn, mek, m, { from, participants, reply, isGroup, senderNumber, groupAdmins, prefix, command, args, body }) => {
    try {
        if (!isGroup) return reply("❌ الأمر ده للجروبات بس يا نجم.");

        const botOwner = conn.user.id.split(":")[0];
        const senderJid = senderNumber + "@s.whatsapp.net";

        if (!groupAdmins.includes(senderJid) && senderNumber !== botOwner) {
            return reply("👀 مش بسمع غير كلام عمك لوسيفر والمساعدين بس يا حلو.");
        }

        let groupInfo = await conn.groupMetadata(from).catch(() => null);
        if (!groupInfo) return reply("❌ معرفتش اجيب بيانات الجروب يا معلم.");

        let groupName = groupInfo.subject || "جروب جامد";
        let totalMembers = participants.length;
        if (totalMembers === 0) return reply("❌ مفيش أعضاء في الجروب ده! هو انت لوحدك؟ 😂");

        // الرسالة المكتوبة
        let message = body.slice(body.indexOf(command) + command.length).trim();
        if (!message) message = "قوموا فوق ياض انت وهو، عمكم لوسيفر بينادي 😂🔥";

        let teks = `
╔═━━━✪⛥✪━━━═╗
     📣 *منشن عام لكل أهل الجروب* 📣
╚═━━━✪⛥✪━━━═╝

🏷️ *الجروب:* ${groupName}
👥 *عدد الأعضاء:* ${totalMembers}
🗣️ *رسالة من لوسيفر:* 
*${message}*

━━━━━━━━━━━━━━━
📛 *اللي اتمنشنوا دلوقتي:*
`;

        for (let mem of participants) {
            if (!mem.id) continue;
            teks += `🔊 @${mem.id.split('@')[0]} ← فوق يسطاا 😴🔥\n`;
        }

        teks += `
━━━━━━━━━━━━━━━
😈 *عمكم لوسيفر بيبلغكم:*
اللي مش هيرد هيتخصم عليه في الغياب 👀💔
`;

        conn.sendMessage(from, { text: teks, mentions: participants.map(a => a.id) }, { quoted: mek });

    } catch (e) {
        console.error("TagAll Error:", e);
        reply(`❌ *حصلت مشكله !!*\n\n${e.message || e}`);
    }
});