const config = require('../config');
const { cmd } = require('../command');

cmd({
  pattern: "تحديث_الوصف",
  alias: ["وصف", "غير_الوصف"],
  react: "📜",
  desc: "يغير وصف الجروب.",
  category: "group",
  filename: __filename
},
async (conn, mek, m, { from, isGroup, isAdmins, isBotAdmins, args, q, reply }) => {
  try {
    if (!isGroup) return reply("❌ الأوامر دي للجروبات بس يا عسل!");
    if (!isAdmins) return reply("❌ انت مش أدمن يعني مش من حقك تتكلم ✋");
    if (!isBotAdmins) return reply("❌ خليك فاكر إني لازم أكون أدمن يا اهبل!");
    if (!q) return reply("❌ طب فين الوصف الجديد؟ اكتبه بقا يسطا");

    await conn.groupUpdateDescription(from, q);
    reply("✅ الوصف الجديد اتحط خلاص يا معلم ✍️");
  } catch (e) {
    console.error("Error updating group description:", e);
    reply("❌ حصلت مشكلة وأنا بغير الوصف.. جرب تاني.");
  }
});