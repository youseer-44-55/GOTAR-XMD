const { cmd } = require("../command");
const axios = require("axios");
const fs = require("fs");

cmd({
  pattern: "توليد-صوره-بي-الai",
  alias: ["اعمل", "صوره", "تخيل", "ارسم"],
  react: "🎨",
  desc: "ارسم صوره بخيال الذكاء الصناعي ✨",
  category: "main",
  filename: __filename
}, async (conn, mek, m, { q, reply }) => {
  try {
    if (!q) return reply("🎯 اكتبلي وصف الصوره يا فنان...");

    await reply("🎨⌛ *جارى تخيل الصوره... استنى عليا ✨*");

    const apiUrl = `https://api.siputzx.my.id/api/ai/flux?prompt=${encodeURIComponent(q)}`;
    const response = await axios.get(apiUrl, { responseType: "arraybuffer" });

    if (!response || !response.data) {
      return reply("❌ الـ API مردش بصورة.. جرّب كمان شوية.");
    }

    const imageBuffer = Buffer.from(response.data, "binary");

    await conn.sendMessage(m.chat, {
      image: imageBuffer,
      caption: `🎨 *اتفضل الصورة اللي اتصورت بخيال الذكاء الصناعي 🔮*\n\n🧠 *الوصف:* ${q}\n\n🚀 *بأمر عمك لوسيفر 💀🔥*`
    });

  } catch (error) {
    console.error("FluxAI Error:", error);
    reply(`❌ حصلت حاجه غريبة:\n${error.response?.data?.message || error.message || "مش معروف السبب بصراحة 🤷‍♂️"}`);
  }
});


cmd({
  pattern: "توليد-صوره-بي-الai2",
  alias: ["اعمل2", "sdiffusion", "imagine2"],
  react: "🧠",
  desc: "ارسم صوره بخيال الذكاء الصناعي ✨",
  category: "main",
  filename: __filename
}, async (conn, mek, m, { q, reply }) => {
  try {
    if (!q) return reply("🎯 اكتب وصف الصوره يا فنان...");

    await reply("🧠⌛ *يلا بنخلي الذكاء الصناعي يتخيل الصورة 💭...*");

    const apiUrl = `https://api.siputzx.my.id/api/ai/stable-diffusion?prompt=${encodeURIComponent(q)}`;
    const response = await axios.get(apiUrl, { responseType: "arraybuffer" });

    if (!response || !response.data) {
      return reply("❌ الـ API مردش بصورة.. حاول بعدين.");
    }

    const imageBuffer = Buffer.from(response.data, "binary");

    await conn.sendMessage(m.chat, {
      image: imageBuffer,
      caption: `🧠 *الصورة اللي اتخيلها العقل الصناعي ✨*\n\n🎨 *الوصف:* ${q}\n\n🚀 *بأمر عمك لوسيفر 💀🔥*`
    });

  } catch (error) {
    console.error("StableDiffusion Error:", error);
    reply(`❌ فيه حاجه غلط حصلت:\n${error.response?.data?.message || error.message || "مش معروف السبب 🤷‍♂️"}`);
  }
});


cmd({
  pattern: "توليد-صوره-بي-الai2",
  alias: ["اعمل3", "stability", "imagine3"],
  react: "🎨",
  desc: "ارسم صورة بخيال الذكاء الصناعي 🎨🤖",
  category: "main",
  filename: __filename
}, async (conn, mek, m, { q, reply }) => {
  try {
    if (!q) return reply("🖌️ اكتبلي وصف الصوره يا فنان...");

    await reply("🎨✨ *ثواني وهخلي الذكاء الصناعي يرسملك تحفة فنية...*");

    const apiUrl = `https://api.siputzx.my.id/api/ai/stabilityai?prompt=${encodeURIComponent(q)}`;
    const response = await axios.get(apiUrl, { responseType: "arraybuffer" });

    if (!response || !response.data) {
      return reply("❌ الـ API مردش بصورة.. جرب تاني بعد شوية.");
    }

    const imageBuffer = Buffer.from(response.data, "binary");

    await conn.sendMessage(m.chat, {
      image: imageBuffer,
      caption: `🎨 *الرسمه اللي تخيلها الذكاء الصناعي 🧠✨*\n\n🖋️ *الوصف:* ${q}\n\n🚀 *بأمر عمكم لوسيفر 💀🔥*`
    });

  } catch (error) {
    console.error("StabilityAI Error:", error);
    reply(`❌ حصلت مشكله:\n${error.response?.data?.message || error.message || "السبب مش معروف بصراحه 😅"}`);
  }
});