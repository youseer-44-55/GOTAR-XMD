const { cmd } = require('../command');

cmd({
  pattern: "جروباتي",
  alias: ["groups", "mygroups"],
  desc: "يعرضلك كل الجروبات اللي البوت فيها واسم كل جروب مع الـ JID (للمطور فقط)",
  react: "📋",
  category: "أوامر المطور",
  filename: __filename,
}, async (conn, mek, m, { isOwner, reply }) => {
  try {
    if (!isOwner) {
      return reply("❌ مش بسمعش غير كلام عمك لوسيفر يلا 🤫🖕🏻");
    }

    let groups = Object.entries(conn.groupMetadata).map(([id, data]) => {
      return `📛 *${data.subject}*\n🆔 \`${id}\``;
    });

    if (!groups.length) {
      return reply("❌ مش داخل أي جروب حاليًا يا كبير 😥");
    }

    let message = `👑 *الجروبات اللي البوت فيها:*\n\n${groups.join("\n\n")}`;
    await reply(message);

  } catch (e) {
    console.error("جروباتي Error:", e);
    reply(`⚠️ حصلت مشكلة:\n${e.message}`);
  }
});