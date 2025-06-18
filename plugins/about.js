const config = require('../config')
const {cmd , commands} = require('../command')
cmd({
    pattern: "عن_المطور",
    alias: "مطور",
    react: "👑",
    desc: "معلومات عن عمك لوسيفر",
    category: "main",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let about = `
*╭┈──────⊰✧⊱──────┈╮*
*أزيك يـ ${pushname} 👋*
*╰┈──────⊰✧⊱──────┈╯*

*👑 مـعلومات عن عمك لوسيفر 👑*
*╭─── • ───*
*│ ◦ الاسم الحقيقي: يوسف سمير*
*│ ◦ اللقب: لوسيفر*
*│ ◦ المدينة: الجحيم ✈️*
*│ ◦ الشغل: مطور 🔥*
*│ ◦ العمر: مالكش دعوة يا فضولي 😏*
*╰─── • ───*

*🔱 𝗟𝗨𝗖𝗜𝗙𝗘𝗥 𝗣𝗥𝗢𝗝𝗘𝗖𝗧 🔱*

*╭─── • ───*
*│ ◦ مطورين البوت:*
*│   ▢ لوسيفر*
*╰─── • ───*

*•────────────•⟢*
> *البوت دا معمول مخصوص لـ الهيمنة 🕷️*
> *تـحــت رعاية عـمـك لــوســيفـر 🥂✨*
*•────────────•⟢*
`
await conn.sendMessage(from, {
    image: { url: 'https://files.catbox.moe/3qt5au.jpg' },
    caption: about,
    contextInfo: {
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
            newsletterJid: '120363400024202153@newsletter',
            newsletterName: '⎝⎝⛥ 𝐋𝐔𝐂𝐈𝐅𝐄𝐑 ⛥⎠⎠',
            serverMessageId: 143
        }
    }
}, { quoted: mek })

}catch(e){
console.log(e)
reply(`${e}`)
}
})