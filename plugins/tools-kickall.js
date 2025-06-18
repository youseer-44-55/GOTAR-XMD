const { cmd } = require('../command');
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

cmd({
    pattern: "طرد-الاعضاء",
    alias: ["kall", "طرد-المعرصين", "endgroup"],
    desc: "يطرد كل الناس الغير أدمن من الجروب.",
    react: "💥",
    category: "group",
    filename: __filename,
},
async (conn, mek, m, {
    from, groupMetadata, groupAdmins, isBotAdmins, senderNumber, reply, isGroup, isOwner, isAdmins
}) => {
    try {
        if (!isGroup) return reply("👥 يا ابني دا أمر للجروبات بس، مش للخاص.");

        if (!isOwner && !isAdmins) {
            return reply("🖕🏻 مش بسمعش غير كلام عمك لوسيفر يلا ومساعدينه 🤫.");
        }

        if (!isBotAdmins) {
            return reply("😒 اديني أدمن الأول بدل الفزلكة دي.");
        }

        const allParticipants = groupMetadata.participants;
        const nonAdminParticipants = allParticipants.filter(member => !groupAdmins.includes(member.id));

        if (nonAdminParticipants.length === 0) {
            return reply("🧐 مفيش حد نطرده، كله أدمن هنا يا عم!");
        }

        reply(`😈 عمكم لوسيفر هيطرد ${nonAdminParticipants.length} واحد من الجروب... استعدوا ✌️`);

        for (let participant of nonAdminParticipants) {
            try {
                await conn.groupParticipantsUpdate(from, [participant.id], "remove");
                await sleep(2000); // علشان ميضربش سبام
            } catch (e) {
                console.error(`⚠️ فشلت أطرد ${participant.id}:`, e);
            }
        }

        reply("👊 عمكم لوسيفر بيقول الكل برااا 💀💨");
    } catch (e) {
        console.error("🔥 حصلت كارثة وأنا بطرد:", e);
        reply("💢 حاجة ضربت ف الكود.. جرب تاني ولا كلمني أنا أظبطلك.");
    }
});

// remove only admins (excluding bot and owner)
cmd({
    pattern: "طرد-الادمن",
    alias: ["kickadmins", "kickall3", "deladmins"],
    desc: "Remove all admin members from the group, excluding the bot and bot owner.",
    react: "🎉",
    category: "group",
    filename: __filename,
}, 
async (conn, mek, m, {
    from, isGroup, senderNumber, groupMetadata, groupAdmins, isBotAdmins, reply, isOwner, isAdmins
}) => {
    try {
        if (!isGroup) return reply("This command can only be used in groups.");

        if (!isOwner && !isAdmins) {
            return reply("Only the bot owner or group admins can use this command.");
        }

        if (!isBotAdmins) {
            return reply("I need to be an admin to execute this command.");
        }

        const botOwner = conn.user.id.split(":")[0];
        const allParticipants = groupMetadata.participants;

        const adminParticipants = allParticipants.filter(member => 
            groupAdmins.includes(member.id) &&
            member.id !== conn.user.id &&
            member.id !== `${botOwner}@s.whatsapp.net`
        );

        if (adminParticipants.length === 0) {
            return reply("There are no admin members to remove.");
        }

        reply(`Starting to remove ${adminParticipants.length} admin members, excluding the bot and bot owner...`);

        for (let participant of adminParticipants) {
            try {
                await conn.groupParticipantsUpdate(from, [participant.id], "remove");
                await sleep(2000);
            } catch (e) {
                console.error(`Failed to remove ${participant.id}:`, e);
            }
        }

        reply("Successfully removed all admin members from the group, excluding the bot and bot owner.");
    } catch (e) {
        console.error("Error removing admins:", e);
        reply("An error occurred while trying to remove admins. Please try again.");
    }
});


// remove all members except bot and owner
cmd({
    pattern: "طرد-الكل",
    alias: ["kickall2", "endgc2", "endgroup2"],
    desc: "يطرد الكل من الجروب ماعدا البوت وعمهم لوسيفر.",
    react: "💀",
    category: "group",
    filename: __filename,
}, 
async (conn, mek, m, {
    from, isGroup, senderNumber, groupMetadata, isBotAdmins, reply, isOwner, isAdmins
}) => {
    try {
        if (!isGroup) return reply("👥 دا أمر للجروب يا معلم، مش ينفع في الخاص.");

        if (!isOwner && !isAdmins) {
            return reply("🤫 مش بسمع غير كلام عمك لوسيفر ولا مساعدينه يا نجم.");
        }

        if (!isBotAdmins) {
            return reply("🙄 ارفعني أدمن يا سطى قبل ما تطلب المستحيل.");
        }

        const botOwner = conn.user.id.split(":")[0];
        const allParticipants = groupMetadata.participants;

        if (allParticipants.length === 0) {
            return reply("👻 الجروب فاضي، مفيش حد أطرده يالا.");
        }

        const participantsToRemove = allParticipants.filter(
            participant => participant.id !== conn.user.id && participant.id !== `${botOwner}@s.whatsapp.net`
        );

        if (participantsToRemove.length === 0) {
            return reply("😎 مفيش حد ينفع أطرده، كله VIP تحت حماية لوسيفر.");
        }

        reply(`⚠️ لوسيفر قال: اللعبة خلصت.. الكل برا يا معفنين 🔥`);

        for (let participant of participantsToRemove) {
            try {
                await conn.groupParticipantsUpdate(from, [participant.id], "remove");
                await sleep(2000);
            } catch (e) {
                console.error(`❌ معرفتش أطرد ${participant.id}:`, e);
            }
        }

        reply("✅ العملية تمت.. الجروب اتصفّى ماعدا عمكم لوسيفر والبوت ✌️💀");
    } catch (e) {
        console.error("🔥 حصلت مصيبة وأنا بطرد الكل:", e);
        reply("💢 حاجة بازت فالبوت.. جرب تاني أو هبعتلك دراكولا 🧛🏻‍♂️");
    }
});