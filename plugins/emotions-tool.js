const { cmd } = require('../command');

cmd({
    pattern: "فرحان",
    alias: ["happy"],
    desc: "عرض تأثير فرحة متحرك 😂",
    category: "tools",
    react: "🥳",
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {
        const startMsg = await conn.sendMessage(from, { text: 'يلا نفرح سوا 😂🔥' });

        const emojiFrames = [
            "😃", "😄", "😁", "😆", "🤣", "😂",
            "😊", "😍", "🥳", "😎", "🌈", "🌞",
            "💃", "🕺", "🎉", "🎊", "🔥", "💥"
        ];

        for (const emoji of emojiFrames) {
            await new Promise(resolve => setTimeout(resolve, 500)); // أسرع شوية
            await conn.relayMessage(
                from,
                {
                    protocolMessage: {
                        key: startMsg.key,
                        type: 14,
                        editedMessage: {
                            conversation: emoji,
                        },
                    },
                },
                {}
            );
        }

        // رسالة ختامية
        await new Promise(resolve => setTimeout(resolve, 700));
        await conn.relayMessage(
            from,
            {
                protocolMessage: {
                    key: startMsg.key,
                    type: 14,
                    editedMessage: {
                        conversation: "خلصنا الفرحة 🎉😂\n*عمك لوسيفر دايمًا بيضحكك 💀♥️*",
                    },
                },
            },
            {}
        );

    } catch (e) {
        console.error("Error in فرحة command:", e);
        reply(`❌ حصلت مشكلة يا كبير: ${e.message}`);
    }
});

cmd({
    pattern: "قلبي",
    alias: ["heart"],
    desc: "عرض قلوب متحركة بشياكة 🥰",
    category: "fun",
    react: "❤️",
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {
        const firstMsg = await conn.sendMessage(from, { text: '❤️ عمك لوسيفر بيحبكم 💀' });

        const hearts = [
            "💖", "💗", "💕", "🩷", "💛", "💚",
            "🩵", "💙", "💜", "🖤", "🩶", "🤍",
            "🤎", "❤️‍🔥", "💞", "💓", "💘", "💝",
            "♥️", "💟", "❤️‍🩹", "❤️"
        ];

        for (const h of hearts) {
            await new Promise(r => setTimeout(r, 700));
            await conn.relayMessage(
                from,
                {
                    protocolMessage: {
                        key: firstMsg.key,
                        type: 14,
                        editedMessage: {
                            conversation: `💗 ${h} من لوسيفر ليكم ${h} 💗`
                        }
                    }
                },
                {}
            );
        }

        // الرسالة النهائية
        await new Promise(r => setTimeout(r, 800));
        await conn.relayMessage(
            from,
            {
                protocolMessage: {
                    key: firstMsg.key,
                    type: 14,
                    editedMessage: {
                        conversation: `💘 خلصنا عرض القلوب يا قمر 💘\nمن عمكم لوسيفر 🖤`
                    }
                }
            },
            {}
        );
    } catch (e) {
        console.error("Error in heart command:", e);
        reply(`❌ حصلت مشكلة: ${e.message}`);
    }
});

cmd({
    pattern: "مضايق",
    alias: ["angry"],
    desc: "عرض إيموجيات الغضب والانفجار 😂🔥",
    category: "fun",
    react: "🤬",
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {
        const msg = await conn.sendMessage(from, { text: '😤 عمك لوسيفر متنرفز 🥵' });

        const angryFaces = [
            "😡", "😠", "🤬", "😤", "😾",
            "👿", "🔥", "💢", "😡", "🤯"
        ];

        for (const em of angryFaces) {
            await new Promise(r => setTimeout(r, 700));
            await conn.relayMessage(
                from,
                {
                    protocolMessage: {
                        key: msg.key,
                        type: 14,
                        editedMessage: {
                            conversation: `💢 ${em} اعصب ياعم ${em} 💢`
                        }
                    }
                },
                {}
            );
        }

        // رسالة الختام
        await new Promise(r => setTimeout(r, 800));
        await conn.relayMessage(
            from,
            {
                protocolMessage: {
                    key: msg.key,
                    type: 14,
                    editedMessage: {
                        conversation: `😤 هديت خلاص... بس متستفزوش لوسيفر تاني يا ولاد 😂💀`
                    }
                }
            },
            {}
        );

    } catch (e) {
        console.error("Error in angry command:", e.message);
        reply(`❌ حصلت مشكلة: ${e.message}`);
    }
});

cmd({
    pattern: "زعلان",
    alias: ["sad"],
    desc: "عرض إيموجيات الزعل والقهر بشكل درامي 😂💔",
    category: "fun",
    react: "😭",
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {
        const msg = await conn.sendMessage(from, { text: '🥺 عمك لوسيفر مزعل 😭' });

        const sadFaces = [
            "🥺", "😟", "😕", "😖", "😫", "🙁",
            "😩", "😥", "😓", "😪", "😢", "😔",
            "😞", "😭", "💔", "😭", "😿", "💔"
        ];

        for (const em of sadFaces) {
            await new Promise(r => setTimeout(r, 1000));
            await conn.relayMessage(
                from,
                {
                    protocolMessage: {
                        key: msg.key,
                        type: 14,
                        editedMessage: {
                            conversation: `${em} قهرتني يا ولاااااااااااااد ${em}`
                        }
                    }
                },
                {}
            );
        }

        // النهاية
        await new Promise(r => setTimeout(r, 1000));
        await conn.relayMessage(
            from,
            {
                protocolMessage: {
                    key: msg.key,
                    type: 14,
                    editedMessage: {
                        conversation: "😭 بس عمكم لوسيفر بيرجع يقف تاني... متقلقوش 🖤"
                    }
                }
            },
            {}
        );

    } catch (e) {
        console.error("Error in sad command:", e.message);
        reply(`❌ حصلت مشكلة: ${e.message}`);
    }
});

cmd({
    pattern: "مكسوف",
    alias: ["shy"],
    desc: "عرض إيموجيات الخجل بتاع عمك لوسيفر 🥹",
    category: "fun",
    react: "🥹",
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {
        const msg = await conn.sendMessage(from, { text: '🥹 انا مكسوف اوي 😳' });

        const shyFaces = [
            "😳", "😊", "😶", "🙈", "🙊",
            "😳", "😊", "😶", "🙈", "🙊"
        ];

        for (const em of shyFaces) {
            await new Promise(r => setTimeout(r, 1000));
            await conn.relayMessage(
                from,
                {
                    protocolMessage: {
                        key: msg.key,
                        type: 14,
                        editedMessage: {
                            conversation: `${em} لا يا عم متحرجنيش بقا ${em}`
                        }
                    }
                },
                {}
            );
        }

        await new Promise(r => setTimeout(r, 1000));
        await conn.relayMessage(
            from,
            {
                protocolMessage: {
                    key: msg.key,
                    type: 14,
                    editedMessage: {
                        conversation: "🙊 الكسفه راحت ✋😂"
                    }
                }
            },
            {}
        );

    } catch (e) {
        console.log("Error in shy command:", e.message);
        reply(`❌ حصلت مشكلة: ${e.message}`);
    }
});

cmd({
    pattern: "قمر",
    alias: ["moon"],
    desc: "عرض مراحل القمر بتاع عمك لوسيفر 🌝🌚",
    category: "fun",
    react: "🌚",
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {
        const msg = await conn.sendMessage(from, { text: '🌝 عمكم لوسيفر طلع القمر 🌝' });

        const moonPhases = [
            "🌗", "🌘", "🌑", "🌒", "🌓", "🌔",
            "🌕", "🌖", "🌗", "🌘", "🌑", "🌒",
            "🌓", "🌔", "🌕", "🌖", "🌗", "🌘",
            "🌑", "🌒", "🌓", "🌔", "🌕", "🌖",
            "🌗", "🌘", "🌑", "🌒", "🌓", "🌔",
            "🌕", "🌖", "🌝🌚"
        ];

        for (const moon of moonPhases) {
            await new Promise(r => setTimeout(r, 1000));
            await conn.relayMessage(
                from,
                {
                    protocolMessage: {
                        key: msg.key,
                        type: 14,
                        editedMessage: {
                            conversation: `عمك لوسيفر بيقولك: ${moon}`
                        },
                    },
                },
                {}
            );
        }

        await new Promise(r => setTimeout(r, 1000));
        await conn.relayMessage(
            from,
            {
                protocolMessage: {
                    key: msg.key,
                    type: 14,
                    editedMessage: {
                        conversation: "🌝🌚 القمر اتشق نصين يامعلم 😂🌚"
                    }
                }
            },
            {}
        );

    } catch (e) {
        console.log("Error in moon command:", e.message);
        reply(`❌ حصلت مشكلة: ${e.message}`);
    }
});

cmd({
    pattern: "محتار",
    alias: ["بفكر"],
    desc: "البوت دخل في حيرة مع عمك لوسيفر 😂🤔",
    category: "fun",
    react: "🤔",
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {
        const msg = await conn.sendMessage(from, { text: '🤔 عمك لوسيفر مش فاهم حاجه 😂' });

        const confusedFaces = [
            "😕", "😟", "😵", "🤔", "😖",
            "😲", "😦", "🤷", "🤷‍♂️", "🤷‍♀️"
        ];

        for (const face of confusedFaces) {
            await new Promise(resolve => setTimeout(resolve, 1000));
            await conn.relayMessage(
                from,
                {
                    protocolMessage: {
                        key: msg.key,
                        type: 14,
                        editedMessage: {
                            conversation: `عمك لوسيفر بيقولك: ${face}`
                        },
                    },
                },
                {}
            );
        }

        await new Promise(resolve => setTimeout(resolve, 1000));
        await conn.relayMessage(
            from,
            {
                protocolMessage: {
                    key: msg.key,
                    type: 14,
                    editedMessage: {
                        conversation: "💀 دماغي سخنت خلاص 😂"
                    }
                }
            },
            {}
        );
        
    } catch (e) {
        console.log("Error in confused command:", e.message);
        reply(`❌ حصلت مشكلة: ${e.message}`);
    }
});

cmd({
    pattern: "مولع",
    alias: ["متيجي"],
    desc: "لوسيفر داخل يسخن الجو 💋🔥",
    category: "fun",
    react: "🥵",
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {
        const msg = await conn.sendMessage(from, { text: 'عمك لوسيفر مولعها 💋🔥' });

        const hotEmojis = [
            "🥵", "❤️", "💋", "😫", "🤤", 
            "😋", "🥵", "🥶", "🙊", "😻", 
            "🙈", "💋", "🫂", "🫀", "👅", 
            "👄", "💋"
        ];

        for (const emo of hotEmojis) {
            await new Promise(resolve => setTimeout(resolve, 1000));
            await conn.relayMessage(
                from,
                {
                    protocolMessage: {
                        key: msg.key,
                        type: 14,
                        editedMessage: {
                            conversation: `🔥 لوسيفر بيقولك: ${emo}`
                        },
                    },
                },
                {}
            );
        }

        await new Promise(resolve => setTimeout(resolve, 1000));
        await conn.relayMessage(
            from,
            {
                protocolMessage: {
                    key: msg.key,
                    type: 14,
                    editedMessage: {
                        conversation: "💀 متيجي بقا 🔥😂"
                    }
                }
            },
            {}
        );

    } catch (e) {
        console.log("Error in hot command:", e.message);
        reply(`❌ حصلت مشكلة: ${e.message}`);
    }
});

cmd({
    pattern: "هزار",
    desc: "Displays a dynamic edit msg for fun.",
    category: "tools",
    react: "🗿",
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {
        const loadingMessage = await conn.sendMessage(from, { text: '⎝⎝⛥ 𝐋𝐔𝐂𝐈𝐅𝐄𝐑 ⛥⎠⎠' });
        
        // Define the ASCII art messages
        const asciiMessages = [
            "⠀⠀⠀⣠⣶⡾⠏⠉⠙⠳⢦⡀⠀⠀⠀⢠⠞⠉⠙⠲⡀⠀\n ⠀⣴⠿⠏⠀⠀⠀⠀⠀     ⢳⡀⠀⡏⠀⠀⠀   ⠀  ⢷\n⢠⣟⣋⡀⢀⣀⣀⡀⠀⣀⡀   ⣧⠀⢸⠀⠀⠀  ⠀    ⡇\n⢸⣯⡭⠁⠸⣛⣟⠆⡴⣻⡲     ⣿  ⣸   Nikal   ⡇\n ⣟⣿⡭⠀⠀⠀⠀⠀⢱⠀⠀      ⣿  ⢹⠀          ⡇\n  ⠙⢿⣯⠄⠀⠀⠀__⠀   ⠀   ⡿ ⠀⡇⠀⠀⠀⠀    ⡼\n⠀⠀⠀⠹⣶⠆⠀⠀⠀⠀⠀⡴⠃⠀   ⠘⠤⣄⣠⠞⠀\n⠀⠀⠀⠀⢸⣷⡦⢤⡤⢤⣞⣁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\n⠀⢀⣤⣴⣿⣏⠁⠀⠀⠸⣏⢯⣷⣖⣦⡀⠀⠀⠀⠀⠀⠀\n⢀⣾⣽⣿⣿⣿⣿⠛⢲⣶⣾⢉⡷⣿⣿⠵⣿⠀⠀⠀⠀⠀⠀\n⣼⣿⠍⠉⣿⡭⠉⠙⢺⣇⣼⡏⠀⠀ ⠀⣄⢸⠀⠀⠀⠀⠀⠀`", "⠀⠀⠀⣠⣶⡾⠏⠉⠙⠳⢦⡀⠀⠀⠀⢠⠞⠉⠙⠲⡀⠀\n ⠀⣴⠿⠏⠀⠀⠀⠀⠀  ⠀  ⢳⡀⠀⡏⠀⠀⠀   ⠀  ⢷\n⢠⣟⣋⡀⢀⣀⣀⡀⠀⣀⡀   ⣧⠀⢸⠀⠀⠀       ⡇\n⢸⣯⡭⠁⠸⣛⣟⠆⡴⣻⡲     ⣿  ⣸   Lavde   ⡇\n ⣟⣿⡭⠀⠀⠀⠀⠀⢱⠀⠀      ⣿  ⢹⠀          ⡇\n  ⠙⢿⣯⠄⠀⠀|__|⠀⠀   ⡿ ⠀⡇⠀⠀⠀⠀    ⡼\n⠀⠀⠀⠹⣶⠆⠀⠀⠀⠀⠀⡴⠃⠀   ⠘⠤⣄⣠⠞⠀\n⠀⠀⠀⠀⢸⣷⡦⢤⡤⢤⣞⣁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\n⠀⢀⣤⣴⣿⣏⠁⠀⠀⠸⣏⢯⣷⣖⣦⡀⠀⠀⠀⠀⠀⠀\n⢀⣾⣽⣿⣿⣿⣿⠛⢲⣶⣾⢉⡷⣿⣿⠵⣿⠀⠀⠀⠀⠀⠀\n⣼⣿⠍⠉⣿⡭⠉⠙⢺⣇⣼⡏⠀⠀ ⠀⣄⢸⠀⠀⠀⠀⠀⠀`", "⠀⠀⠀⣠⣶⡾⠏⠉⠙⠳⢦⡀⠀⠀⠀⢠⠞⠉⠙⠲⡀⠀\n ⠀⣴⠿⠏⠀⠀     ⠀   ⢳⡀⠀⡏⠀⠀    ⠀  ⢷\n⢠⣟⣋⡀⢀⣀⣀⡀⠀⣀⡀   ⣧⠀⢸⠀⠀⠀⠀      ⡇\n⢸⣯⡭⠁⠸⣛⣟⠆⡴⣻⡲    ⣿  ⣸   Pehli   ⡇\n ⣟⣿⡭⠀⠀⠀⠀⠀⢱⠀⠀     ⣿  ⢹⠀           ⡇\n  ⠙⢿⣯⠄⠀⠀(P)⠀⠀     ⡿ ⠀⡇⠀⠀⠀⠀    ⡼\n⠀⠀⠀⠹⣶⠆⠀⠀⠀⠀⠀⡴⠃⠀   ⠘⠤⣄⣠⠞⠀\n⠀⠀⠀⠀⢸⣷⡦⢤⡤⢤⣞⣁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\n⠀⢀⣤⣴⣿⣏⠁⠀⠀⠸⣏⢯⣷⣖⣦⡀⠀⠀⠀⠀⠀⠀\n⢀⣾⣽⣿⣿⣿⣿⠛⢲⣶⣾⢉⡷⣿⣿⠵⣿⠀⠀⠀⠀⠀⠀\n⣼⣿⠍⠉⣿⡭⠉⠙⢺⣇⣼⡏⠀⠀ ⠀⣄⢸⠀⠀⠀⠀⠀⠀`", "⠀⠀⠀⣠⣶⡾⠏⠉⠙⠳⢦⡀⠀⠀⠀⢠⠞⠉⠙⠲⡀⠀\n ⠀⣴⠿⠏⠀⠀     ⠀   ⢳⡀⠀⡏⠀⠀    ⠀  ⢷\n⢠⣟⣋⡀⢀⣀⣀⡀⠀⣀⡀   ⣧⠀⢸⠀   ⠀     ⡇\n⢸⣯⡭⠁⠸⣛⣟⠆⡴⣻⡲    ⣿  ⣸  Fursat  ⡇\n ⣟⣿⡭⠀⠀⠀⠀⠀⢱⠀        ⣿  ⢹⠀          ⡇\n  ⠙⢿⣯⠄⠀⠀⠀__ ⠀  ⠀   ⡿ ⠀⡇⠀⠀⠀⠀    ⡼\n⠀⠀⠀⠹⣶⠆⠀⠀⠀⠀⠀⡴⠃⠀   ⠘⠤⣄⣠⠞⠀\n⠀⠀⠀⠀⢸⣷⡦⢤⡤⢤⣞⣁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\n⠀⢀⣤⣴⣿⣏⠁⠀⠀⠸⣏⢯⣷⣖⣦⡀⠀⠀⠀⠀⠀⠀\n⢀⣾⣽⣿⣿⣿⣿⠛⢲⣶⣾⢉⡷⣿⣿⠵⣿⠀⠀⠀⠀⠀⠀\n⣼⣿⠍⠉⣿⡭⠉⠙⢺⣇⣼⡏⠀⠀ ⠀⣄⢸⠀⠀⠀⠀⠀⠀`", "⠀⠀⠀⣠⣶⡾⠏⠉⠙⠳⢦⡀⠀⠀⠀⢠⠞⠉⠙⠲⡀⠀\n ⠀⣴⠿⠏⠀⠀⠀⠀⠀      ⢳⡀⠀⡏⠀⠀    ⠀  ⢷\n⢠⣟⣋⡀⢀⣀⣀⡀⠀⣀⡀   ⣧⠀⢸⠀⠀ ⠀      ⡇\n⢸⣯⡭⠁⠸⣛⣟⠆⡴⣻⡲    ⣿  ⣸  Meeee   ⡇\n ⣟⣿⡭⠀⠀⠀⠀⠀⢱⠀⠀       ⣿  ⢹⠀          ⡇\n  ⠙⢿⣯⠄⠀⠀|__| ⠀    ⡿ ⠀⡇⠀⠀⠀⠀    ⡼\n⠀⠀⠀⠹⣶⠆⠀⠀⠀⠀⠀⡴⠃⠀   ⠘⠤⣄⣠⠞⠀\n⠀⠀⠀⠀⢸⣷⡦⢤⡤⢤⣞⣁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\n⠀⢀⣤⣴⣿⣏⠁⠀⠀⠸⣏⢯⣷⣖⣦⡀⠀⠀⠀⠀⠀⠀\n⢀⣾⣽⣿⣿⣿⣿⠛⢲⣶⣾⢉⡷⣿⣿⠵⣿⠀⠀⠀⠀⠀⠀\n⣼⣿⠍⠉⣿⡭⠉⠙⢺⣇⣼⡏⠀⠀ ⠀⣄⢸⠀⠀⠀⠀⠀⠀`", "⠀⠀⠀⣠⣶⡾⠏⠉⠙⠳⢦⡀⠀⠀⠀⢠⠞⠉⠙⠲⡀⠀\n ⠀⣴⠿⠏⠀⠀⠀⠀   ⠀  ⠀⢳⡀⠀⡏⠀⠀       ⢷\n⢠⣟⣋⡀⢀⣀⣀⡀⠀⣀⡀   ⣧⠀⢸⠀  ⠀       ⡇\n⢸⣯⡭⠁⠸⣛⣟⠆⡴⣻⡲   ⣿  ⣸   Nikal   ⡇\n ⣟⣿⡭⠀⠀⠀⠀⠀⢱⠀       ⣿  ⢹⠀           ⡇\n  ⠙⢿⣯⠄⠀⠀lodu⠀⠀   ⡿ ⠀⡇⠀⠀⠀⠀   ⡼\n⠀⠀⠀⠹⣶⠆⠀⠀⠀⠀⠀  ⡴⠃⠀   ⠘⠤⣄⣠⠞⠀\n⠀⠀⠀⠀⢸⣷⡦⢤⡤⢤⣞⣁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\n⠀⢀⣤⣴⣿⣏⠁⠀⠀⠸⣏⢯⣷⣖⣦⡀⠀⠀⠀⠀⠀⠀\n⢀⣾⣽⣿⣿⣿⣿⠛⢲⣶⣾⢉⡷⣿⣿⠵⣿⠀⠀⠀⠀⠀⠀\n⣼⣿⠍⠉⣿⡭⠉⠙⢺⣇⣼⡏⠀⠀ ⠀⣄⢸⠀"
        ];

        // Send the initial loading message
        for (const asciiMessage of asciiMessages) {
            await new Promise(resolve => setTimeout(resolve, 500)); // Delay for 500ms second
            await conn.relayMessage(
                from,
                {
                    protocolMessage: {
                        key: loadingMessage.key,
                        type: 14,
                        editedMessage: {
                            conversation: asciiMessage,
                        },
                    },
                },
                {}
            );
        }
    } catch (e) {
        console.log(e);
        reply(`❌ *Error!* ${e.message}`);
    }
});

// > JawadTechX 