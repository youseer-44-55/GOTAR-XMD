const { cmd } = require('../command');
const PDFDocument = require('pdfkit');
const { Buffer } = require('buffer');

cmd({
    pattern: "PDF",
    alias: ["pdf","topdf"],
    use: '.topdf',
    desc: "Convert provided text to a PDF file.",
    react: "📄",
    category: "utilities",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) return reply("❗ من فضلك اكتب الكلام اللي عايز تحوله لملف PDF.\n\nمثال: `.topdf` *الذكاء الاصطناعي مستقبل العالم*");

        // إعداد ملف PDF
        const doc = new PDFDocument({
            size: 'A4',
            margin: 50
        });

        let buffers = [];
        doc.on('data', buffers.push.bind(buffers));
        doc.on('end', async () => {
            const pdfData = Buffer.concat(buffers);

            await conn.sendMessage(from, {
                document: pdfData,
                mimetype: 'application/pdf',
                fileName: 'LuciferText.pdf',
                caption: `✅ *تم إنشاء ملف PDF بنجاح!*\n\n🔖 *Powered by Lucifer Bot 😈*`
            }, { quoted: mek });
        });

        // تنسيقات داخلية للنص
        doc.font('Times-Roman')
            .fontSize(16)
            .fillColor('black')
            .text(q, {
                align: 'right',
                lineGap: 8
            });

        // خط تحت باسم البوت
        doc.moveDown();
        doc.fontSize(12).fillColor('gray')
            .text(`\n— بواسطة بوت لوسيفر 😈`, {
                align: 'center'
            });

        doc.end();

    } catch (e) {
        console.error(e);
        reply(`❌ حصل خطأ أثناء إنشاء الـ PDF:\n${e.message}`);
    }
});