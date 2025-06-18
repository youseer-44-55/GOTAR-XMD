const { cmd } = require('../command');
const { getAnti, setAnti } = require('../data/antidel');

cmd({
    pattern: "مضاد-الحذف",
    alias: ['مضاد-الرسائل', 'الغاء-الحذف'],
    desc: "تشغيل أو إيقاف خاصية منع حذف الرسائل",
    category: "عام",
    filename: __filename
},
async (conn, mek, m, { from, reply, text, isCreator }) => {
    if (!isCreator) return reply('الأمر ده للمطور بس يا كبير 💀');

    try {
        const currentStatus = await getAnti();

        if (!text || text.toLowerCase() === 'الحالة') {
            return reply(`*حالة منع الحذف:* ${currentStatus ? '✅ شغال' : '❌ مش شغال'}\n\nالاستخدام:\n• .مضاد-الحذف تشغيل - لتفعيله\n• .مضاد-الحذف ايقاف - لإيقافه`);
        }

        const action = text.toLowerCase().trim();

        if (action === 'تشغيل') {
            await setAnti(true);
            return reply('✅ فعلتلك منع الحذف يا معلم 🔥');
        } 
        else if (action === 'ايقاف') {
            await setAnti(false);
            return reply('❌ قفلتلك منع الحذف يا كبير 💤');
        } 
        else {
            return reply('❗ أمر غير مفهوم. الاستخدام:\n• .مضاد-الحذف تشغيل\n• .مضاد-الحذف ايقاف\n• .مضاد-الحذف الحالة');
        }
    } catch (e) {
        console.error("Error in antidelete command:", e);
        return reply("حصل خطأ وأنا بشتغل على طلبك 💔");
    }
});