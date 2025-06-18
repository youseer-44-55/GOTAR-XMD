const { sleep } = require('../lib/functions');
const config = require('../config');
const { cmd } = require('../command');

cmd({
    pattern: "برا-الروم",
    alias: ["برا", "سيب", "اطلع_برا"],
    desc: "يخلي البوت يخرج من الجروب.",
    react: "🚪",
    category: "owner",
    filename: __filename
},
async (conn, mek, m, {
    from, isGroup, senderNumber, reply
}) => {
    try {
        const botOwner = config.OWNER_NUMBER.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
        const isOwner = senderNumber === botOwner;

        if (!isGroup) {
            return reply("❌ الأمر ده شغال في الجروبات بس يا معلم.");
        }

        if (!isOwner) {
            return reply("❌ مش هسمع كلامك.. ده أمر للمطور بس يا نجم 🤫");
        }

        reply("🚪 ماشي يا كبير، أنا خارج اهو من الجروب 😂");
        await sleep(1000);
        await conn.groupLeave(from);

    } catch (e) {
        console.error(e);
        reply(`❌ حصلت مشكلة: ${e.message}`);
    }
});