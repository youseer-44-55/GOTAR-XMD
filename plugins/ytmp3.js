const config = require('../config');
const { cmd } = require('../command');
const DY_SCRAP = require('@dark-yasiya/scrap');
const dy_scrap = new DY_SCRAP();

function replaceYouTubeID(url) {
    const regex = /(?:youtube\.com\/(?:.*v=|.*\/)|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

cmd({
    pattern: "اغنيه",
    alias: ["sond", "ytmp3"],
    react: "🎵",
    desc: "Download Ytmp3",
    category: "download",
    use: ".اغنيه <اسم أو لينك>",
    filename: __filename
}, async (conn, m, mek, { from, q, reply }) => {
    try {
        if (!q) return await reply("استخدم الامر كده:\n\nاغنيه عمرو دياب - تملي معاك\n\nوهرد عليك بـ (1.1 للاغنيه) أو (1.2 للملف الصوتي) ❤️");

        let id = q.startsWith("https://") ? replaceYouTubeID(q) : null;
        let videoData;

        if (!id) {
            const searchResults = await dy_scrap.ytsearch(q);
            if (!searchResults?.results?.length) return await reply("❌ مفيش نتائج يا نجم!");
            videoData = searchResults.results[0];
            id = videoData.videoId;
        } else {
            const searchResults = await dy_scrap.ytsearch(`https://youtube.com/watch?v=${id}`);
            if (!searchResults?.results?.length) return await reply("❌ معرفتش أجيب بيانات الفيديو!");
            videoData = searchResults.results[0];
        }

        const preloadedAudio = dy_scrap.ytmp3(`https://youtube.com/watch?v=${id}`);
        const { url, title, image, timestamp, ago, views, author } = videoData;

        let info = `╭── 🍃 *معلومات الأغنية* 🍃
│
├ 🎶 *الاسم:* ${title}
├ 🕓 *المده:* ${timestamp || "غير متوفرة"}
├ 👀 *عدد المشاهدات:* ${views}
├ 📆 *من امتى:* ${ago}
├ 🎤 *المطرب:* ${author?.name}
├ 🔗 *رابط الفيديو:* ${url}
│
╰───◇◆◇───

╭── 🔽 *اختار نوع التحميل* 🔽
│
├ 1.1 🎵 *صوت عادي* (تشغيل مباشر)
├ 1.2 📁 *ملف صوتي* (ينفع تبعته لأي حد)
│
╰── ✍️ *رد على الرسالة بالرقم المناسب* 

> ${config.FOOTER || "✪『𝐋𝐔𝐂𝐈𝐅𝐄𝐑』✪"}`;

        const sentMsg = await conn.sendMessage(from, { image: { url: image }, caption: info }, { quoted: mek });
        const messageID = sentMsg.key.id;
        await conn.sendMessage(from, { react: { text: '🎶', key: sentMsg.key } });

        const listener = async (messageUpdate) => {
            try {
                const mekInfo = messageUpdate?.messages[0];
                if (!mekInfo?.message) return;

                const messageType = mekInfo?.message?.conversation || mekInfo?.message?.extendedTextMessage?.text;
                const isReplyToSentMsg = mekInfo?.message?.extendedTextMessage?.contextInfo?.stanzaId === messageID;

                if (!isReplyToSentMsg) return;

                conn.ev.off('messages.upsert', listener); // وقف الاستماع بعد أول رد

                let userReply = messageType.trim();
                let msg;
                let type;
                let response = await preloadedAudio;

                const downloadUrl = response?.result?.download?.url;
                if (!downloadUrl) return await reply("❌ معرفتش أوصل لرابط التحميل!");

                if (userReply === "1.1") {
                    msg = await conn.sendMessage(from, { text: "⏳ جاري تجهيز الصوت..." }, { quoted: mek });
                    type = { audio: { url: downloadUrl }, mimetype: "audio/mpeg" };
                } else if (userReply === "1.2") {
                    msg = await conn.sendMessage(from, { text: "⏳ جاري تجهيز الملف..." }, { quoted: mek });
                    type = {
                        document: { url: downloadUrl },
                        fileName: `${title}.mp3`,
                        mimetype: "audio/mpeg",
                        caption: title
                    };
                } else {
                    return await reply("❌ الاختيار غلط! اختار 1.1 أو 1.2 يا نجم.");
                }

                await conn.sendMessage(from, type, { quoted: mek });
                await conn.sendMessage(from, { text: '✅ التحميل تمام ياباشا ✅', edit: msg.key });

            } catch (error) {
                console.error(error);
                await reply(`❌ حصل خطأ:\n${error.message || "خطأ غير معروف!"}`);
            }
        };

        conn.ev.on('messages.upsert', listener);

    } catch (error) {
        console.error(error);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
        await reply(`❌ حصلت مشكله:\n${error.message || "خطأ غير معروف!"}`);
    }
});