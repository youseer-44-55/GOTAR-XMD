const { cmd } = require('../command');

// Command to list all pending group join requests
cmd({
    pattern: "قائمه-الطلبات",
    desc: "Shows pending group join requests",
    category: "group",
    react: "📋",
    filename: __filename
},
async (conn, mek, m, {
    from, isGroup, isAdmins, isBotAdmins, reply
}) => {
    try {
        await conn.sendMessage(from, { react: { text: '⏳', key: m.key } });

        if (!isGroup) {
            await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
            return reply("الأمر دا للحروب بس يعم، متوجعش دماغي برا الجروب 🙄");
        }

        if (!isAdmins) {
            await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
            return reply("للأدمن بس يا نجم، وانت مش أدمن أساسًا 🤷🏻‍♂️");
        }

        if (!isBotAdmins) {
            await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
            return reply("خليني أدمن الأول يا برنس وبعدين جرب تاني 🤖");
        }

        const requests = await conn.groupRequestParticipantsList(from);
        
        if (!requests.length) {
            await conn.sendMessage(from, { react: { text: 'ℹ️', key: m.key } });
            return reply("ولا طلب جالك يا نجم، مفيش حد عايز يدخل 😅");
        }

        let text = `الطلبات اللي جت للحرب 💀 (${requests.length}):\n\n`;
        requests.forEach((user, i) => {
            text += `${i + 1}- @${user.jid.split('@')[0]}\n`;
        });

        await conn.sendMessage(from, { react: { text: '✅', key: m.key } });
        return reply(text, { mentions: requests.map(u => u.jid) });

    } catch (error) {
        console.error("Request list error:", error);
        await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
        return reply("حصلت حاجه غريبة 😅 جرب تاني كده يمكن تتعدل!");
    }
});

// Command to accept all pending join requests
cmd({
    pattern: "قبول-كل-الطلبات",
    desc: "Accepts all pending group join requests",
    category: "group",
    react: "✅",
    filename: __filename
},
async (conn, mek, m, {
    from, isGroup, isAdmins, isBotAdmins, reply
}) => {
    try {
        await conn.sendMessage(from, { react: { text: '⏳', key: m.key } });

        if (!isGroup) {
            await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
            return reply("معروفه انها في الجروبات بس، متتغباش 🙁");
        }

        if (!isAdmins) {
            await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
            return reply("للأدمن بس يا حتّه، وانت مش واحد منهم 😊");
        }

        if (!isBotAdmins) {
            await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
            return reply("ارفعني أدمن الأول وبطّل تنساني 😂");
        }

        const requests = await conn.groupRequestParticipantsList(from);
        if (!requests.length) {
            await conn.sendMessage(from, { react: { text: 'ℹ️', key: m.key } });
            return reply("مفيش طلبات أصلًا، انت غاوي تعب ولا ايه 😂😐");
        }

        const jids = requests.map(u => u.jid);
        await conn.groupRequestParticipantsUpdate(from, jids, "approve");

        await conn.sendMessage(from, { react: { text: '👍', key: m.key } });
        return reply(`اتقبلو كلهم ✅❤️\nعددهم: ${requests.length}`);
        
    } catch (error) {
        console.error("❌ Accept all error:", error);
        await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
        return reply("في حاجه حصلت، جرب تاني يا نجم 👍🏻");
    }
});

// Command to reject all pending join requests
cmd({
    pattern: "مسح-كل-الطلبات",
    desc: "Rejects all pending group join requests",
    category: "group",
    react: "❌",
    filename: __filename
},
async (conn, mek, m, {
    from, isGroup, isAdmins, isBotAdmins, reply
}) => {
    try {
        await conn.sendMessage(from, { react: { text: '⏳', key: m.key } });

        if (!isGroup) {
            await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
            return reply("جروبات بس يا عمنا 🙄");
        }

        if (!isAdmins) {
            await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
            return reply("للأدمن بس يالا 😏");
        }

        if (!isBotAdmins) {
            await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
            return reply("لازم أبقى أدمن 🤔");
        }

        const requests = await conn.groupRequestParticipantsList(from);
        if (!requests.length) {
            await conn.sendMessage(from, { react: { text: 'ℹ️', key: m.key } });
            return reply("مفيش طلبات نرفضها أصلاً 🙂😂");
        }

        const jids = requests.map(u => u.jid);
        await conn.groupRequestParticipantsUpdate(from, jids, "reject");

        await conn.sendMessage(from, { react: { text: '👎', key: m.key } });
        return reply(`الكل اترفض وبقينا في وحدة 🙂😂\nعددهم: ${requests.length}`);
        
    } catch (error) {
        console.error("Reject all error:", error);
        await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
        return reply("في بروبلم 🙂😂 جرب تاني.");
    }
});