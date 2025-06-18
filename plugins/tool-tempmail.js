const axios = require('axios');
const { cmd } = require('../command');

// ┏━━━━━━━━━━━━━━━━━━━━┓
// ┃  ✪『𝐋𝐔𝐂𝐈𝐅𝐄𝐑』✪ TEMPMAIL
// ┗━━━━━━━━━━━━━━━━━━━━┛
cmd({
    pattern: "ايميل-وهمي",
    alias: ["جيميل"],
    desc: "يولد بريد مؤقت لمدة 24 ساعة",
    category: "utility",
    react: "📧",
    filename: __filename
},
async (conn, mek, m, { from, reply, prefix }) => {
    try {
        const response = await axios.get('https://apis.davidcyriltech.my.id/temp-mail');
        const { email, session_id, expires_at } = response.data;

        const expiresDate = new Date(expires_at);
        const timeString = expiresDate.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
        const dateString = expiresDate.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });

        const message = `
┏━━━━━━ ❖ •『𝐋𝐔𝐂𝐈𝐅𝐄𝐑』• ❖ ━━━━━━┓
📧 *تم إنشاء بريد مؤقت ليك يا نجم*

✉️ *الإيميل:*
${email}

⏳ *هينتهي يوم:*
${timeString} • ${dateString}

🔑 *معرف الجلسة:*
\`\`\`${session_id}\`\`\`

📥 *علشان تشوف الرسائل:*
.inbox ${session_id}

_⚠️ الإيميل بيعيش ٢٤ ساعة بس_
┗━━━━━━━━━━━━━━━━━━━━┛
`;

        await conn.sendMessage(
            from,
            { 
                text: message,
                contextInfo: {
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363400024202153@newsletter',
                        newsletterName: '⎝⎝⛥ 𝐋𝐔𝐂𝐈𝐅𝐄𝐑 ⛥⎠⎠',
                        serverMessageId: 101
                    }
                }
            },
            { quoted: mek }
        );

    } catch (e) {
        console.error('TempMail error:', e);
        reply(`❌ حصلت مشكلة يا نجم: ${e.message}`);
    }
});

// ┏━━━━━━━━━━━━━━━━━━━━┓
// ┃  ✪『𝐋𝐔𝐂𝐈𝐅𝐄𝐑』✪ CHECKMAIL
// ┗━━━━━━━━━━━━━━━━━━━━┛
cmd({
    pattern: "رساله-البريد",
    alias: ["inbox", "tmail", "mailinbox"],
    desc: "يشوف الرسايل اللي جات على البريد المؤقت",
    category: "utility",
    react: "📬",
    filename: __filename
},
async (conn, mek, m, { from, reply, args }) => {
    try {
        const sessionId = args[0];
        if (!sessionId) return reply('🔑 هاتلي الـ session ID يا نجم\nمثال: .checkmail SESSION_ID');

        const inboxUrl = `https://apis.davidcyriltech.my.id/temp-mail/inbox?id=${encodeURIComponent(sessionId)}`;
        const response = await axios.get(inboxUrl);

        if (!response.data.success) {
            return reply('❌ الـ ID دا مش شغال أو البريد انتهى خلاص');
        }

        const { inbox_count, messages } = response.data;

        if (inbox_count === 0) {
            return reply('📭 مفيش ولا رسالة يا نجم، البريد فاضي');
        }

        let messageList = `📬 *جالك ${inbox_count} رسالة يا وحش*\n\n`;
        messages.forEach((msg, index) => {
            messageList += `━━━━━━━━━━━━━━━━━━\n` +
                          `📌 *رسالة رقم ${index + 1}*\n` +
                          `👤 *من:* ${msg.from}\n` +
                          `📝 *العنوان:* ${msg.subject}\n` +
                          `⏰ *التاريخ:* ${new Date(msg.date).toLocaleString()}\n\n` +
                          `📄 *الرسالة:*\n${msg.body}\n\n`;
        });

        await reply(messageList);

    } catch (e) {
        console.error('CheckMail error:', e);
        reply(`❌ حصلت مشكلة وإنت بتشوف البريد: ${e.response?.data?.message || e.message}`);
    }
});