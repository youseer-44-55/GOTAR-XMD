const { cmd } = require('../command');
const config = require('../config');
const prefix = config.PREFIX;

cmd({
  pattern: "جروب",
  category: "group",
  desc: "Create a group with specified members.",
  filename: __filename,
  use: `${prefix}اعمل-جروب اسم_الجروب + رقم1,رقم2`,
  owner: true,
}, async (conn, mek, m, { body, sender, isOwner, reply }) => {
  try {
    if (!isOwner) return reply("❌ يا عم دا أمر للمطور وبس 😒✋");

    if (!body.includes("+")) return reply(`ℹ️ الاستخدام الصح: ${prefix}اعمل-جروب اسم_الجروب + رقم1,رقم2`);

    const [groupNameRaw, numbersRaw] = body.split("+");
    const groupName = groupNameRaw.trim();
    const numberList = numbersRaw.split(",").map(n => n.trim()).filter(n => /^\d+$/.test(n));

    if (!groupName || numberList.length === 0) return reply("😑 لازم تكتب اسم الجروب وكمان رقم واحد على الأقل يا نجم ✨");

    const participants = numberList.map(n => `${n}@s.whatsapp.net`);

    const group = await conn.groupCreate(groupName, participants);
    const inviteCode = await conn.groupInviteCode(group.id);

    await conn.groupUpdateDescription(group.id, `الجروب دا معمول بإيد عمكم @${sender.split('@')[0]} 💪`);

    await conn.sendMessage(group.id, {
      text: `👋 *أهلاً بيكم في جروب "${groupName}"* \nاللي عمله: @${sender.split('@')[0]} 👑`,
      mentions: [sender]
    });

    return reply(`╭━━━〔 ✅ *الجروب اتعمل تمام* 〕━━⬣
┃📛 *الاسم:* ${groupName}
┃👥 *عدد اللي دخلوا:* ${numberList.length}
┃
┃📎 *رابط الدعوة:*
┃https://chat.whatsapp.com/${inviteCode}
╰━━━━━━━━━━━━━━━━━━━━⬣

🎉 الجروب شغال تمام!
👤 انت المؤسس يا كبير.
🚀 ابعت اللينك للناس وخلي الدنيا تولع 🔥`);
    
  } catch (e) {
    console.error(e);
    return reply(`❌ حصلت مشكلة وإحنا بنعمل الجروب 😥\n\n📄 *التفاصيل:* ${e.message}`);
  }
});