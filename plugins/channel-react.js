const config = require('../config');
const { cmd } = require('../command');

const stylizedChars = {
    a: '🅐', b: '🅑', c: '🅒', d: '🅓', e: '🅔', f: '🅕', g: '🅖',
    h: '🅗', i: '🅘', j: '🅙', k: '🅚', l: '🅛', m: '🅜', n: '🅝',
    o: '🅞', p: '🅟', q: '🅠', r: '🅡', s: '🅢', t: '🅣', u: '🅤',
    v: '🅥', w: '🅦', x: '🅧', y: '🅨', z: '🅩',
    '0': '⓿', '1': '➊', '2': '➋', '3': '➌', '4': '➍',
    '5': '➎', '6': '➏', '7': '➐', '8': '➑', '9': '➒'
};

cmd({
    pattern: "رياكت",
    alias: ["ch", "react"],
    react: "🔤",
    desc: "رياكت على منشور قناة بنص مزخرف",
    category: "owner",
    use: '.رياكت <لينك-المنشور> <النص>',
    filename: __filename
},
async (conn, m, { reply, q, command, isOwner }) => {
    try {
        if (!isOwner) return reply("✋ دا أمر للمطور بس يا نجم 💀");

        if (!q) return reply(`✍️ الاستخدام:\n${command} https://whatsapp.com/channel/1234567890/text`);

        const [link, ...textParts] = q.split(' ');

        if (!link.includes("whatsapp.com/channel/")) return reply("📛 لينك القناة مش صح!");

        const inputText = textParts.join(' ').toLowerCase();
        if (!inputText) return reply("✏️ اكتب النص اللي عايز تعمله رياكت");

        const emoji = inputText.split('').map(char => {
            if (char === ' ') return '―';
            return stylizedChars[char] || char;
        }).join('');

        const parts = link.split('/');
        const channelId = parts[4];
        const messageId = parts[5];

        if (!channelId || !messageId) return reply("❌ لينك ناقص! محتاج ID القناة والمنشور.");

        const channelMeta = await conn.newsletterMetadata("invite", channelId);

        await conn.newsletterReactMessage(channelMeta.id, messageId, emoji);

        return reply(`╭━━〔 *⎝⎝⛥ 𝐋𝐔𝐂𝐈𝐅𝐄𝐑 ⛥⎠⎠* 〕━┈⊷
┃▸ *تم الرّياكت بنجاح ✅*
┃▸ *القناة:* ${channelMeta.name}
┃▸ *الرياكت:* ${emoji}
╰────────────────┈⊷

> *✪『𝙇𝙐𝘾𝙄𝙁𝙀𝙍』✪*`);

    } catch (e) {
        console.error(e);
        reply(`❌ حصل خطأ أثناء الرّياكت:\n${e.message || "Unknown error"}`);
    }
});