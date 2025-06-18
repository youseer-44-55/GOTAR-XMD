const config = require('../config')
const { cmd, commands } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson } = require('../lib/functions')

cmd({
    pattern: "منشن-للادمن",
    react: "👑",
    alias: ["منشن-للخرفان"],
    desc: "To Tag all Admins of the Group",
    category: "group",
    use: '.tagadmins [message]',
    filename: __filename
},
async (conn, mek, m, { from, participants, reply, isGroup, senderNumber, groupAdmins, prefix, command, args, body }) => {
    try {
        if (!isGroup) return reply("❌ الأمر ده للجروبات بس يسطا.");

        const botOwner = conn.user.id.split(":")[0];
        const senderJid = senderNumber + "@s.whatsapp.net";

        let groupInfo = await conn.groupMetadata(from).catch(() => null);
        if (!groupInfo) return reply("❌ معرفتش اجيب بيانات الجروب.");

        let groupName = groupInfo.subject || "جروب من الجروبات";
        let admins = await getGroupAdmins(participants);
        let totalAdmins = admins ? admins.length : 0;
        if (totalAdmins === 0) return reply("❌ مفيش ولا أدمن هنا يسطا؟ غريبه والله.");

        // استخراج الرسالة
        let message = body.slice(body.indexOf(command) + command.length).trim();
        if (!message) message = "قوموا يا خراف الإداره، الدنيا ولعت 🔥😂";

        let teks = `
╔═━━━━✪⛥✪━━━━═╗
     👑 *نداء خاص لأدمنز الجروب* 👑
╚═━━━━✪⛥✪━━━━═╝

📛 *الجروب:* ${groupName}
🧠 *عدد العلقات الأدمنز:* ${totalAdmins}
💌 *رسالة عمكم لوسيفر:* 
*${message}*

━━━━━━━━━━━━━━━

🎯 *الأدمنز تحت المقص 🔪:*
`;

        for (let admin of admins) {
            if (!admin) continue;
            teks += `🔺 @${admin.split('@')[0]} ← فوق ياض انت وهو 😒\n`;
        }

        teks += `
━━━━━━━━━━━━━━━
🕶️ *الراعي الرسمي للمنشن:* عمكم لوسيفر 💀
⏰ *الوقت:* ${new Date().toLocaleTimeString('ar-EG')}

⛔ اللي مش هيرد... هنكتب عليه مفقود من الجروب قريبًا 💔🪦
`;

        conn.sendMessage(from, { text: teks, mentions: admins }, { quoted: mek });

    } catch (e) {
        console.error("TagAdmins Error:", e);
        reply(`❌ *حصلت مشكله !!*\n\n${e.message || e}`);
    }
});