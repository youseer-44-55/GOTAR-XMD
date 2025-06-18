const { cmd ,commands } = require('../command');
const { exec } = require('child_process');
const config = require('../config');
const {sleep} = require('../lib/functions')
// 1. Shutdown Bot
cmd({
    pattern: "قفل-البوت",
    desc: "Shutdown the bot.",
    category: "owner",
    react: "🛑",
    filename: __filename
},
async (conn, mek, m, { from, isOwner, reply }) => {
    if (!isOwner) return reply("انت مش الادمن يا كسمك 🤫");
    reply("Done...🥂✨").then(() => process.exit());
});
// 2. Broadcast Message to All Groups
cmd({
    pattern: "رساله-للجروبات",
    desc: "Broadcast a message to all groups.",
    category: "owner",
    react: "📢",
    filename: __filename
},
async (conn, mek, m, { from, isOwner, args, reply }) => {
    if (!isOwner) return reply("انت مش الادمن يا علق 😏");
    if (args.length === 0) return reply("الرساله بعد الامر يا مطوري ❤️🥂✨");
    const message = args.join(' ');
    const groups = Object.keys(await conn.groupFetchAllParticipating());
    for (const groupId of groups) {
        await conn.sendMessage(groupId, { text: message }, { quoted: mek });
    }
    reply("Done...🥂✨");
});
// 3. Set Profile Picture
cmd({
    pattern: "تغيير-صوره-البوت",
    desc: "تغيير صورة البروفايل بتاعة البوت.",
    category: "owner",
    react: "🖼️",
    filename: __filename
},
async (conn, mek, m, { from, isOwner, quoted, reply }) => {
    if (!isOwner) return reply("انت مش ادمن يا علق 😏");
    if (!quoted || !quoted.message.imageMessage) return reply("رد علي الصوره يا مطوري ❤️✨");
    try {
        const media = await conn.downloadMediaMessage(quoted);
        await conn.updateProfilePicture(conn.user.id, media); // استخدم Buffer مباشرةً
        reply("تم تغيير صورة البوت يا ريس 🖼️✨");
    } catch (error) {
        console.error(error);
        reply(`❌ حصلت مشكله يا حب: ${error.message}`);
    }
});

// 6. Clear All Chats
cmd({
    pattern: "مسح-الشتات",
    desc: "يمسح كل المحادثات من البوت.",
    category: "owner",
    react: "🧹",
    filename: __filename
},
async (conn, mek, m, { from, isOwner, reply }) => {
    if (!isOwner) return reply("انت مش المطور 😏");

    try {
        const allChats = Object.keys(conn.chats);

        for (const chatId of allChats) {
            await conn.chatModify(
                { delete: true, lastMessages: [{}] }, 
                chatId
            );
        }

        reply("تم مسح كل الشاتات من البوت يا كبير 🧹✨");
    } catch (error) {
        console.error(error);
        reply(`❌ حصلت مشكلة أثناء المسح: ${error.message}`);
    }
});

// 8. Group JIDs List
cmd({
    pattern: "جروبات",
    desc: "بيجبلك JIDs بتاعة كل الجروبات اللي البوت فيها.",
    category: "owner",
    react: "📝",
    filename: __filename
},
async (conn, mek, m, { from, isOwner, reply }) => {
    if (!isOwner) return reply("انت مش المطور يا علق 👍🏻😊");

    try {
        const groups = await conn.groupFetchAllParticipating();
        const groupJids = Object.keys(groups);

        if (groupJids.length === 0) return reply("البوت مش موجود في ولا جروب حالياً يا حب 🥲");

        const list = groupJids.map((jid, i) => `${i + 1}. ${jid}`).join('\n');

        reply(`📝 *قائمة JIDs للجروبات:*\n\n${list}`);
    } catch (e) {
        console.error(e);
        reply("حصلت مشكلة وأنا بجمع الـ JIDs يا حب 💔");
    }
});

// delete 

cmd({
    pattern: "مسح",
    react: "❌",
    alias: ["طير"],
    desc: "مسح رسالة بالرد",
    category: "group",
    use: '.مسح (بالرد)',
    filename: __filename
},    
async (conn, mek, m, {
    from, quoted, isOwner, isAdmins, reply
}) => {
    if (!(isOwner || isAdmins)) return reply("*الأمر ده للمشرفين بس يا حب 🤫*");
    
    try {
        if (!m.quoted) return reply("🧷 رد على الرسالة اللي عايز تمسحها يا نجم!");

        const key = {
            remoteJid: m.chat,
            fromMe: false,
            id: m.quoted.id.id,
            participant: m.quoted.sender
        };

        await conn.sendMessage(m.chat, { delete: key });
    } catch (e) {
        console.log(e);
        reply("في حاجه غلط حصلت، جرب تاني 🥹");
    }
});