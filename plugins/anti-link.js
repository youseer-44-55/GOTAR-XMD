const { cmd } = require('../command');
const config = require("../config");

cmd({
  'on': "body"
}, async (conn, m, store, {
  from,
  body,
  sender,
  isGroup,
  isAdmins,
  isBotAdmins,
  reply
}) => {
  try {
    if (!global.warnings) global.warnings = {};

    if (!isGroup || isAdmins || !isBotAdmins) return;

    const linkPatterns = [
      /https?:\/\/(?:chat\.whatsapp\.com|wa\.me)\/\S+/gi,
      /https?:\/\/(?:api\.whatsapp\.com|wa\.me)\/\S+/gi,
      /wa\.me\/\S+/gi,
      /https?:\/\/(?:t\.me|telegram\.me)\/\S+/gi,
      /https?:\/\/(?:www\.)?\.com\/\S+/gi,
      /https?:\/\/(?:www\.)?twitter\.com\/\S+/gi,
      /https?:\/\/(?:www\.)?linkedin\.com\/\S+/gi,
      /https?:\/\/(?:whatsapp\.com|channel\.me)\/\S+/gi,
      /https?:\/\/(?:www\.)?reddit\.com\/\S+/gi,
      /https?:\/\/(?:www\.)?discord\.com\/\S+/gi,
      /https?:\/\/(?:www\.)?twitch\.tv\/\S+/gi,
      /https?:\/\/(?:www\.)?vimeo\.com\/\S+/gi,
      /https?:\/\/(?:www\.)?dailymotion\.com\/\S+/gi,
      /https?:\/\/(?:www\.)?medium\.com\/\S+/gi
    ];

    const containsLink = linkPatterns.some(pattern => pattern.test(body));

    if (containsLink && config.ANTI_LINK === 'true') {
      console.log(`Link detected from ${sender}: ${body}`);

      try {
        await conn.sendMessage(from, {
          delete: m.key
        });
        console.log(`Message deleted: ${m.key.id}`);
      } catch (error) {
        console.error("Failed to delete message:", error);
      }

      global.warnings[sender] = (global.warnings[sender] || 0) + 1;
      const warningCount = global.warnings[sender];

      if (warningCount < 4) {
        await conn.sendMessage(from, {
          text:
`📛 *تحذيــــــر من البوت* 📛

╭─────⎈─────╮
├👤 *العضو:* @${sender.split('@')[0]}
├⚠️ *العدد:* ${warningCount} من 3
├📎 *السبب:* بعت لينك وانت عارف انه ممنوع 💢
╰─────⎈─────╯

✋ خلي بالك يا نجم، البوت مش بيهزر.`,
          mentions: [sender]
        });
      } else {
        await conn.sendMessage(from, {
          text: `@${sender.split('@')[0]} ☠️ انت اتجاوزت الحدود يا نجم\n💣 عمك لوسيفر طردك عشان بتبعت لينكات 😂✌️`,
          mentions: [sender]
        });
        await conn.groupParticipantsUpdate(from, [sender], "remove");
        delete global.warnings[sender];
      }
    }
  } catch (error) {
    console.error("Anti-link error:", error);
    reply("❌ في حاجه حصلت وانا بتعامل مع اللينك، جرب تاني بعدين 😅");
  }
});