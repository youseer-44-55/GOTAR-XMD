const axios = require("axios");
const { cmd, commands } = require("../command");

cmd({
    pattern: "نغمه", // اسم الأمر مترجم
    alias: ["ringtones", "ring"],
    desc: "هاتلك نغمة رنة كده جامدة 🔊",
    react: "🎵",
    category: "fun",
    filename: __filename,
},
async (conn, mek, m, { from, reply, args }) => {
    try {
        const query = args.join(" ");
        if (!query) {
            return reply("🎶 اكتبلي اسم نغمة أدورلك عليها يا نجم 💬\nمثال: .نغمه Suna");
        }

        const { data } = await axios.get(`https://www.dark-yasiya-api.site/download/ringtone?text=${encodeURIComponent(query)}`);

        if (!data.status || !data.result || data.result.length === 0) {
            return reply("❌ ملقتش ولا نغمة بالاسم ده.. جرّب حاجه تانية يسطا 🎧");
        }

        const randomRingtone = data.result[Math.floor(Math.random() * data.result.length)];

        await conn.sendMessage(
            from,
            {
                audio: { url: randomRingtone.dl_link },
                mimetype: "audio/mpeg",
                fileName: `${randomRingtone.title}.mp3`,
                caption: "⎝⎝⛥ 𝐋𝐔𝐂𝐈𝐅𝐄𝐑 ⛥⎠⎠"
            },
            { quoted: m }
        );
    } catch (error) {
        console.error("Error in ringtone command:", error);
        reply("❌ في حاجة حصلت وأنا بجبلك النغمة.. جرّب تاني بعد شوية.");
    }
});