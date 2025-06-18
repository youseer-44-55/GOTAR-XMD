const { cmd } = require('../command');

cmd({
    pattern: "طرد-مشرف",
    alias: ["d", "طرد-كلب", "انطر-ادمن"],
    desc: "ينزل أي مشرف في الجروب ويخليه عضو عادي",
    category: "admin",
    react: "⬇️",
    filename: __filename
},
async(conn, mek, m, {
    from, quoted, q, isGroup, sender, botNumber, isOwner, groupMetadata, participants, isBotAdmins, isAdmins, reply
}) => {

    if (!isGroup) return reply("الـأمر ده للجروبات بس يا قلبي 💔.");

    if (!isAdmins) return reply("انت مش أدمن يا حب 🤫.");

    if (!isBotAdmins) return reply("ارفعني أدمن الأول وبعدين نتكلم 🤔.");

    let number;
    if (m.quoted) {
        number = m.quoted.sender.split("@")[0];
    } else if (q && q.includes("@")) {
        number = q.replace(/[@\s]/g, '');
    } else {
        return reply("رد على رسالة أو منشن المشرف اللي عايز تنزله 🙄.");
    }

    if (number === botNumber) return reply("هو انا هنزل عيب يا حب 😒.");

    const jid = number + "@s.whatsapp.net";

    try {
        await conn.groupParticipantsUpdate(from, [jid], "demote");
        reply(`نزلته من فوق لتحت 😂 @${number}`, { mentions: [jid] });
    } catch (error) {
        console.error("Demote error:", error);
        reply("في حاجه باظت، جرب تاني بعدين 🙃.");
    }
});