const { fetchJson } = require("../lib/functions");
const { downloadTiktok } = require("@mrnima/tiktok-downloader");
const { facebook } = require("@mrnima/facebook-downloader");
const cheerio = require("cheerio");
const { igdl } = require("ruhend-scraper");
const axios = require("axios");
const { cmd, commands } = require('../command');

cmd({
  pattern: "انستا",
  alias: ["insta", "Ig"],
  desc: "To download Instagram videos.",
  react: "🎥",
  category: "download",
  filename: __filename
}, async (conn, m, store, { from, q, reply }) => {
  try {
    if (!q || !q.startsWith("http")) {
      return reply(
        `⚠️ يابا فين اللينك؟!\n\n📌 استخدم الأمر كده:\nانستا https://رابط-الڤيديو\n\n🎬 لازم اللينك يكون شغال تمام 😉`
      );
    }

    await conn.sendMessage(from, {
      react: { text: "⏳", key: m.key }
    });

    const response = await axios.get(`https://api.davidcyriltech.my.id/instagram?url=${q}`);
    const data = response.data;

    if (!data || data.status !== 200 || !data.downloadUrl) {
      return reply(
        `🚫 فيه حاجة مش تمام!\n\n📎 إما اللينك بايظ، أو الفيديو اتحذف.\nجرب بلينك تاني بعد شوية 🤷‍♂️`
      );
    }

    await conn.sendMessage(from, {
      video: { url: data.downloadUrl },
      mimetype: "video/mp4",
      caption:
        `╭━━❰ ⍟ Instagram Video ⍟ ❱━━╮\n` +
        `┃📥 الحالة: *تم التحميل بنجاح!*\n` +
        `┃🎬 النوع: فيديو إنستا\n` +
        `┃📡 المصدر: Instagram\n` +
        `┃🕐 الوقت: ${new Date().toLocaleTimeString()}\n` +
        `╰━━━━━━━━━━━━━━━━━━━━╯\n` +
        `\n> *⎝⎝⛥ 𝐋𝐔𝐂𝐈𝐅𝐄𝐑 ⛥⎠⎠*`
    }, { quoted: m });

  } catch (error) {
    console.error("Error:", error);
    reply(
      `💥 حصلت مشكلة غير متوقعة!\n\n🔧 البوت بيحاول يصلحها، جرب تاني كمان شوية 👨‍🔧`
    );
  }
});



cmd({
  pattern: "ميديا-فاير",
  alias: ["mf"],
  desc: "To download MediaFire files.",
  react: "🗂️",
  category: "download",
  filename: __filename
}, async (conn, m, store, {
  from,
  quoted,
  q,
  reply
}) => {
  try {
    if (!q) {
      return reply(
        `📎 فين اللينك يسطا؟\n\nجرب كده:\nميديا-فاير https://رابط\n\n💡 خليك مظبوط في الكتابة عشان التحميل يشتغل 🛠️`
      );
    }

    await conn.sendMessage(from, {
      react: { text: "⏳", key: m.key }
    });

    const response = await axios.get(`https://www.dark-yasiya-api.site/download/mfire?url=${q}`);
    const data = response.data;

    if (!data || !data.status || !data.result || !data.result.dl_link) {
      return reply(
        `🚫 مفيش حاجة نزلت!\n\n🔍 اتأكد إن اللينك صح، والملف مش خاص أو متشال 💀`
      );
    }

    const { dl_link, fileName, fileType } = data.result;
    const file_name = fileName || "mediafire_download";
    const mime_type = fileType || "application/octet-stream";

    await conn.sendMessage(from, {
      react: { text: "⬆️", key: m.key }
    });

    const caption = 
      `╭━━━━━━⊷\n` +
      `┃📁 *اسم الملف:* ${file_name}\n` +
      `┃📦 *النوع:* ${mime_type}\n` +
      `╰━━━━━━⊷\n\n` +
      `📥 تم تحميل الملف بنجاح يا نجم!\n` +
      `> *⎝⎝⛥ 𝐋𝐔𝐂𝐈𝐅𝐄𝐑 ⛥⎠⎠*`;

    await conn.sendMessage(from, {
      document: { url: dl_link },
      mimetype: mime_type,
      fileName: file_name,
      caption: caption
    }, { quoted: m });

  } catch (error) {
    console.error("Error:", error);
    reply(
      `💥 حاجة ضربت عند الموقع يا نجم!\n\n📡 جرب تاني بعد شوية، أنا تمام والله 😂🔧`
    );
  }
});



cmd({
  pattern: "تحميل-تطبيق",
  alias: ["apk"],
  desc: "Download APK from Aptoide.",
  category: "download",
  filename: __filename
}, async (conn, m, store, {
  from,
  quoted,
  q,
  reply
}) => {
  try {
    if (!q) {
      return reply(
        `📲 اسم التطبيق فين يا نجم؟\n\nجرب كده:\nتحميل-تطبيق ببجي موبايل 🎮\n\n📝 خليك واضح في الاسم عشان أجيبه صح 😎`
      );
    }

    await conn.sendMessage(from, { react: { text: "⏳", key: m.key } });

    const apiUrl = `http://ws75.aptoide.com/api/7/apps/search/query=${q}/limit=1`;
    const response = await axios.get(apiUrl);
    const data = response.data;

    if (!data || !data.datalist || !data.datalist.list.length) {
      return reply(`🔍 ملقتش التطبيق!\nجرب تكتب الاسم بطريقة أوضح 🧠💡`);
    }

    const app = data.datalist.list[0];
    const appSize = (app.size / 1048576).toFixed(2); // Convert bytes to MB

    const caption = 
      `╭━━〔 📲 *تفاصيل التطبيق* 〕━━⊷\n` +
      `┃ 🧾 *الاسم:* ${app.name}\n` +
      `┃ 📦 *الحجم:* ${appSize} MB\n` +
      `┃ 📦 *الباكدچ:* ${app.package}\n` +
      `┃ 🕒 *آخر تحديث:* ${app.updated}\n` +
      `┃ 👨‍💻 *المطور:* ${app.developer.name}\n` +
      `╰━━━━━━━━━━━━━━━⊷\n\n` +
      `📥 *جاري تحميل التطبيق... استنى ثواني*\n\n` +
      `> *⎝⎝⛥ 𝐋𝐔𝐂𝐈𝐅𝐄𝐑 ⛥⎠⎠*`;

    await conn.sendMessage(from, { react: { text: "⬆️", key: m.key } });

    await conn.sendMessage(from, {
      document: { url: app.file.path_alt },
      fileName: `${app.name}.apk`,
      mimetype: "application/vnd.android.package-archive",
      caption: caption
    }, { quoted: m });

    await conn.sendMessage(from, { react: { text: "✅", key: m.key } });

  } catch (error) {
    console.error("Error:", error);
    reply(`💥 حاجة ضربت في السيرفر\nجرب بعدين يا نجم 🔧`);
  }
});