const { cmd } = require("../command");

cmd({
  pattern: "هاك-2",
  alias: ["بريفت", "ohh", "oho", "💀", "nice", "ok"],
  desc: "Owner Only - يرجّع الرسالة على الخاص",
  category: "owner",
  filename: __filename
}, async (client, message, match, { from, isCreator }) => {
  try {
    if (!isCreator) {
      return await client.sendMessage(from, {
        text: "انت مش المطور يا حته 🤫🥂"
      }, { quoted: message });
    }

    if (!match.quoted) {
      return await client.sendMessage(from, {
        text: "👀 رد على رساله فيها صوره أو فيديو أو ريكورد علشان أقدر أسحبها ✨"
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
          text: "✋ الأمر ده بيشتغل مع *صوره* أو *فيديو* أو *ريكورد* بس يا عم الحج 😐"
        }, { quoted: message });
    }

    // يبعت الرسالة للمطور على الخاص
    await client.sendMessage(message.sender, messageContent, options);

  } catch (error) {
    console.error("vv Error:", error);
    await client.sendMessage(from, {
      text: `❌ حصلت مشكلة وأنا بسحب الرسالة:\n${error.message}`
    }, { quoted: message });
  }
});