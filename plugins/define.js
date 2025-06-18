const axios = require('axios');
const { cmd } = require('../command');

cmd({
    pattern: "معني",
    desc: "📖 هات معنى كلمة إنجليزي",
    react: "🔍",
    category: "بحث",
    filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return reply("❓ *اكتب الكلمة الي عايز تعرف معناها.*\n\n📌 الاستخدام: .عرف [كلمة]");

        const word = q.trim().toLowerCase();
        const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
        const { data } = await axios.get(url);

        const entry = data[0];
        const phonetics = entry.phonetics?.[0]?.text || '🔇 مش لاقي النطق';
        const audio = entry.phonetics?.[0]?.audio;

        let message = `📖 *الكلمة:* ${entry.word}\n🗣️ *النطق:* _${phonetics}_\n`;

        entry.meanings.slice(0, 2).forEach((meaning, i) => {
            const def = meaning.definitions[0];
            message += `\n📚 *المعنى ${i + 1}:* ${def.definition}`;
            if (def.example) message += `\n✍️ *مثال:* ${def.example}`;
            if (def.synonyms && def.synonyms.length)
                message += `\n📝 *مرادفات:* ${def.synonyms.slice(0, 5).join(", ")}`;
            message += "\n";
        });

        message += `\n> 🌐 *المصدر: dictionaryapi.dev*`;

        if (audio) {
            await conn.sendMessage(from, { audio: { url: audio }, mimetype: 'audio/mpeg' }, { quoted: mek });
        }

        return reply(message);
    } catch (e) {
        console.error("❌ Error:", e.message);
        if (e.response && e.response.status === 404) {
            return reply("🚫 *الكلمة مش موجودة في القاموس.* جرب تكتبها صح.");
        }
        return reply("⚠️ *حصلت مشكلة أثناء جلب المعنى.* حاول تاني.");
    }
});