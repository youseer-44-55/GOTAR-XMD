const { cmd } = require('../command');
const config = require('../config');

cmd({
    pattern: "دخلو",
    alias: ["a", "ارمي-في-الخرابه"],
    desc: "Adds a member to the group",
    category: "group",
    react: "➕",
    filename: __filename
},
async (conn, mek, m, {
    from, q, isGroup, isBotAdmins, reply, quoted, isOwner
}) => {
    if (!isGroup) return reply("في الجروب بس يا عسل 😐.");

    if (!isOwner) return reply("للمطور بس يا علق 😏👍🏻.");

    if (!isBotAdmins) return reply("هو ينفع أدخل حد وأنا مش أدمن؟ بالعقل يعني 🙂.");

    let number;
    if (quoted) {
        number = quoted.sender.split("@")[0];
    } else if (q && q.includes("@")) {
        number = q.replace(/[@\s+]/g, '');
    } else if (q && /^\d+$/.test(q)) {
        number = q;
    } else {
        return reply("اكتب رقم اللي هيدخلو، يا كسلان 🙂.");
    }

    const jid = number + "@s.whatsapp.net";

    try {
        await conn.groupParticipantsUpdate(from, [jid], "add");
        return reply(`دخل جهنم بنجاح 👍🏻😂 @${number}`, { mentions: [jid] });
    } catch (error) {
        console.error("Add command error:", error);
        return reply("في مشكلة لما جيت أدخله... يمكن قافل الخصوصية ولا حاجة 🤔.");
    }
});