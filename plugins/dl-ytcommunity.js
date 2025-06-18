const { cmd } = require('../command');
const axios = require('axios');

cmd({
    pattern: "منشور_يوتيوب", // ← اسم الأمر مترجم
    alias: ["ytpost", "ytcommunity", "ytc"],
    desc: "تحميل منشور من مجتمع يوتيوب",
    category: "downloader",
    react: "🎥",
    filename: __filename
},
async (conn, mek, m, { from, args, q, reply, react }) => {
    try {
        if (!q) return reply("✋ ابعت لينك منشور يوتيوب!\nمثال: .منشور_يوتيوب <الرابط>");

        const apiUrl = `https://api.siputzx.my.id/api/d/ytpost?url=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl);

        if (!data.status || !data.data) {
            await react("❌");
            return reply("❌ فشل في جلب المنشور.\nراجع اللينك يا زعيم.");
        }

        const post = data.data;

        let caption = `╭━━•⛧•𝐘𝐎𝐔𝐓𝐔𝐁𝐄 𝐏𝐎𝐒𝐓•⛧•━━╮

📢 *منشور مجتمع اليوتيوب:*
📝 *المحتوى:* ${post.content}

╰━━•⛧•𝐏𝐎𝐖𝐄𝐑𝐄𝐃 𝐁𝐘•⛧•━━╯

⎝⎝⛥ 𝐋𝐔𝐂𝐈𝐅𝐄𝐑 ⛥⎠⎠`;

        if (post.images && post.images.length > 0) {
            for (const img of post.images) {
                await conn.sendMessage(from, { image: { url: img }, caption }, { quoted: mek });
                caption = ""; // أول صورة بس اللي تاخد الكابشن
            }
        } else {
            await conn.sendMessage(from, { text: caption }, { quoted: mek });
        }

        await react("✅");
    } catch (e) {
        console.error("Error in ytpost command:", e);
        await react("❌");
        reply("💥 حصلت مشكلة يا معلم.\nحاول تاني بعد شوية.");
    }
});