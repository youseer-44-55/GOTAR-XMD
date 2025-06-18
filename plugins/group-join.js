const config = require('../config')
const { cmd, commands } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson } = require('../lib/functions')

cmd({
    pattern: "خش",
    react: "📬",
    alias: ["انضم", "ادخل-جروب", "joinme", "f_join"],
    desc: "يخلي البوت ينضم لجروب برابط دعوة",
    category: "group",
    use: '.انضم <رابط الجروب>',
    filename: __filename
}, async (conn, mek, m, { from, q, quoted, isOwner, reply }) => {
    try {
        if (!isOwner) return reply("❌ الأمر دا للمالك بس يا عسل 😌");

        let groupLink;
        if (quoted && quoted.type === 'conversation' && isUrl(quoted.text)) {
            groupLink = quoted.text.split('https://chat.whatsapp.com/')[1];
        } else if (q && isUrl(q)) {
            groupLink = q.split('https://chat.whatsapp.com/')[1];
        }

        if (!groupLink || groupLink.length !== 22) {
            return reply("❌ شكل الرابط غلط يا نجم، راجعه كده 🙃");
        }

        reply(`⏳ جاري الانضمام للجروب باستخدام الكود: *${groupLink}*`);
        await conn.groupAcceptInvite(groupLink);
        reply(`✅ دخلت الجروب بنجاح يا معلم 😎✌️`);

    } catch (e) {
        console.error("Join Error:", e);
        if (e.message && e.message.includes('not-authorized')) {
            reply(`❌ *مش قادر أدخل الجروب 😥*

📌 *السبب المحتمل:*
- حساب البوت محظور أو واخد بلوك
- الجلسة خلصت أو خرجت
- الرابط بايظ أو منتهي

🛠️ *الحل:*
- جرب رقم تاني
- تأكد إن الرابط لسه شغال
- عيد تشغيل البوت أو اعمل جلسة جديدة`);
        } else {
            reply(`❌ *حصل خطأ غير متوقع:*\n\n${e.message || e}`);
        }
    }
});