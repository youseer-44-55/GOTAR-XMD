const { cmd } = require("../command");
const { fetchEmix } = require("../lib/emix-utils");
const { getBuffer } = require("../lib/functions");
const { Sticker, StickerTypes } = require("wa-sticker-formatter");

cmd({
    pattern: "مزج-ايموجي", // ← تعريب اسم الأمر
    alias: ["دمج"],
    desc: "دمج اتنين إيموجي في استيكر واحد 🔥",
    category: "fun",
    react: "😃",
    use: ".مزج_ايموجي 😂,🙂",
    filename: __filename,
}, async (conn, mek, m, { args, q, reply }) => {
    try {
        if (!q.includes(",")) {
            return reply("❗ *الاستخدام الصحيح:*\n.مزج_ايموجي 😂,🙂\n_ابعتلي اتنين إيموجي بينهم فصلة يا معلم_");
        }

        let [emoji1, emoji2] = q.split(",").map(e => e.trim());

        if (!emoji1 || !emoji2) {
            return reply("⚠️ لازم تبعت اتنين إيموجي وبينهم فصلة.");
        }

        let imageUrl = await fetchEmix(emoji1, emoji2);

        if (!imageUrl) {
            return reply("💥 معرفتش أدمجهم.. جرب رموز تانية.");
        }

        let buffer = await getBuffer(imageUrl);
        let sticker = new Sticker(buffer, {
            pack: "مزج الإيموجي",
            author: "عمك لوسيفر 💀🔥",
            type: StickerTypes.FULL,
            categories: ["🔥", "😂", "😍"],
            quality: 75,
            background: "transparent",
        });

        const stickerBuffer = await sticker.toBuffer();
        await conn.sendMessage(mek.chat, { sticker: stickerBuffer }, { quoted: mek });

    } catch (e) {
        console.error("حصلت مشكلة في أمر مزج الإيموجي:", e.message);
        reply(`❌ حصلت مشكلة أثناء الدمج: ${e.message}`);
    }
});