const config = require('../config');
const { cmd } = require('../command');
const { sleep } = require('../lib/functions');

cmd({
    pattern: "اقفل",
    alias: ["اقفل_الجروب", "قفله"],
    react: "🔒",
    desc: "يخلي الجروب للإعلانات فقط (الأعضاء ميبعتوش).",
    category: "group",
    filename: __filename
},           
async (conn, mek, m, { from, isGroup, isAdmins, isBotAdmins, reply }) => {
    try {
        if (!isGroup) return reply("❌ الأمر ده للجروبات بس يا معلم.");
        if (!isAdmins) return reply("❌ انت مش أدمن، متحاولش يا بابا 🤫.");
        if (!isBotAdmins) return reply("❌ ارفعني أدمن الأول علشان أقفل الجروب 💀.");

        await conn.groupSettingUpdate(from, 'announcement');
        reply("🔒 الجروب اتقفل... يلا كله يخرس ✋😂");
    } catch (e) {
        console.error("Error locking group:", e);
        reply("❌ حصلت مشكلة وانا بقفل الجروب، جرب تاني.");
    }
});