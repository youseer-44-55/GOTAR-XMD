const config = require('../config')
const { cmd, commands } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson } = require('../lib/functions')

cmd({
    pattern: "منشن",
    react: "📢",
    alias: ["يجودعان", "يرنجاله"],
    desc: "منشن لكل أعضاء الجروب بصيغة شيك وفخامه",
    category: "group",
    use: '.منشن [رسالة]',
    filename: __filename
},
async (conn, mek, m, { from, participants, reply, isGroup, senderNumber, groupAdmins, prefix, command, args, body }) => {
    try {
        if (!isGroup) return reply("❌ مش ينفع تستعمل الأمر ده غير في الجروبات يا معلم.");

        const botOwner = conn.user.id.split(":")[0];
        const senderJid = senderNumber + "@s.whatsapp.net";

        if (!groupAdmins.includes(senderJid) && senderNumber !== botOwner) {
            return reply("🛑 مش هسمعلك، انت مش من عيلة لوسيفر يا وله 🤫");
        }

        let groupInfo = await conn.groupMetadata(from).catch(() => null);
        if (!groupInfo) return reply("⚠️ معرفتش أجيب بيانات الجروب.");

        let groupName = groupInfo.subject || "جروب";
        let totalMembers = participants ? participants.length : 0;
        if (totalMembers === 0) return reply("❌ مفيش أعضاء يا أسطورة؟");

        let message = body.slice(body.indexOf(command) + command.length).trim();
        if (!message) message = "الكل يرد على عمكم لوسيفر 💀🔥";

        let emojis = ['🔥','👊','⚡','💥','🧨','💀','👻','😈','🖕','🤘','🥵','🤯','🪓','⚔️','🎯','📢','🚨','💣','👁️‍🗨️','🕶️','🪬','💸','🩸','🎃'];
        let randomEmoji = () => emojis[Math.floor(Math.random() * emojis.length)];

        let teks = `╭───⟪ 👑 *منشن جماعي* 👑 ⟫───╮\n`;
        teks += `│\n`;
        teks += `│📛 *الجروب:* ${groupName}\n`;
        teks += `│👥 *عدد الأعضاء:* ${totalMembers}\n`;
        teks += `│💬 *الرسالة:* ${message}\n`;
        teks += `│\n`;
        teks += `├── ⟪ 🙋‍♂️ *الأعضاء* ⟫ ──┤\n`;

        for (let mem of participants) {
            if (!mem.id) continue;
            teks += `│${randomEmoji()} @${mem.id.split('@')[0]}\n`;
        }

        teks += `╰───⟪ 🖤 عمكم لوسيفر بيقول ردوا 🖤 ⟫───╯`;

        conn.sendMessage(from, { text: teks, mentions: participants.map(a => a.id) }, { quoted: mek });

    } catch (e) {
        console.error("TagAll Error:", e);
        reply(`❌ حصلت مشكله:\n${e.message || e}`);
    }
});