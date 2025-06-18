const { cmd } = require('../command');
const config = require("../config");

// Anti-Link System
const linkPatterns = [
  /https?:\/\/(?:chat\.whatsapp\.com|wa\.me)\/\S+/gi,
  /^https?:\/\/(www\.)?whatsapp\.com\/channel\/([a-zA-Z0-9_-]+)$/,
  /wa\.me\/\S+/gi,
  /https?:\/\/(?:t\.me|telegram\.me)\/\S+/gi,
  /https?:\/\/(?:www\.)?youtube\.com\/\S+/gi,
  /https?:\/\/youtu\.be\/\S+/gi,
  /https?:\/\/(?:www\.)?facebook\.com\/\S+/gi,
  /https?:\/\/fb\.me\/\S+/gi,
  /https?:\/\/(?:www\.)?instagram\.com\/\S+/gi,
  /https?:\/\/(?:www\.)?twitter\.com\/\S+/gi,
  /https?:\/\/(?:www\.)?tiktok\.com\/\S+/gi,
  /https?:\/\/(?:www\.)?linkedin\.com\/\S+/gi,
  /https?:\/\/(?:www\.)?snapchat\.com\/\S+/gi,
  /https?:\/\/(?:www\.)?pinterest\.com\/\S+/gi,
  /https?:\/\/(?:www\.)?reddit\.com\/\S+/gi,
  /https?:\/\/ngl\/\S+/gi,
  /https?:\/\/(?:www\.)?discord\.com\/\S+/gi,
  /https?:\/\/(?:www\.)?twitch\.tv\/\S+/gi,
  /https?:\/\/(?:www\.)?vimeo\.com\/\S+/gi,
  /https?:\/\/(?:www\.)?dailymotion\.com\/\S+/gi,
  /https?:\/\/(?:www\.)?medium\.com\/\S+/gi
];

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
    if (!isGroup || isAdmins || !isBotAdmins) {
      return;
    }

    const containsLink = linkPatterns.some(pattern => pattern.test(body));

    if (containsLink && config.ANTI_LINK_KICK === 'true') {
      await conn.sendMessage(from, { 'delete': m.key }, { 'quoted': m });

      const warningText = `🚫 *تحذير من عمكم لوسيفر* 🚫\n\nالروابط هنا ممنوعة يا حب ✋\n\n📌 القوانين:\n1. ممنوع نشر أي لينك.\n2. حتى لو لينك يوتيوب أو تيليجرام.\n3. الطرد بيتم تلقائي.\n\n@${sender.split('@')[0]} اتفضل بره يا نجم 🤡`;

      await conn.sendMessage(from, {
        text: warningText,
        mentions: [sender]
      }, { quoted: m });

      await conn.groupParticipantsUpdate(from, [sender], "remove");
    }
  } catch (error) {
    console.error(error);
    reply("❌ حصل خطأ أثناء تنفيذ الأمر.");
  }
});