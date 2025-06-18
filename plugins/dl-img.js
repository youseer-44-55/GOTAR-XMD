const { cmd } = require("../command");
const axios = require("axios");

cmd({
    pattern: "صور", // ترجمة اسم الأمر
    alias: ["image", "googleimage", "searchimg"],
    react: "🦋",
    desc: "دورلي على صور من جوجل وانزلهالك 😂🖼️",
    category: "fun",
    use: ".صوره <كلمة البحث>",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const query = args.join(" ");
        if (!query) {
            return reply("🖼️ اكتبلي حاجه أدوَّرلك عليها يا حلو\nمثال: .صوره قطط كيوت 🐱💖");
        }

        await reply(`🔍 استنى ثواني كده... بجيبلك صور عن "${query}"`);

        const url = `https://apis.davidcyriltech.my.id/googleimage?query=${encodeURIComponent(query)}`;
        const response = await axios.get(url);

        if (!response.data?.success || !response.data.results?.length) {
            return reply("❌ ملقتش ولا صورة للكلمة دي، جرّب حاجه تانية.");
        }

        const results = response.data.results;
        const selectedImages = results
            .sort(() => 0.5 - Math.random())
            .slice(0, 5);

        for (const imageUrl of selectedImages) {
            await conn.sendMessage(
                from,
                { 
                    image: { url: imageUrl },
                    caption: `📸 دي صورة من اللي لقيتها عن: ${query}\n⎝⎝⛥ 𝐋𝐔𝐂𝐈𝐅𝐄𝐑 ⛥⎠⎠`
                },
                { quoted: mek }
            );
            await new Promise(resolve => setTimeout(resolve, 1000));
        }

    } catch (error) {
        console.error('Image Search Error:', error);
        reply(`❌ حصلت مشكلة وأنا بجيب الصور\nالسبب: ${error.message || "مش معروف"}`);
    }
});