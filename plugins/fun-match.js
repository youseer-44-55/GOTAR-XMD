const { cmd } = require("../command");

// Command for random boy selection
cmd({
  pattern: "ولد",
  alias: ["العيل"],
  desc: "يختار ولد عشوائي من الجروب",
  react: "😎",
  category: "مرح",
  filename: __filename
}, async (conn, mek, store, { isGroup, groupMetadata, reply, sender }) => {
  try {
    if (!isGroup) return reply("❌ الأمر ده للجروبات بس يا نجم ✋");

    const participants = groupMetadata.participants;

    // استبعاد البوت
    const eligible = participants.filter(p => !p.id.includes(conn.user.id.split('@')[0]));

    if (eligible.length < 1) return reply("❌ مفيش حد أختاره يا عم ✋");

    const randomUser = eligible[Math.floor(Math.random() * eligible.length)];

    await conn.sendMessage(
      mek.chat,
      { 
        text: `👦 *الواد اللي طلع معانا النهارده هو:* \n\n@${randomUser.id.split('@')[0]} 😎\n\nباين عليه عيل جامد 😂`, 
        mentions: [randomUser.id] 
      },
      { quoted: mek }
    );

  } catch (error) {
    console.error("Error in .ولد command:", error);
    reply(`❌ حصلت حاجه غلط يا نجم:\n${error.message}`);
  }
});

// Command for random girl selection
cmd({
  pattern: "بنت",
  alias: ["الجميلة"],
  desc: "يختار بنت عشوائي من الجروب",
  react: "😍",
  category: "مرح",
  filename: __filename
}, async (conn, mek, store, { isGroup, groupMetadata, reply, sender }) => {
  try {
    if (!isGroup) return reply("❌ الأمر ده للجروبات بس يا روحي ✋");

    const participants = groupMetadata.participants;

    // استبعاد البوت
    const eligible = participants.filter(p => !p.id.includes(conn.user.id.split('@')[0]));

    if (eligible.length < 1) return reply("❌ مفيش بنات أختار منهم يا قلب لوسيفر 💔");

    const randomUser = eligible[Math.floor(Math.random() * eligible.length)];

    await conn.sendMessage(
      mek.chat,
      { 
        text: `👧 *الجميلة اللي طلعت معانا هي:* \n\n@${randomUser.id.split('@')[0]} 😍\n\nإديها بوسة من عمك لوسيفر 💋`, 
        mentions: [randomUser.id] 
      },
      { quoted: mek }
    );

  } catch (error) {
    console.error("Error in .بنت command:", error);
    reply(`❌ فيه حاجة بوظت يا قلبي:\n${error.message}`);
  }
});