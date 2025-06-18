const { cmd } = require('../command');
const axios = require('axios');

cmd({
    pattern: "تحميل-تيك-توك", // ← اسم الأمر مترجم
    alias: ["تيك-توك", "tk", "tiktokdl"],
    desc: "تحميل فيديوهات التيك توك بدون العلامة المائية",
    category: "downloader",
    react: "🎵",
    filename: __filename
},
async (conn, mek, m, { from, args, q, reply }) => {
    try {
        if (!q) return reply("✋ يابا ابعت لينك تيك توك!");
        if (!q.includes("tiktok.com")) return reply("❌ ده مش لينك تيك توك يسطا");

        reply("⏳ استنى بس عمك لوسيفر بيحمل الفيديو...");

        const apiUrl = `https://delirius-apiofc.vercel.app/download/tiktok?url=${q}`;
        const { data } = await axios.get(apiUrl);

        if (!data.status || !data.data) return reply("⚠️ فشل في جلب الفيديو من تيك توك.");

        const { title, like, comment, share, author, meta } = data.data;
        const videoUrl = meta.media.find(v => v.type === "video").org;

        const caption = `╭━━•⛧•𝐓𝐈𝐊𝐓𝐎𝐊 𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃•⛧•━━╮

👤 *الاسم:* ${author.nickname}
📛 *اليوزر:* @${author.username}
🎞️ *العنوان:* ${title || "مش موجود ✖️"}

👍 *لايكات:* ${like}
💬 *تعليقات:* ${comment}
🔁 *شـيـرات:* ${share}

╰━━•⛧•𝐏𝐎𝐖𝐄𝐑𝐄𝐃 𝐁𝐘•⛧•━━╯
⎝⎝⛥ 𝐋𝐔𝐂𝐈𝐅𝐄𝐑 ⛥⎠⎠ - اقوى بوت ف المجرة 🌌🔥`;

        await conn.sendMessage(from, {
            video: { url: videoUrl },
            caption: caption,
            contextInfo: { mentionedJid: [m.sender] }
        }, { quoted: mek });

    } catch (e) {
        console.error("Error in TikTok downloader command:", e);
        reply(`💥 حصلت مشكلة: ${e.message}`);
    }
});