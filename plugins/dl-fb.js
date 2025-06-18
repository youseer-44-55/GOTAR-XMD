const axios = require("axios");
const { cmd } = require("../command");

cmd({
  pattern: "تحميل-فيسبوك",
  alias: ["fb", "فب", "فيس"],
  desc: "📥 تحميل فيديوهات من فيسبوك",
  category: "التنزيل",
  filename: __filename,
  use: "<رابط فيسبوك>",
}, async (conn, m, store, { from, args, q, reply }) => {
  try {
    if (!q || !q.startsWith("http")) {
      return reply("❌ لازم تبعتلي رابط فيسبوك صحيح يا نجم ✋\n\n🔗 مثال: .فيسبوك https://www.facebook.com/...");
    }

    await conn.sendMessage(from, { react: { text: '📥', key: m.key } });

    const apiUrl = `https://www.velyn.biz.id/api/downloader/facebookdl?url=${encodeURIComponent(q)}`;
    const res = await axios.get(apiUrl);

    if (!res.data || res.data.status !== true || !res.data.data || !res.data.data.url) {
      return reply("🚫 معرفتش أجيب الفيديو يا معلم.. جرب رابط تاني.");
    }

    const videoUrl = res.data.data.url;

    await conn.sendMessage(from, {
      video: { url: videoUrl },
      caption: "📥 *الفيديو اتحمل بنجاح من فيسبوك!*\n\n✪『𝐋𝐔𝐂𝐈𝐅𝐄𝐑』✪ ✅",
    }, { quoted: m });

  } catch (error) {
    console.error("Facebook download error:", error?.response?.data || error.message);
    reply("❌ حصلت مشكلة وأنا بجيب الفيديو.. جرب تبعتلي رابط غيره أو استنى شوية.");
  }
});