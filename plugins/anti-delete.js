const config = require("../config");
const { cmd } = require('../command');
const { getAnti, setAnti, initializeAntiDeleteSettings } = require('../data/antidel');

initializeAntiDeleteSettings();

cmd({
    pattern: "منع-حذف-الرساله", // الاسم الحقيقي للأمر (ما يتغيرش)
    alias: ['antidel', 'antid'],
    desc: "منع حذف الرسائل في الجروبات والخاص",
    category: "misc",
    filename: __filename
},
async (conn, mek, m, { reply, q, isOwner }) => {
    if (!isOwner) {
      return await conn.sendMessage(m.chat, {
        text: "انت مش المطور يا حته 🤫🥂"
      }, { quoted: m });
    }
    try {
        const command = q?.toLowerCase();

        switch (command) {
            case 'on':
                await setAnti('gc', true);
                await setAnti('dm', true);
                return reply('🛡️ منع الحذف اشتغل يا معلم فـ الجروبات والخاص 💪🔥');

            case 'off gc':
                await setAnti('gc', false);
                return reply('❌ وقفنا منع الحذف في الجروبات خلاص 💤');

            case 'off dm':
                await setAnti('dm', false);
                return reply('❌ خلاص خاصك بقى من غير منع حذف 😴');

            case 'set gc':
                const gcStatus = await getAnti('gc');
                await setAnti('gc', !gcStatus);
                return reply(`🔁 منع الحذف في الجروبات دلوقتي ${!gcStatus ? 'شغال 💪' : 'مقفول 🚫'}`);

            case 'set dm':
                const dmStatus = await getAnti('dm');
                await setAnti('dm', !dmStatus);
                return reply(`🔁 منع الحذف في الخاص دلوقتي ${!dmStatus ? 'شغال ✨' : 'مقفول 📴'}`);

            case 'set all':
                await setAnti('gc', true);
                await setAnti('dm', true);
                return reply('🚀 فعلنا منع الحذف في كل الشاتات يا ريس 💼🛡️');

            case 'status':
                const currentDmStatus = await getAnti('dm');
                const currentGcStatus = await getAnti('gc');
                return reply(`📊 حالة منع الحذف حاليًا:\n\n📩 خاص: ${currentDmStatus ? 'شغال ✨' : 'مقفول 📴'}\n👥 جروبات: ${currentGcStatus ? 'شغال 💪' : 'مقفول 🚫'}`);

            default:
                return reply(`📘 دليل استخدام منع الحذف:\n\n• \`منع-حذف-الرساله on\` – تشغيله في الكل\n• \`منع-حذف-الرساله off gc\` – قفله في الجروبات\n• \`منع-حذف-الرساله off dm\` – قفله في الخاص\n• \`منع-حذف-الرساله set gc\` – تبديل حالته في الجروبات\n• \`منع-حذف-الرساله set dm\` – تبديل حالته في الخاص\n• \`منع-حذف-الرساله set all\` – تشغيله في كله\n• \`منع-حذف-الرساله status\` – تشوف حالته دلوقتي`);
        }
    } catch (e) {
        console.error("Erreur antidelete:", e);
        return reply("🥴 حصلت حاجه غريبة.. جرب تاني بعد شوية!");
    }
});