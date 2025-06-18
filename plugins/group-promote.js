const { cmd } = require('../command');  
  
cmd({  
    pattern: "ارفع",  
    alias: ["مشرف", "makeadmin"],  
    desc: "ترقية عضو لمرتبة مشرف في الجروب",  
    category: "group",  
    react: "⬆️",  
    filename: __filename  
},  
async(conn, mek, m, {  
    from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isCreator, isDev, isAdmins, reply  
}) => {  
    // تأكد إذا كان الأمر في جروب  
    if (!isGroup) return reply("❌ يا باشا ده بس في الجروبات، مش في الشات العادي 😂.");

    // تأكد إذا كان المستخدم أدمن في الجروب  
    if (!isAdmins) return reply("❌ مش بسمع غير كلام المشرفين، يعني لازم تكون مشرف عشان تستخدم الأمر ده 💪.");

    // تأكد إذا كان البوت نفسه مشرف  
    if (!isBotAdmins) return reply("❌ يا عم البوت مش مشرف، إزاي أرقّي غيري وأنا مش في الرول؟ 🙄");

    let number;  
    if (m.quoted) {  
        number = m.quoted.sender.split("@")[0]; // لو رد على رسالة، خد رقم المرسل  
    } else if (q && q.includes("@")) {  
        number = q.replace(/[@\s]/g, ''); // لو كتبت الرقم يدوي  
    } else {  
        return reply("❌ رد على رسالة أو بعتلي رقم عشان أرقّي، مش كده مش هينفع 😎.");  
    }  
  
    // لو حاولت ترقي البوت نفسه  
    if (number === botNumber) return reply("❌ مفيش ترقيه للبوت، يعني مش هنرفعه عشان يعمل معانا الشو 😂.");

    const jid = number + "@s.whatsapp.net";  
  
    try {  
        await conn.groupParticipantsUpdate(from, [jid], "promote");  
        reply(`✅ **واااااااااااااااااااااااااااااااااااااااااااااااااااااااااااااااااااااااا** @${number} بقى مشرف 🎉🔥، قولي بقى إيه رأيك؟ 😎💥`, { mentions: [jid] });  
    } catch (error) {  
        console.error("Promote command error:", error);  
        reply("❌ **أوف فشلنا** في ترقيه العضو ده، حاول تاني ياباشا 😉.");  
    }  
});