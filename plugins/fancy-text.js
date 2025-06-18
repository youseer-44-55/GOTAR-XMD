const axios = require("axios");
const { cmd } = require("../command");

cmd({
  pattern: "زغرفه",
  alias: ["font", "style"],
  react: "✍️",
  desc: "Convert text into various fonts.",
  category: "tools",
  filename: __filename
}, async (conn, m, store, { from, quoted, args, q, reply }) => {
  try {
    if (!q) {
      return reply(
        `✍️ *عايز تزغرف إيه؟*\n\nجرب تكتب كده:\nزغرفه انا جامد\n\n🎨 خليك مبدع في الكلام يا شاعر 😂`
      );
    }

    const apiUrl = `https://www.dark-yasiya-api.site/other/font?text=${encodeURIComponent(q)}`;
    const response = await axios.get(apiUrl);
    
    if (!response.data.status) {
      return reply("🚫 في حاجه غلط حصلت\nجرب تاني بعد شويه كدا على رواقة 💆‍♂️");
    }

    const fonts = response.data.result
      .map(item => `✨ *${item.name}:*\n${item.result}`)
      .join("\n\n");

    const resultText = 
      `╭━━〔 *زُغْرُفْتِك الجَاهِزَة 🎨* 〕━━⊷\n\n` +
      `${fonts}\n\n` +
      `╰━━━━━━━━━━━━━━━⊷\n` +
      `🔤 *اختار الزغرفة اللي عاجبك وانسخها يا فنان ✨💬*\n\n` +
      `⎝⎝⛥ 𝐋𝐔𝐂𝐈𝐅𝐄𝐑 ⛥⎠⎠`;

    await conn.sendMessage(from, { text: resultText }, { quoted: m });

  } catch (error) {
    console.error("❌ Error in fancy command:", error);
    reply("💥 الدنيا ضربت معايا 😅، جرب بعدين كده.");
  }
});