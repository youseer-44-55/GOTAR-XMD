const { isJidGroup } = require('@whiskeysockets/baileys');
const config = require('../config');

const getContextInfo = (m) => {
    return {
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
            newsletterJid: '120363400024202153@newsletter',
            newsletterName: '⎝⎝⛥ 𝐋𝐔𝐂𝐈𝐅𝐄𝐑 ⛥⎠⎠',
            serverMessageId: 143,
        },
    };
};

const ppUrls = [
    'https://i.ibb.co/KhYC4FY/1221bc0bdd2354b42b293317ff2adbcf-icon.png',
    'https://i.ibb.co/KhYC4FY/1221bc0bdd2354b42b293317ff2adbcf-icon.png',
    'https://i.ibb.co/KhYC4FY/1221bc0bdd2354b42b293317ff2adbcf-icon.png',
];

const GroupEvents = async (conn, update) => {
    try {
        const isGroup = isJidGroup(update.id);
        if (!isGroup) return;

        const metadata = await conn.groupMetadata(update.id);
        const participants = update.participants;
        const desc = metadata.desc || "مفيش وصف للجروب.";
        const groupMembersCount = metadata.participants.length;

        let ppUrl;
        try {
            ppUrl = await conn.profilePictureUrl(update.id, 'image');
        } catch {
            ppUrl = ppUrls[Math.floor(Math.random() * ppUrls.length)];
        }

        for (const num of participants) {
            const userName = num.split("@")[0];
            const timestamp = new Date().toLocaleString();

            if (update.action === "add" && config.WELCOME === "true") {
                const WelcomeText = `┏━━━✦✪✦━━━┓
👑 نورت الجروب يا @${userName} 💀
┗━━━✦✪✦━━━┛

🥂 اهلاً وسهلاً بيك في *${metadata.subject}*
📍 انت العضو رقم *${groupMembersCount}*

🕰️ تاريخ انضمامك: *${timestamp}*
📜 وصف الجروب:
${desc}

⚠️ احترم القوانين والمشرفين، ومتخافش...
👑 هنا الكل تحت سيطرة ✪『𝐋𝐔𝐂𝐈𝐅𝐄𝐑』✪

🚪 خد راحتك واتجنن، بس بعقل يا نجم 🌪️`;

                await conn.sendMessage(update.id, {
                    image: { url: ppUrl },
                    caption: WelcomeText,
                    mentions: [num],
                    contextInfo: getContextInfo({ sender: num }),
                });

            } else if (update.action === "remove" && config.WELCOME === "true") {
                const GoodbyeText = `┏━━━✦✪✦━━━┓
👋 مع السلامة يا @${userName}
┗━━━✦✪✦━━━┛

💀 واحد خرج من الجروب، نقصنا واحد
🕰️ وقت الخروج: *${timestamp}*
👥 عدد الأعضاء الحالي: *${groupMembersCount}*

😐 كنت ضيف خفيف ولا حد خد باله؟ الله أعلم...

⚰️ ✪『𝐋𝐔𝐂𝐈𝐅𝐄𝐑』✪ بيقولك:
"الجروب مكان للأقوياء بس 👿"`;

                await conn.sendMessage(update.id, {
                    image: { url: ppUrl },
                    caption: GoodbyeText,
                    mentions: [num],
                    contextInfo: getContextInfo({ sender: num }),
                });

            } else if (update.action === "demote" && config.ADMIN_EVENTS === "true") {
                const demoter = update.author.split("@")[0];
                const text = `👑 *حدث إداري - عزل مشرف* 👀

@${demoter} شال الصلاحيات من @${userName}

🕰️ الوقت: *${timestamp}*
📛 الجروب: *${metadata.subject}*

✪『𝐋𝐔𝐂𝐈𝐅𝐄𝐑』✪ بيقولك:
"العزلة مش سهلة يا صاحبي 😶‍🌫️"`;

                await conn.sendMessage(update.id, {
                    text,
                    mentions: [update.author, num],
                    contextInfo: getContextInfo({ sender: update.author }),
                });

            } else if (update.action === "promote" && config.ADMIN_EVENTS === "true") {
                const promoter = update.author.split("@")[0];
                const text = `👑 *حدث إداري - ترقية مشرف* 🎉

@${promoter} رقى @${userName} لمشرف 🔥

🕰️ الوقت: *${timestamp}*
📛 الجروب: *${metadata.subject}*

✪『𝐋𝐔𝐂𝐈𝐅𝐄𝐑』✪ بيقولك:
"اترفعت يا نجم، شوف هتعمل إيه بقا 😈"`;

                await conn.sendMessage(update.id, {
                    text,
                    mentions: [update.author, num],
                    contextInfo: getContextInfo({ sender: update.author }),
                });
            }
        }
    } catch (err) {
        console.error('Group event error:', err);
    }
};

module.exports = GroupEvents;