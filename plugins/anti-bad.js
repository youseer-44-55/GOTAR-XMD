const { cmd } = require('../command');
const config = require("../config");

// نظام منع الألفاظ الوحشة 🛑
cmd({
  'on': "body"
}, async (conn, m, store, {
  from,
  body,
  isGroup,
  isAdmins,
  isBotAdmins,
  reply,
  sender
}) => {
  try {
    const badWords = [
      "wtf", "mia", "xxx", "fuck", "sex",
      "huththa", "pakaya", "ponnaya", "hutto",
      "كس", "زب", "نيك", "متناك", "طيز", "خول", "عرص", "قحبة", "يلعن"
    ];

    if (!isGroup || isAdmins || !isBotAdmins) return;

    const messageText = body.toLowerCase();
    const containsBadWord = badWords.some(word => messageText.includes(word));

    if (containsBadWord && config.ANTI_BAD_WORD === "true") {
      // امسح الرسالة بسرعة
      await conn.sendMessage(from, { delete: m.key });

      // ابعتله تحذير بصيغة مصرية شعبية
      await conn.sendMessage(from, {
        text:
`🚫 *تحذيـــــر يا زعيم* 🚫

╭───✧───────╮
├👤 *العضو:* @${sender.split('@')[0]}
├📛 *السبب:* ألفاظ مش محترمة 👊
╰───✧───────╯

🧼 خلي لسانك نضيف يا نجم.. مش هنسمح بقلة الأدب هنا 😒`,
        mentions: [sender]
      });
    }
  } catch (error) {
    console.error(error);
    reply("حصلت مشكلة وإحنا بنشوف الألفاظ، جرب تاني 😅");
  }
});