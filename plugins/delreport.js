const { cmd } = require('../command');
const fs = require("fs");
const path = require("path");

cmd({
    pattern: "مسح-بلاغ",
    alias: ["deletereport", "delreport", "مسحبلاغ"],
    desc: "يمسح بلاغ حسب رقمه ✍🏻",
    category: "owner",
    react: ["🗑️"],
    filename: __filename,
    use: ".مسح-بلاغ <رقم البلاغ>"
}, async (conn, m, msg, { args, reply }) => {
    try {
        const المطورين = ["201501728150", "201226943082"];
        const رقم_المرسل = m.sender.split("@")[0];
        const مسار_الملف = path.join(__dirname, "../data/reports.json");

        if (!المطورين.includes(رقم_المرسل)) {
            return reply("✋🏼 مش ليك يابا.. الأمر دا للمطورين بس 🔒");
        }

        if (!fs.existsSync(مسار_الملف)) {
            return reply("📁 مفيش أي بلاغات محفوظة.");
        }

        const index = parseInt(args[0]);
        if (isNaN(index) || index < 1) {
            return reply("❌ اكتب رقم بلاغ صحيح يا معلم (مثال: .مسح-بلاغ 1)");
        }

        const البلاغات = JSON.parse(fs.readFileSync(مسار_الملف));

        if (index > البلاغات.length) {
            return reply(`📄 عندك بس ${بلاغات.length} بلاغ(ات).. اختار رقم صح.`);
        }

        const المحذوف = البلاغات.splice(index - 1, 1)[0];
        fs.writeFileSync(مسار_الملف, JSON.stringify(بلاغات, null, 2));

        reply(`✅ *تم حذف البلاغ رقم ${index} بنجاح:*\n\n👤 @${محذوف.user}\n🕒 ${محذوف.time}\n📩 ${محذوف.message}`, null, {
            mentions: [`${محذوف.user}@s.whatsapp.net`]
        });

    } catch (err) {
        console.error("خطأ أثناء حذف البلاغ:", err);
        reply("❌ حصلت مشكلة وأنا بحذف البلاغ. جرب تاني.");
    }
});