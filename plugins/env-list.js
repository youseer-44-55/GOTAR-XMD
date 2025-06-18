const config = require('../config');
const { cmd, commands } = require('../command');
const { runtime } = require('../lib/functions');
const axios = require('axios');

function isEnabled(value) {
    return value && value.toString().toLowerCase() === "true";
}

cmd({
    pattern: "الاعدادات",
    alias: ["env", "config", "setting"],
    desc: "عرض كل إعدادات البوت (للمطور فقط)",
    category: "النظام",
    react: "⚙️",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, reply, isOwner }) => {
    try {
        if (!isOwner) {
            return reply("🚫 *الأمر دا للمطور بس!* ملكش صلاحية تشوف إعدادات البوت.");
        }

        let envSettings = `
╭───『 *إعدادات بوت لوسيفر* 』───❏
│
├─❏ *🤖 معلومات البوت*
│  ├─∘ *الاسم:* ${config.BOT_NAME}
│  ├─∘ *البادئة:* ${config.PREFIX}
│  ├─∘ *المطور:* ${config.OWNER_NAME}
│  ├─∘ *الرقم:* ${config.OWNER_NUMBER}
│  └─∘ *الوضع:* ${config.MODE.toUpperCase()}
│
├─❏ *⚙️ إعدادات أساسية*
│  ├─∘ *وضع عام:* ${isEnabled(config.PUBLIC_MODE) ? "✅" : "❌"}
│  ├─∘ *دائم الاتصال:* ${isEnabled(config.ALWAYS_ONLINE) ? "✅" : "❌"}
│  ├─∘ *قراءة الرسائل:* ${isEnabled(config.READ_MESSAGE) ? "✅" : "❌"}
│  └─∘ *قراءة الأوامر:* ${isEnabled(config.READ_CMD) ? "✅" : "❌"}
│
├─❏ *🔌 تلقائي*
│  ├─∘ *رد تلقائي:* ${isEnabled(config.AUTO_REPLY) ? "✅" : "❌"}
│  ├─∘ *تفاعل تلقائي:* ${isEnabled(config.AUTO_REACT) ? "✅" : "❌"}
│  ├─∘ *تفاعل مخصص:* ${isEnabled(config.CUSTOM_REACT) ? "✅" : "❌"}
│  ├─∘ *إيموجي التفاعل:* ${config.CUSTOM_REACT_EMOJIS}
│  ├─∘ *استيكر تلقائي:* ${isEnabled(config.AUTO_STICKER) ? "✅" : "❌"}
│  └─∘ *صوت تلقائي:* ${isEnabled(config.AUTO_VOICE) ? "✅" : "❌"}
│
├─❏ *📢 حالة الستوري*
│  ├─∘ *مشاهدة تلقائي:* ${isEnabled(config.AUTO_STATUS_SEEN) ? "✅" : "❌"}
│  ├─∘ *رد تلقائي:* ${isEnabled(config.AUTO_STATUS_REPLY) ? "✅" : "❌"}
│  ├─∘ *تفاعل تلقائي:* ${isEnabled(config.AUTO_STATUS_REACT) ? "✅" : "❌"}
│  └─∘ *رسالة الحالة:* ${config.AUTO_STATUS_MSG}
│
├─❏ *🛡️ الحماية*
│  ├─∘ *منع الروابط:* ${isEnabled(config.ANTI_LINK) ? "✅" : "❌"}
│  ├─∘ *منع الكلام الوحش:* ${isEnabled(config.ANTI_BAD) ? "✅" : "❌"}
│  ├─∘ *منع فيس وفيديو:* ${isEnabled(config.ANTI_VV) ? "✅" : "❌"}
│  └─∘ *حذف الروابط:* ${isEnabled(config.DELETE_LINKS) ? "✅" : "❌"}
│
├─❏ *🎨 الوسائط*
│  ├─∘ *صورة البوت:* ${config.ALIVE_IMG}
│  ├─∘ *صورة المنيو:* ${config.MENU_IMAGE_URL}
│  ├─∘ *رسالة البوت:* ${config.LIVE_MSG}
│  └─∘ *باك الاستيكر:* ${config.STICKER_NAME}
│
├─❏ *⏳ إضافي*
│  ├─∘ *كتابة تلقائية:* ${isEnabled(config.AUTO_TYPING) ? "✅" : "❌"}
│  ├─∘ *تسجيل تلقائي:* ${isEnabled(config.AUTO_RECORDING) ? "✅" : "❌"}
│  ├─∘ *مسار منع الحذف:* ${config.ANTI_DEL_PATH}
│  └─∘ *رقم المطور:* ${config.DEV}
│
╰───『 *البوت بتاع عمك لوسيفر 💀* 』──❏
`;

        await conn.sendMessage(
            from,
            {
                image: { url: `https://files.catbox.moe/3qt5au.jpg` },
                caption: envSettings,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true
                }
            },
            { quoted: mek }
        );


    } catch (error) {
        console.error('Env command error:', error);
        reply(`❌ حصل خطأ: ${error.message}`);
    }
});