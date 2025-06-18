const { cmd } = require('../command');
const axios = require('axios');

cmd({
  pattern: "قناة",
  alias: ["تجسس", "قناه", "تجسس_يوتيوب", "ytstalk"],
  desc: "📺 تجسس على قناة يوتيوب واعرف معلوماتها",
  react: "🕵️",
  category: "search",
  filename: __filename
}, async (conn, m, store, { from, quoted, q, reply }) => {
  try {
    if (!q) {
      return reply("👀 اكتب اسم القناة يا نجم، مثال:\n*جسس AhmedSparta*");
    }

    await conn.sendMessage(from, {
      react: { text: "🔍", key: m.key }
    });

    const apiUrl = `https://delirius-apiofc.vercel.app/tools/ytstalk?channel=${encodeURIComponent(q)}`;
    const { data } = await axios.get(apiUrl);

    if (!data || !data.status || !data.data) {
      return reply("💢 مش لاقي القناة! إتأكد من الاسم يا نجم.");
    }

    const yt = data.data;
    const caption = `📺 *جسسنا على قناة يوتيوب وهما مش واخدين بالهم 😂*

👤 *الاسم:* ${yt.username}
👥 *عدد المتابعين:* ${yt.subscriber_count}
🎞️ *عدد الفيديوهات:* ${yt.video_count}
🔗 *الرابط:* ${yt.channel}

🧠 *التحريات خلصت، خد عندك يا كبير 💀*

> ✪『𝙇𝙐𝘾𝙄𝙁𝙀𝙍』✪-YOUTUBE STALK`;

    await conn.sendMessage(from, {
      image: { url: yt.avatar },
      caption: caption
    }, { quoted: m });

  } catch (error) {
    console.error("Error:", error);
    reply("😓 الدنيا وقفت! حصلت مشكله وانا بتجسس، جرب تاني بعد شويه.");
  }
});