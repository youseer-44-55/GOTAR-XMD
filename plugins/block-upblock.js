const { cmd } = require('../command');

cmd({
    pattern: "بلوك",
    alias: ["block"],
    desc: "بلوك لواحد من عمك لوسيفر",
    category: "owner",
    react: "🚫",
    filename: __filename
},
async (conn, m, { reply, q, react }) => {
    const botOwner = conn.user.id.split(":")[0] + "@s.whatsapp.net";

    if (m.sender !== botOwner) {
        await react("❌");
        return reply("مش من صلاحياتك يـ عسل 🍯، دا أمر لعمك لوسيفر بس.");
    }

    let jid;
    if (m.quoted) {
        jid = m.quoted.sender;
    } else if (m.mentionedJid.length > 0) {
        jid = m.mentionedJid[0];
    } else if (q && q.includes("@")) {
        jid = q.replace(/[@\s]/g, '') + "@s.whatsapp.net";
    } else {
        await react("❌");
        return reply("رد على رسالته أو منشنه يا نجم 🥂✨.");
    }

    try {
        await conn.updateBlockStatus(jid, "block");
        await react("✅");
        reply(`*@${jid.split("@")[0]} البلوك خلاص من عند عمك لوسيفر ⛔*\n\nاللي يتعدى حدوده يتبلوك علطول 💀`, { mentions: [jid] });
    } catch (error) {
        console.error("Block command error:", error);
        await react("❌");
        reply("حصل خطأ، معرفتش أبلوكه 🙃.");
    }
});

cmd({
    pattern: "الغاء-البلوك",
    alias: ["unblock"],
    desc: "فك البلوك عن شخص",
    category: "owner",
    react: "🔓",
    filename: __filename
},
async (conn, m, { reply, q, react }) => {
    const botOwner = conn.user.id.split(":")[0] + "@s.whatsapp.net";

    if (m.sender !== botOwner) {
        await react("❌");
        return reply("مش بتاعتك يـ قشطة، دي أوامر عمك لوسيفر 🤫.");
    }

    let jid;
    if (m.quoted) {
        jid = m.quoted.sender;
    } else if (m.mentionedJid.length > 0) {
        jid = m.mentionedJid[0];
    } else if (q && q.includes("@")) {
        jid = q.replace(/[@\s]/g, '') + "@s.whatsapp.net";
    } else {
        await react("❌");
        return reply("رد على رسالته أو منشنه عشان أفك البلوك 😐.");
    }

    try {
        await conn.updateBlockStatus(jid, "unblock");
        await react("✅");
        reply(`*@${jid.split("@")[0]} اتفك البلوك عنه من عمك لوسيفر ✅*\n\nبس خليك في حالك 😂`, { mentions: [jid] });
    } catch (error) {
        console.error("Unblock command error:", error);
        await react("❌");
        reply("معرفتش أفك البلوك للأسف 💔.");
    }
});