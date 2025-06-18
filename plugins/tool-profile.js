const { cmd } = require('../command');
const { getBuffer, fetchJson } = require('../lib/functions');

cmd({
    pattern: "عن-البروفايل",
    react: "👤",
    alias: ["userinfo", "profile"],
    desc: "Get complete user profile information",
    category: "utility",
    use: '.person [@tag or reply]',
    filename: __filename
},
async (conn, mek, m, { from, sender, isGroup, reply, quoted, participants }) => {
    try {
        // 👤 تحديد الشخص الهدف
        let userJid = quoted?.sender ||
                     mek.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] ||
                     sender;

        const [user] = await conn.onWhatsApp(userJid).catch(() => []);
        if (!user?.exists) return reply("❌ الشخص مش موجود على واتساب");

        // 🖼️ صورة البروفايل
        let ppUrl;
        try {
            ppUrl = await conn.profilePictureUrl(userJid, 'image');
        } catch {
            ppUrl = 'https://i.ibb.co/KhYC4FY/1221bc0bdd2354b42b293317ff2adbcf-icon.png';
        }

        // 🏷️ الاسم
        let userName = userJid.split('@')[0];
        try {
            if (isGroup) {
                const member = participants.find(p => p.id === userJid);
                if (member?.notify) userName = member.notify;
            }

            if (conn.contactDB) {
                const contact = await conn.contactDB.get(userJid).catch(() => null);
                if (contact?.name) userName = contact.name;
            }

            if (userName === userJid.split('@')[0]) {
                const presence = await conn.presenceSubscribe(userJid).catch(() => null);
                if (presence?.pushname) userName = presence.pushname;
            }
        } catch (e) {
            console.log("Name fetch error:", e);
        }

        // 📝 البايو
        let bio = {};
        try {
            const statusData = await conn.fetchStatus(userJid).catch(() => null);
            if (statusData?.status) {
                bio = {
                    text: statusData.status,
                    type: "شخصي",
                    updated: statusData.setAt ? new Date(statusData.setAt * 1000) : null
                };
            } else {
                const businessProfile = await conn.getBusinessProfile(userJid).catch(() => null);
                if (businessProfile?.description) {
                    bio = {
                        text: businessProfile.description,
                        type: "بيزنس",
                        updated: null
                    };
                }
            }
        } catch (e) {
            console.log("Bio fetch error:", e);
        }

        // 🛡️ الرتبة في الجروب
        let groupRole = "";
        if (isGroup) {
            const participant = participants.find(p => p.id === userJid);
            groupRole = participant?.admin ? "👑 أدمن" : "👥 عضو";
        }

        const formattedBio = bio.text ?
            `${bio.text}\n└─ 📌 نوع البايو: *${bio.type}*${bio.updated ? ` | 🕒 ${bio.updated.toLocaleString()}` : ''}` :
            "❌ لا يوجد بايو";

        // 📄 التنسيق النهائي
        const userInfo = `
╭───❖ 「 👤 *معلومات العضو* 」 ❖───╮
│ 🧿 *الاسم:* ${userName}
│ 📱 *الرقم:* ${userJid.replace(/@.+/, '')}
│ 💼 *نوع الحساب:* ${user.isBusiness ? "بيزنس" : user.isEnterprise ? "شركي" : "شخصي"}
│ 🛡️ *موثّق:* ${user.verifiedName ? "✅ نعم" : "❌ لا"}
│ 📊 *مسجل:* ${user.isUser ? "✅ نعم" : "❌ لا"}
${isGroup ? `│ 🧷 *الرتبة في الجروب:* ${groupRole}` : ""}
╰──────────────────────╯

📝 *Bio:*
${formattedBio}
        `.trim();

        await conn.sendMessage(from, {
            image: { url: ppUrl },
            caption: userInfo,
            mentions: [userJid]
        }, { quoted: mek });

    } catch (e) {
        console.error("Person command error:", e);
        reply(`❌ حصل خطأ: ${e.message || "فشل في جلب البيانات"}`);
    }
});