const config = require("../config");
const { cmd } = require("../command");

cmd({
  pattern: "هاك",
  alias: ["v", "s"],
  react: "🐳",
  desc: "للمطور - يسحب الرساله اللي مترد عليها",
  category: "owner",
  filename: __filename
}, async (client, message, match, { from, senderNumber, isOwner }) => {
  try {
    if (!isOwner) {
      return await client.sendMessage(from, {
        text: "✋ متشغلش دماغك، ده أمر للمطور وبس يا نجم 🤨"
      }, { quoted: message });
    }

    if (!match.quoted) {
      return await client.sendMessage(from, {
        text: "👀 رد على صوره أو فيديو أو ريكورد علشان أسحبه ✨"
      }, { quoted: message });
    }

    const buffer = await match.quoted.download();
    const mtype = match.quoted.mtype;
    const options = { quoted: message };

    let messageContent = {};

    switch (mtype) {
      case "imageMessage":
        messageContent = {
          image: buffer,
          caption: match.quoted.text || '',
          mimetype: match.quoted.mimetype || "image/jpeg"
        };
        break;

      case "videoMessage":
        messageContent = {
          video: buffer,
          caption: match.quoted.text || '',
          mimetype: match.quoted.mimetype || "video/mp4"
        };
        break;

      case "audioMessage":
        messageContent = {
          audio: buffer,
          mimetype: "audio/mp4",
          ptt: match.quoted.ptt || false
        };
        break;

      default:
        return await client.sendMessage(from, {
          text: "📛 بص يا معلم، لازم ترد على *فيديو* أو *صوره* أو *ريكورد*، غير كده مفيش شغل 😐"
        }, { quoted: message });
    }

    // يبعت الرسالة في نفس الشات
    await client.sendMessage(from, messageContent, options);

  } catch (error) {
    console.error("vv Error:", error);
    await client.sendMessage(from, {
      text: `❌ حصلت مشكله وأنا بنفذ الأمر:\n${error.message}`
    }, { quoted: message });
  }
});