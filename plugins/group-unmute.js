const config = require('../config');
const { cmd, commands } = require('../command');
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson } = require('../lib/functions');

cmd({
  pattern: "فتح",
  alias: ["فتح-الجروب", "group-open"],
  react: "🔓",
  desc: "لفتح الجروب والسماح للجميع بالكلام",
  category: "group",
  filename: __filename
},
async (conn, mek, m, { from, isGroup, senderNumber, isAdmins, isBotAdmins, reply }) => {
  try {
    if (!isGroup) return reply("❌ الأوامر دي بتشتغل في الجروبات بس يا عسل 💬.");
    if (!isAdmins) return reply("🤨 مين السماحلك؟ الأمر ده للكبار المشرفين بس يا متناك 😂👊🏻.");
    if (!isBotAdmins) return reply("😒 خليني أدمن الأول يا نجم عشان أقدر أفتح الجروب.");

    await conn.groupSettingUpdate(from, "not_announcement");

    reply("🔓 تم فـتح الجروب رسميًا 🎉\nالكل يفضى نفسه بقا ويقول اللي في قلبه 😂💣\n\nعمكم لوسيفر سمح بالكلام دلوقتي 🖤💀");
  } catch (e) {
    console.error("غلطه وانا بفتح الجروب:", e);
    reply("❌ في حاجه نطتلي وأنا بفتح الجروب 😤\nجرّب تاني يا كينج.");
  }
});