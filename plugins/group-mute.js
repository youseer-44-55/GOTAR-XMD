const config = require('../config')
const { cmd } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson } = require('../lib/functions')

cmd({
    pattern: "سكوت",
    alias: ["groupmute", "group-close", "اقفل"],
    react: "🔇",
    desc: "يقفل الجروب (بس الادمن يقدر يرسل).",
    category: "group",
    filename: __filename
},
async (conn, mek, m, {
    from, isGroup, isAdmins, isBotAdmins, reply
}) => {
    try {
        if (!isGroup) return reply("❌ الامر دا شغال في الجروبات بس يا معلم❌");

        if (!isAdmins) return reply("❌ مش مسموحلك، دا للادمن بس يا نجم ❌");

        if (!isBotAdmins) return reply("❌ ارفعني ادمن الأول عشان اقدر اقفل الجروب ❌");

        await conn.groupSettingUpdate(from, "announcement");

        reply("الجروب اتقفل والكلام بقاا لعمكم لوسيفر 🤫🥂");

    } catch (e) {
        console.error("Mute Error:", e);
        reply("❌ حصلت مشكلة وانا بقفل الجروب، جرب تاني.");
    }
});