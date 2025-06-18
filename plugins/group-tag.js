const { cmd } = require('../command');

cmd({
  pattern: "منشن2",
  alias: ["tag", "هز", "الكل"],
  react: "📣",
  desc: "منشن كل أعضاء الجروب برسالة أو ميديا",
  category: "group",
  use: ".منشن صباح الفل يا رجالة 💪",
  filename: __filename
},
async (conn, mek, m, {
  from, q, isGroup, isOwner, isAdmins,
  participants, reply
}) => {
  try {
    const isUrl = (url) => {
      return /https?:\/\/(www\.)?[\w\-@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([\w\-@:%_\+.~#?&//=]*)/.test(url);
    };

    if (!isGroup) return reply("❌ الأمر دا للجروبات بس يسطا.");
    if (!isAdmins && !isOwner) return reply("❌ انت مش أدمن ولا مطور، ملكش صلاحية تستخدم الأمر دا.");

    const mentionAll = { mentions: participants.map(u => u.id) };
    const توقيع = "\n\n╰━━〔✪『𝐋𝐔𝐂𝐈𝐅𝐄𝐑』✪〕━━⪼";

    if (!q && !m.quoted) {
      return reply("📢 اكتب رسالة أو رد على حاجة علشان أعمل منشن للكل 😴.");
    }

    if (m.quoted) {
      const type = m.quoted.mtype || '';

      if (type === 'extendedTextMessage') {
        return await conn.sendMessage(from, {
          text: (m.quoted.text || '📨 مفيش رسالة 😅') + توقيع,
          ...mentionAll
        }, { quoted: mek });
      }

      if (['imageMessage', 'videoMessage', 'audioMessage', 'stickerMessage', 'documentMessage'].includes(type)) {
        try {
          const buffer = await m.quoted.download?.();
          if (!buffer) return reply("⚠️ معرفتش أنزل الميديا، جرب تاني.");

          let content;
          switch (type) {
            case "imageMessage":
              content = { image: buffer, caption: (m.quoted.text || "🖼️ صورة") + توقيع, ...mentionAll };
              break;
            case "videoMessage":
              content = { 
                video: buffer, 
                caption: (m.quoted.text || "🎥 فيديو") + توقيع, 
                gifPlayback: m.quoted.message?.videoMessage?.gifPlayback || false, 
                ...mentionAll 
              };
              break;
            case "audioMessage":
              content = { 
                audio: buffer, 
                mimetype: "audio/mp4", 
                ptt: m.quoted.message?.audioMessage?.ptt || false, 
                ...mentionAll 
              };
              break;
            case "stickerMessage":
              content = { sticker: buffer, ...mentionAll };
              break;
            case "documentMessage":
              content = {
                document: buffer,
                mimetype: m.quoted.message?.documentMessage?.mimetype || "application/octet-stream",
                fileName: m.quoted.message?.documentMessage?.fileName || "ملف",
                caption: (m.quoted.text || "📄 مستند") + توقيع,
                ...mentionAll
              };
              break;
          }

          if (content) {
            return await conn.sendMessage(from, content, { quoted: mek });
          }
        } catch (e) {
          console.error("Media error:", e);
          return reply("❌ في مشكلة بالميديا، هبعتها كنص عادي.");
        }
      }

      return await conn.sendMessage(from, {
        text: (m.quoted.text || "📨 رسالة") + توقيع,
        ...mentionAll
      }, { quoted: mek });
    }

    if (q) {
      const msg = q + توقيع;
      return await conn.sendMessage(from, {
        text: msg,
        ...mentionAll
      }, { quoted: mek });
    }

  } catch (e) {
    console.error(e);
    reply(`❌ حصلت مشكلة:\n\n${e.message}`);
  }
});