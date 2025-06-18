const { cmd } = require('../command');
const config = require('../config');

cmd({
    pattern: "المطور",
    react: "💀", 
    desc: "Get owner number",
    category: "main",
    filename: __filename
}, 
async (conn, mek, m, { from }) => {
    try {
        const ownerNumber = config.OWNER_NUMBER; // Fetch owner number from config
        const ownerName = config.OWNER_NAME;     // Fetch owner name from config

        const vcard = 'BEGIN:VCARD\n' +
                      'VERSION:3.0\n' +
                      `FN:⎝⎝⛥ 𝐋𝐔𝐂𝐈𝐅𝐄𝐑 ⛥⎠⎠\n` +  
                      `TEL;type=CELL;type=VOICE;waid=${ownerNumber.replace('+', '')}:${ownerNumber}\n` + 
                      'END:VCARD';

        // Send the vCard
        const sentVCard = await conn.sendMessage(from, {
            contacts: {
                displayName: ownerName,
                contacts: [{ vcard }]
            }
        });

        // Send the owner contact message with image and audio
        await conn.sendMessage(from, {
            image: { url:'https://files.catbox.moe/3qt5au.jpg' }, // Image URL from your request
            caption: `╭━━〔 ⎝⎝⛥ 𝐋𝐔𝐂𝐈𝐅𝐄𝐑 ⛥⎠⎠ 〕━━┈⊷
┃◈╭─────────────·๏
┃◈┃• 🍷 *3MK LUCIFER* 🍷
┃◈┃• *Name* - ${ownerName}
┃◈┃• *Number* ${ownerNumber}
┃◈┃• *Version*: 1.0.0 
┃◈└───────────┈⊷
╰──────────────┈⊷
> *✪『𝙇𝙐𝘾𝙄𝙁𝙀𝙍』✪*`, // Display the owner's details
            contextInfo: {
                mentionedJid: [`${ownerNumber.replace('+', '')}@s.whatsapp.net`], 
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363400024202153@newsletter',
                    newsletterName: '⎝⎝⛥ 𝐋𝐔𝐂𝐈𝐅𝐄𝐑 ⛥⎠⎠',
                    serverMessageId: 143
                }            
            }
        }, { quoted: mek });

    } catch (error) {
        console.error(error);
        reply(`في مشكله يا حب حاول تاني كمان شويه 🙂: ${error.message}`);
    }
});
