const config = require('../config')
const { cmd } = require('../command')
const { sleep } = require('../lib/functions')

cmd({
    pattern: "اطرد_دوله",
    alias: ["out", "طرد_رقم", "🦶"],
    desc: "طرد كل الناس اللى أرقامهم تبدأ بكود دولة معين",
    category: "group",
    react: "🦶",
    filename: __filename
},
async (conn, mek, m, {
    from, q, isGroup, isBotAdmins, reply, groupMetadata, senderNumber
}) => {
    const owner = config.OWNER_NUMBER;

    if (!isGroup) return reply("❌ الأمر ده لازم يشتغل فـ جروب بس ياعم!");

    if (senderNumber !== owner) return reply("❌ مش بسمع غير كلام عمك لوسيفر 🤫🖕🏻");

    if (!isBotAdmins) return reply("❌ خليني أدمن الأول يا معلم عشان أطرد.");

    if (!q || !/^\d+$/.test(q.trim())) {
        return reply("❌ اكتب كود الدولة بالأرقام بس.\nمثال: .اطرد_دوله 212");
    }

    const code = q.trim();
    const participants = groupMetadata.participants || [];
    const targets = participants.filter(p => 
        p.id && p.id.startsWith(code) && !p.admin && !p.id.includes(config.OWNER_NUMBER)
    );

    if (targets.length === 0) {
        return reply(`❌ مفيش حد في الجروب رقمه بيبدأ بـ +${code}`);
    }

    reply(`⌛ بطرد ${targets.length} عضو رقمه بـ +${code}...`);

    for (const user of targets) {
        await conn.groupParticipantsUpdate(from, [user.id], "remove");
        await sleep(1000); // استراحة بسيطة بين كل طرد
    }

    reply(`✅ طردت كل الناس اللى رقمهم بيبدأ بـ +${code} ✌️`);
});