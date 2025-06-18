const { cmd } = require('../command');

cmd({
    pattern: "انطر",
    alias: ["k", "انطر-العرص-دا"],
    desc: "يطرد عضو من الجروب",
    category: "admin",
    react: "🍆",
    filename: __filename
},
async (conn, mek, m, {
    from, q, isGroup, isBotAdmins, isOwner, reply, quoted, senderNumber
}) => {

    // لازم يكون في جروب
    if (!isGroup) return reply("الامر دا للجروبات بس يا رجولة 🙄");

    // بس المطور يقدر يستخدمه
    if (!isOwner) return reply("دا للمطور بس يا علق 😂😏");

    // البوت لازم يكون ادمن
    if (!isBotAdmins) return reply("ارفعني ادمن الأول يا حلو وبعدها اتفرج 😂🤖");

    let number;
    if (m.quoted) {
        number = m.quoted.sender.split("@")[0];
    } else if (q && q.includes("@")) {
        number = q.replace(/[@\s]/g, '');
    } else {
        return reply("رد على رسالة العضو اللي عايز تنطره أو منشنه يا قلب لوسيفر 🖤.");
    }

    const jid = number + "@s.whatsapp.net";

    try {
        await conn.groupParticipantsUpdate(from, [jid], "remove");
        reply(`نطرت العلق برا الجروب بعد ما نطرتهم في ✈️😂 @${number}`, { mentions: [jid] });
    } catch (error) {
        console.error("Remove command error:", error);
        reply("حصلت مشكلة يا نجم، جرب كمان شويه ✋😅");
    }
});