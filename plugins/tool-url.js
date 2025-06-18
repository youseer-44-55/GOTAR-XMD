const axios = require("axios");
const FormData = require('form-data');
const fs = require('fs');
const os = require('os');
const path = require("path");
const { cmd, commands } = require("../command");

cmd({
  pattern: "تحويل-لرابط",
  alias: ["imgtourl", "imgurl", "url", "geturl", "upload"],
  react: "🖇",
  desc: "حول الميديا لرابط Catbox",
  category: "utility",
  use: ".tourl [رد على ميديا]",
  filename: __filename
}, async (client, message, args, { reply }) => {
  try {
    const quotedMsg = message.quoted ? message.quoted : message;
    const mimeType = (quotedMsg.msg || quotedMsg).mimetype || '';

    if (!mimeType) {
      throw "✋ لازم ترد على صورة، ڤيديو، أو ڤويس علشان أرفعهولك يا نجم.";
    }

    const mediaBuffer = await quotedMsg.download();
    const tempFilePath = path.join(os.tmpdir(), `catbox_upload_${Date.now()}`);
    fs.writeFileSync(tempFilePath, mediaBuffer);

    let extension = '';
    if (mimeType.includes('image/jpeg')) extension = '.jpg';
    else if (mimeType.includes('image/png')) extension = '.png';
    else if (mimeType.includes('video')) extension = '.mp4';
    else if (mimeType.includes('audio')) extension = '.mp3';

    const fileName = `file${extension}`;
    const form = new FormData();
    form.append('fileToUpload', fs.createReadStream(tempFilePath), fileName);
    form.append('reqtype', 'fileupload');

    const response = await axios.post("https://catbox.moe/user/api.php", form, {
      headers: form.getHeaders()
    });

    if (!response.data) {
      throw "🚫 حصلت مشكلة وأنا برفع الملف، جرب تاني.";
    }

    const mediaUrl = response.data;
    fs.unlinkSync(tempFilePath);

    let mediaType = 'ميديا';
    if (mimeType.includes('image')) mediaType = 'صورة';
    else if (mimeType.includes('video')) mediaType = 'ڤيديو';
    else if (mimeType.includes('audio')) mediaType = 'صوت';

    await reply(
      `┏━━━━━━ ❖ •『𝐋𝐔𝐂𝐈𝐅𝐄𝐑』• ❖ ━━━━━━┓\n` +
      `✅ *${mediaType} اترفعت تمام يا نجم*\n\n` +
      `📦 *الحجم:* ${formatBytes(mediaBuffer.length)}\n` +
      `🔗 *الرابط:* ${mediaUrl}\n\n` +
      `> ✪ *مرفوع بواسطة لوسيفر* ✪ 🖤\n` +
      `┗━━━━━━━━━━━━━━━━━━━━┛`
    );

  } catch (error) {
    console.error(error);
    await reply(`❌ حصلت مشكلة: ${error.message || error}`);
  }
});

function formatBytes(bytes) {
  if (bytes === 0) return '0 بايت';
  const k = 1024;
  const sizes = ['بايت', 'ك.ب', 'م.ب', 'ج.ب'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}