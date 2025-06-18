const axios = require("axios");
const { cmd } = require("../command");

function getFlagEmoji(countryCode) {
  if (!countryCode) return "";
  return countryCode
    .toUpperCase()
    .split("")
    .map(c => String.fromCodePoint(c.charCodeAt(0) + 127397))
    .join("");
}

cmd({
  pattern: "كود",
  desc: "يجيبلك الدول اللي بتستخدم كود الاتصال",
  category: "معلومات",
  filename: __filename
}, async (conn, mek, m, { args, reply }) => {
  try {
    let code = args[0];
    if (!code) return reply("✋🏻 اكتبلي كود دولة يا برنس، زي كده:\nكود 966");

    code = code.replace(/\D/g, '');

    const { data } = await axios.get(`https://restcountries.com/v2/callingcode/${code}`);
    
    if (!data || data.status === 404 || data.length === 0) {
      return reply(`❌ مفيش ولا دولة بتستخدم الكود دا +${code} 😒`);
    }

    const countryList = data.map(c => `🌍 ${getFlagEmoji(c.alpha2Code)} *${c.name}*`).join("\n");
    reply(`📞 *الكود*: +${code}\n\n🔎 *الدول اللي بتستخدمه:*\n${countryList}`);
    
  } catch (e) {
    console.error("❌ API error:", e.message);
    reply(`⚠️ حصلت مشكله: ${e.message}`);
  }
});