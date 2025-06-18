const config = require('../config')
const { cmd, commands } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')

cmd({
    pattern: "لينك",
    react: "🖇️",
    alias: ["revokegrouplink","تغيير-لينك","revokelink","f_revoke"],
    desc: "لعادة تعيين رابط الجروب",
    category: "group",
    use: '.revoke',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isCreator ,isDev, isAdmins, reply}) => {
try{
const msr = (await fetchJson('https://raw.githubusercontent.com/JawadYT36/KHAN-DATA/refs/heads/main/MSG/mreply.json')).replyMsg

if (!isGroup) return reply("❌ يا نجم، الأمر ده للجروبات بس مش للشات العادي 💬.")
if (!isAdmins) { if (!isDev) return reply("❌ لأ يا باشا، مش هينفع! لازم تكون أدمن عشان تستخدم الأمر ده 🔐.") } 
if (!isBotAdmins) return reply("❌ إديني أدمن الأول يا عم، أنا مش قادر أتحرك كده 😅.")

await conn.groupRevokeInvite(from)

await conn.sendMessage(from , { 
  text: `✅ *تم تصفير رابط الجروب يا معلم!* 🔁\n\nيلا بقا شارك الرابط الجديد على كيفك 🚀`, 
}, { quoted: mek } )

} catch (e) {
    await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
    console.log(e)
    reply(`❌ *حصلت مصيبة يسطا !!*\n\n📛 التفاصيل: ${e}`)
}
})