const { cmd } = require('../command');
const axios = require('axios');

cmd({
    pattern: "اصوات-ذكاء-اصطناعي",
    alias: ["aiv", "voicex", "voiceai"],
    desc: "Text to speech with different AI voices",
    category: "main",
    react: "🪃",
    filename: __filename
},
async (conn, mek, m, { reply, from, args }) => {
    try {
        if (!args[0]) return reply("✍️ اكتبلي الكلام اللي عايزني اقوله بصوت روبوت يا برنس\nمثال: .aivoice انا جامد");

        const inputText = args.join(' ');

        await conn.sendMessage(from, {
            react: { text: '⏳', key: m.key }
        });

        const voiceModels = [
            { number: "1", name: "Hatsune Miku", model: "miku" },
            { number: "2", name: "Nahida (Exclusive)", model: "nahida" },
            { number: "3", name: "Nami", model: "nami" },
            { number: "4", name: "Ana (Female)", model: "ana" },
            { number: "5", name: "Optimus Prime", model: "optimus_prime" },
            { number: "6", name: "Goku", model: "goku" },
            { number: "7", name: "Taylor Swift", model: "taylor_swift" },
            { number: "8", name: "Elon Musk", model: "elon_musk" },
            { number: "9", name: "Mickey Mouse", model: "mickey_mouse" },
            { number: "10", name: "Kendrick Lamar", model: "kendrick_lamar" },
            { number: "11", name: "Angela Adkinsh", model: "angela_adkinsh" },
            { number: "12", name: "Eminem", model: "eminem" }
        ];

        let menuText = "╭━━━〔 🎤 *اختار الصوت يا نجم* 〕━━━⊷\n";
        voiceModels.forEach(model => {
            menuText += `┃ ${model.number}. ${model.name}\n`;
        });
        menuText += "╰━━━⪼\n\n";
        menuText += `🎧 *رد برقم الصوت اللي هيقول الجمله دي:*\n"${inputText}"`;

        const sentMsg = await conn.sendMessage(from, {
            image: { url: "https://files.catbox.moe/3qt5au.jpg" },
            caption: menuText
        }, { quoted: m });

        const messageID = sentMsg.key.id;
        let handlerActive = true;

        const handlerTimeout = setTimeout(() => {
            handlerActive = false;
            conn.ev.off("messages.upsert", messageHandler);
            reply("⌛ الوقت خلص يا غالي، ابعت الأمر تاني لو عايز تجرب تاني.");
        }, 120000);

        const messageHandler = async (msgData) => {
            if (!handlerActive) return;

            const receivedMsg = msgData.messages[0];
            if (!receivedMsg || !receivedMsg.message) return;

            const receivedText = receivedMsg.message.conversation ||
                receivedMsg.message.extendedTextMessage?.text ||
                receivedMsg.message.buttonsResponseMessage?.selectedButtonId;

            const senderID = receivedMsg.key.remoteJid;
            const isReplyToBot = receivedMsg.message.extendedTextMessage?.contextInfo?.stanzaId === messageID;

            if (isReplyToBot && senderID === from) {
                clearTimeout(handlerTimeout);
                conn.ev.off("messages.upsert", messageHandler);
                handlerActive = false;

                await conn.sendMessage(senderID, {
                    react: { text: '⬇️', key: receivedMsg.key }
                });

                const selectedNumber = receivedText.trim();
                const selectedModel = voiceModels.find(model => model.number === selectedNumber);

                if (!selectedModel) {
                    return reply("❌ ده مش اختيار من اللي فوق يا نجم.. اختار رقم مظبوط!");
                }

                try {
                    await conn.sendMessage(from, {
                        text: `🔊 شغاللك الصوت بتاع *${selectedModel.name}* يا معلم... استنى شوية`
                    }, { quoted: receivedMsg });

                    const apiUrl = `https://api.agatz.xyz/api/voiceover?text=${encodeURIComponent(inputText)}&model=${selectedModel.model}`;
                    const response = await axios.get(apiUrl, { timeout: 30000 });

                    const data = response.data;

                    if (data.status === 200) {
                        await conn.sendMessage(from, {
                            audio: { url: data.data.oss_url },
                            mimetype: "audio/mpeg"
                        }, { quoted: receivedMsg });
                    } else {
                        reply("❌ حصل حاجه غريبة.. معرفتش أجيبلك الصوت 😢 جرب تاني.");
                    }
                } catch (error) {
                    console.error("API Error:", error);
                    reply("💀 الدنيا هنجت مني.. جرب تاني كده أو اصبر شوية.");
                }
            }
        };

        conn.ev.on("messages.upsert", messageHandler);

    } catch (error) {
        console.error("Command Error:", error);
        reply("❌ في حاجه ضربت ف المخ 🤯.. جرب تاني.");
    }
});