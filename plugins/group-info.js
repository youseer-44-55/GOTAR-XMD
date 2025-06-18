const config = require('../config')
const { cmd } = require('../command')
const { fetchJson } = require('../lib/functions')

cmd({
    pattern: "معلومات-الجروب",
    react: "📊",
    alias: ["ginfo", "جروب", "groupinfo"],
    desc: "يعرض معلومات الجروب",
    category: "group",
    use: '.معلومات-الجروب',
    filename: __filename
},
async (conn, mek, m, {
    from, isGroup, isAdmins, isBotAdmins, participants, groupMetadata, reply, isDev, isOwner
}) => {
    try {
        // رسائل افتراضية
        let msr = {
            only_gp: "الامر دا للجروبات بس يا نجم 💀.",
            you_adm: "لازم تبقى ادمن يا نجم علشان تشوف البيانات دي 🤨.",
            give_adm: "ارفعني ادمن الأول وبعدين اطلب اللي انت عايزه 🤖."
        }

        // محاولة تحميل رسائل مخصصة من الإنترنت
        try {
            const res = await fetchJson('https://raw.githubusercontent.com/JawadTech3/KHAN-DATA/refs/heads/main/MSG/mreply.json')
            if (res?.replyMsg) msr = res.replyMsg
        } catch (e) {
            console.log('⚠️ فشل تحميل الرسائل من النت، هستخدم الافتراضية.');
        }

        if (!isGroup) return reply(msr.only_gp)
        if (!isAdmins && !isDev && !isOwner) return reply(msr.you_adm)
        if (!isBotAdmins) return reply(msr.give_adm)

        // صورة الجروب
        let ppUrl
        try {
            ppUrl = await conn.profilePictureUrl(from, 'image')
        } catch {
            ppUrl = 'https://i.ibb.co/KhYC4FY/1221bc0bdd2354b42b293317ff2adbcf-icon.png'
        }

        const metadata = await conn.groupMetadata(from)
        const groupAdmins = participants.filter(p => p.admin)
        const listAdmin = groupAdmins.map((v, i) => `${i + 1}. @${v.id.split('@')[0]}`).join('\n')
        const owner = metadata.owner || groupAdmins[0]?.id || 'unknown'

        const gdata = `*「 معلومات الجروب 」*

📛 *الاسم:* ${metadata.subject}
🆔 *الـ ID:* ${metadata.id}
👥 *عدد الأعضاء:* ${metadata.size}
👑 *المالك:* ${owner !== 'unknown' ? '@' + owner.split('@')[0] : 'مش معروف 😐'}
📝 *الوصف:* ${metadata.desc?.toString() || 'مفيش وصف مكتوب 😴'}

🛡️ *الادمنية:*
${listAdmin}
        `

        await conn.sendMessage(from, {
            image: { url: ppUrl },
            caption: gdata,
            mentions: groupAdmins.map(a => a.id).concat(owner !== 'unknown' ? [owner] : [])
        }, { quoted: mek })

    } catch (e) {
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
        console.log(e)
        reply(`❌ حصلت مشكلة:\n\n${e}`)
    }
})