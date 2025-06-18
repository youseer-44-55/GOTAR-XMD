const config = require('../config')
const { cmd, commands } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')

cmd({
    pattern: "غير-اسم-الجروب",
    alias: ["اسم-الجروب", "renamegroup", "gname"],
    react: "📝",
    desc: "يغير اسم الجروب",
    category: "group",
    filename: __filename
},
async (conn, mek, m, { from, isGroup, isAdmins, isBotAdmins, q, reply }) => {
    try {
        if (!isGroup) return reply("🏠 الأمر ده شغال في الجروبات بس يا قلبي ❤️.");

        if (!isAdmins) return reply("😏 مين سمحلك؟ لازم تكون أدمن الأول.");

        if (!isBotAdmins) return reply("🤖 ارفعني أدمن عشان أقدر أغير اسم الجروب.");

        if (!q) return reply("✏️ اكتبلي الاسم الجديد يا عبقري.");

        await conn.groupUpdateSubject(from, q);
        reply(`✅ تم تغيير اسم الجروب إلى: *${q}*`);
    } catch (e) {
        console.error("Error updating group name:", e);
        reply("❌ حصلت مشكلة وأنا بغير الاسم، جرب تاني بعدين.");
    }
});