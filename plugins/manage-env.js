//---------------------------------------------------------------------------
//           GOTAR-XMD
//---------------------------------------------------------------------------
//  ⚠️ DO NOT MODIFY THIS FILE ⚠️  
//---------------------------------------------------------------------------
const { cmd, commands } = require('../command');
const config = require('../config');
const prefix = config.PREFIX;
const fs = require('fs');
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, sleep, fetchJson } = require('../lib/functions2');
const { writeFileSync } = require('fs');
const path = require('path');

cmd({
    pattern: "اشعار-ادمان",
    alias: ["adminevents"],
    desc: "تشغيل أو تعطيل اشعارات دخول وخروج الأدمنية",
    category: "settings",
    filename: __filename
},
async (conn, mek, m, { from, args, isCreator, reply }) => {
    if (!isCreator) return reply("👮‍♂️ مش بسمع غير كلام عمك لوسيفر يا حب، ملكش صلاحية للأمر ده");

    const status = args[0]?.toLowerCase();

    if (status === "on") {
        config.ADMIN_EVENTS = "true";
        return reply(`✅ اشعارات دخول وخروج الأدمنية اتفعلت يا وحش 💀\nأي حد هيرفع أو ينزل، البوت هيبلغ 👀`);
    } else if (status === "off") {
        config.ADMIN_EVENTS = "false";
        return reply(`❌ اشعارات الأدمنية اتقفلت خلاص 🤫\nمش هيقول لمين دخل ومين خرج ✋`);
    } else {
        return reply(`💡 مثال يا حب:\n*.admin-events on*\n👆 عشان تفعل\n*.admin-events off*\n👆 عشان توقف`);
    }
});

cmd({
    pattern: "ترحيب",
    alias: ["welcomeset"],
    desc: "تشغيل أو تعطيل رسائل الترحيب بالأعضاء الجدد",
    category: "settings",
    filename: __filename
},
async (conn, mek, m, { from, args, isCreator, reply }) => {
    if (!isCreator) return reply("📛 مش بسمع غير كلام عمك لوسيفر والمساعدين بتوعه 🤫");

    const status = args[0]?.toLowerCase();

    if (status === "on") {
        config.WELCOME = "true";
        return reply("✅ الترحيب بالأعضاء الجداد اتفعل يا حب ✨\nالبوت هيستقبل أي ضيف جديد في الجروب 😎");
    } else if (status === "off") {
        config.WELCOME = "false";
        return reply("❌ تم قفل رسائل الترحيب ✋\nمحدش هيتهللله تاني وهو داخل 😂");
    } else {
        return reply(`💡 استخدم الأمر كده يا نجم:\n*.welcome on* ← لتشغيل الترحيب\n*.welcome off* ← لقفل الترحيب`);
    }
});

cmd({
    pattern: "بدائيه",
    alias: ["prefix"],
    react: "🔧",
    desc: "تغيير البادئة (Prefix) بتاعة أوامر البوت.",
    category: "settings",
    filename: __filename,
}, async (conn, mek, m, { from, args, isCreator, reply }) => {
    if (!isCreator) return reply("📛 مش بسمع غير كلام عمك لوسيفر يلا ومساعدين بتوعه 🤫 🖕🏻");

    const newPrefix = args[0]; // البادئة الجديدة
    if (!newPrefix) return reply("❌ فين البادئة يا حب؟!\nمثال: *⎔ .setprefix !*");

    config.PREFIX = newPrefix; // تحديث البادئة في الإعدادات

    return reply(`✅ تم تغيير البادئة بنجاح لـ *${newPrefix}* 🔥\nجرب أي أمر بالبادئة الجديدة وشوف السحر شغال 💀`);
});

cmd({
    pattern: "وضع",
    alias: ["mode"],
    react: "🫟",
    desc: "تغيير وضع البوت (برايفت / بابليك).",
    category: "settings",
    filename: __filename,
}, async (conn, mek, m, { from, args, isCreator, reply }) => {
    if (!isCreator) return reply("📛 مش بسمع غير كلام عمك لوسيفر والمساعدين بتوعه يا نجم 🤫💀");

    if (!args[0]) {
        return reply(`👾 الوضع الحالي للبوت: *${config.MODE.toUpperCase()}*\n\nاستخدم: ⎔ .mode private\nأو: ⎔ .mode public`);
    }

    const modeArg = args[0].toLowerCase();

    if (modeArg === "private") {
        config.MODE = "private";
        return reply("🔒 تم تحويل البوت لوضع *برايفت*.\nمحدش هيعرف يستخدمه غيرك يا معلم 😎");
    } else if (modeArg === "public") {
        config.MODE = "public";
        return reply("🌐 تم تحويل البوت لوضع *بابليك*.\nسيب الناس تجرب سحر عمك لوسيفر 💀🔥");
    } else {
        return reply("❌ الوضع اللي كتبته مش مفهوم يا حب، جرب:\n⎔ .mode private\n⎔ .mode public");
    }
});

cmd({
    pattern: "كتب-تلقائي",
    alias: ["auto-typing", "autotype"],
    react: "✍️",
    desc: "تشغيل أو إيقاف الكتابة التلقائية.",
    category: "settings",
    filename: __filename
},
async (conn, mek, m, { from, args, isCreator, reply }) => {
    if (!isCreator) return reply("📛 مش بسمع غير كلام عمك لوسيفر يا نجم 🤫💀");

    const status = args[0]?.toLowerCase();
    if (!["on", "off"].includes(status)) {
        return reply("✍️ مثال: ⎔ .auto-typing on\n🔕 أو: ⎔ .auto-typing off");
    }

    config.AUTO_TYPING = status === "on" ? "true" : "false";
    return reply(`✍️ تم ${status === "on" ? "*تشغيل*" : "*إيقاف*"} ميزة الكتابة التلقائية للبوت 💀🔥`);
});

//mention reply 


cmd({
    pattern: "رد-علي-المنشن",
    alias: ["mention-reply", "mee", "رد-عند-المنشن"],
    react: "📢",
    desc: "تشغيل أو إيقاف رد البوت لما حد يعمل له منشن.",
    category: "settings",
    filename: __filename
},    
async (conn, mek, m, { from, args, isCreator, reply }) => {
    if (!isCreator) return reply("📛 مش بسمع غير كلام عمك لوسيفر والمساعدين بتوعه يا حب 🤫💀");

    const status = args[0]?.toLowerCase();

    if (status === "on") {
        config.MENTION_REPLY = "true";
        return reply("📢 تم تشغيل ميزة الرد وقت المنشن.\nأي حد ينادي عليك هيرد عليه البوت 💀🔥");
    } else if (status === "off") {
        config.MENTION_REPLY = "false";
        return reply("🔕 تم إيقاف ميزة الرد وقت المنشن.\nالبوت مش هيرد على حد لو ندهله 😶‍🌫️");
    } else {
        return reply("📌 مثال للاستخدام:\n⎔ .mee on\n⎔ .mee off");
    }
});


//--------------------------------------------
// ALWAYS_ONLINE COMMANDS
//--------------------------------------------
cmd({
  pattern: "اونلاين-تلقائي",
  alias: ["alwaysonline", "اونلاين-دايم"],
  desc: "تشغيل أو إيقاف وضع أونلاين دايم.",
  category: "settings",
  filename: __filename
},
async (conn, mek, m, { from, args, isCreator, reply }) => {
  if (!isCreator) return reply("📛 مش بسمع غير كلام عمك لوسيفر يلا ومساعدين بتوعه 🤫🖕🏻");

  const status = args[0]?.toLowerCase();

  if (status === "on") {
    config.ALWAYS_ONLINE = "true";
    await reply("✅ *عمك لوسيفر بقا أونلاين دايم يا معلم 🔥*\nمش هينام تاني 😂💀");
  } else if (status === "off") {
    config.ALWAYS_ONLINE = "false";
    await reply("❌ *الوضع الأونلاين اتقفل.*\nعمك لوسيفر أخد أجازة شوية 😴🛌");
  } else {
    await reply("📝 الاستخدام:\n⎔ .always-online on\n⎔ .always-online off");
  }
});

//--------------------------------------------
//  AUTO_RECORDING COMMANDS
//--------------------------------------------
cmd({
    pattern: "ريكورد-تلقائي",
    alias: ["autorecoding", "تسجيل-تلقائي"],
    description: "تشغيل أو إيقاف وضع التسجيل التلقائي.",
    category: "settings",
    filename: __filename
},
async (conn, mek, m, { from, args, isCreator, reply }) => {
    if (!isCreator) return reply("📛 مش بسمع غير كلام عمك لوسيفر يلا ومساعدين بتوعه 🤫🖕🏻");

    const status = args[0]?.toLowerCase();
    if (!["on", "off"].includes(status)) {
        return reply("📝 الاستخدام:\n⎔ .auto-recording on\n⎔ .auto-recording off");
    }

    config.AUTO_RECORDING = status === "on" ? "true" : "false";

    if (status === "on") {
        await conn.sendPresenceUpdate("recording", from);
        return reply("🎙️ *وضع التسجيل اشتغل يا كلب ✍️*\nعمك لوسيفر بيسجل دلوقتي 😂💀");
    } else {
        await conn.sendPresenceUpdate("available", from);
        return reply("🛑 *وضع التسجيل اتقفل يا صاحبي ✋*\nعمك لوسيفر خلاص وقف تسجيل ✨");
    }
});
//--------------------------------------------
// AUTO_VIEW_STATUS COMMANDS
//--------------------------------------------
cmd({
    pattern: "سيين-تلقائي",
    alias: ["autostatusview", "رؤية-تلقائية"],
    desc: "تشغيل أو إيقاف ميزة مشاهدة الحالات تلقائياً",
    category: "settings",
    filename: __filename
},    
async (conn, mek, m, { from, args, isCreator, reply }) => {
    if (!isCreator) return reply("📛 مش بسمع غير كلام عمك لوسيفر يلا ومساعدين بتوعه 🤫🖕🏻");

    const status = args[0]?.toLowerCase();

    if (status === "on") {
        config.AUTO_STATUS_SEEN = "true";
        return reply("👁️ *وضع المشاهدة التلقائية اشتغل يا كبير 🔥*\nعمك لوسيفر هيشوف كل الستوريهات ✨");
    } else if (status === "off") {
        config.AUTO_STATUS_SEEN = "false";
        return reply("🛑 *وضع المشاهدة التلقائية اتقفل خلاص يا باشا ✋*\nعمك لوسيفر مش هيبص على حاجه 😂");
    } else {
        return reply("📝 الاستخدام:\n⎔ .auto-seen on\n⎔ .auto-seen off");
    }
});
//--------------------------------------------
// AUTO_LIKE_STATUS COMMANDS
//--------------------------------------------
cmd({
    pattern: "رياكت-استوري-تلقائي",
    alias: ["statusreaction", "تفاعل-الحالات"],
    desc: "تشغيل أو إيقاف التفاعل التلقائي مع الحالات (الستوريهات)",
    category: "settings",
    filename: __filename
},    
async (conn, mek, m, { from, args, isCreator, reply }) => {
    if (!isCreator) return reply("📛 مش بسمع غير كلام عمك لوسيفر يلا ومساعدين بتوعه 🤫🖕🏻");

    const status = args[0]?.toLowerCase();

    if (status === "on") {
        config.AUTO_STATUS_REACT = "true";
        return reply("❤️ *عمك لوسيفر هيبدأ يوزّع لايكات عالستوريهات 😂🔥*");
    } else if (status === "off") {
        config.AUTO_STATUS_REACT = "false";
        return reply("💤 *خلاص وقفنا التفاعل مع الستوريهات، لوسيفر مش فاضي دلوقتي 😴*");
    } else {
        return reply("📝 الاستخدام:\n⎔ .status-react on\n⎔ .status-react off");
    }
});

//--------------------------------------------
//  READ-MESSAGE COMMANDS
//--------------------------------------------
cmd({
    pattern: "قراءة-الرسائل",
    alias: ["autoread", "قراءة-الرسائل"],
    desc: "تشغيل أو إيقاف قراءة الرسائل تلقائيًا",
    category: "settings",
    filename: __filename
},    
async (conn, mek, m, { from, args, isCreator, reply }) => {
    if (!isCreator) return reply("📛 مش بسمع غير كلام عمك لوسيفر يلا ومساعدين بتوعه 🤫🖕🏻");

    const status = args[0]?.toLowerCase();

    if (status === "on") {
        config.READ_MESSAGE = "true";
        return reply("📩 *تمام يا كبير، لوسيفر هيبدأ يقرا كل رسالة توصله زي المحقق كونان 😂🔍*");
    } else if (status === "off") {
        config.READ_MESSAGE = "false";
        return reply("🙈 *وقفنا قراءة الرسائل، عمك لوسيفر مش فاضي لكل شوية طقة 💀*");
    } else {
        return reply("📝 الاستخدام:\n⎔ .read-message on\n⎔ .read-message off");
    }
});

// AUTO_VOICE

cmd({
    pattern: "فويس-تلقائي",
    alias: ["autovoice", "صوت-تلقائي"],
    desc: "تشغيل أو إيقاف تحويل الرسائل لصوت تلقائيًا",
    category: "settings",
    filename: __filename
},    
async (conn, mek, m, { from, args, isCreator, reply }) => {
    if (!isCreator) return reply("📛 مش بسمع غير كلام عمك لوسيفر يلا ومساعدين بتوعه 🤫🖕🏻");

    const status = args[0]?.toLowerCase();

    if (status === "on") {
        config.AUTO_VOICE = "true";
        return reply("🎤 *تمام يا كبير، كل رسالة هتتقال بصوت بصوتك بقى ولا صوتي؟ 😂🔊*");
    } else if (status === "off") {
        config.AUTO_VOICE = "false";
        return reply("🤐 *وقفنا الصوت التلقائي، لوسيفر مش هيقول ولا كلمة دلوقتي 💀*");
    } else {
        return reply("📝 الاستخدام:\n⎔ .auto-voice on\n⎔ .auto-voice off");
    }
});


//--------------------------------------------
//  ANI-BAD COMMANDS
//--------------------------------------------
cmd({
    pattern: "نظام-منع-الشتايم",
    alias: ["antibadword", "منع-الشتيمة"],
    desc: "تشغيل أو إيقاف ميزة منع الألفاظ الوحشة",
    category: "settings",
    filename: __filename
},    
async (conn, mek, m, { from, args, isCreator, reply }) => {
    if (!isCreator) return reply("📛 مش بسمع غير كلام عمك لوسيفر يلا ومساعدين بتوعه 🤫🖕🏻");

    const status = args[0]?.toLowerCase();

    if (status === "on") {
        config.ANTI_BAD_WORD = "true";
        return reply("🧼 *تم تشغيل نظام غسيل الألسنة... أي شتيمة وهتتاخد على دماغك 😂*");
    } else if (status === "off") {
        config.ANTI_BAD_WORD = "false";
        return reply("😶 *وقفنا نظام منع الشتيمة، خدو راحتكم بقى يا زبالة 😏*");
    } else {
        return reply("📝 الاستخدام:\n⎔ .anti-bad on\n⎔ .anti-bad off");
    }
});
//--------------------------------------------
//  AUTO-STICKER COMMANDS
//--------------------------------------------
cmd({
    pattern: "استيكر-تلقائي",
    alias: ["autosticker", "تحويل-تلقائي"],
    desc: "تشغيل أو إيقاف تحويل الصور/الفيديوهات لملصقات تلقائيًا",
    category: "settings",
    filename: __filename
},    
async (conn, mek, m, { from, args, isCreator, reply }) => {
    if (!isCreator) return reply("📛 مش بسمع غير كلام عمك لوسيفر يلا ومساعدين بتوعه 🤫🖕🏻");

    const status = args[0]?.toLowerCase();

    if (status === "on") {
        config.AUTO_STICKER = "true";
        return reply("✨ *شغلت تحويل الصور لستيكر تلقائي، كل حاجه هتتلزق دلوقتي 😂*");
    } else if (status === "off") {
        config.AUTO_STICKER = "false";
        return reply("🛑 *قفلنا التحويل التلقائي، خدو نفسكم بقى يا فنانين 🎨*");
    } else {
        return reply("📝 الاستخدام:\n⎔ .auto-sticker on\n⎔ .auto-sticker off");
    }
});
//--------------------------------------------
//  AUTO-REPLY COMMANDS
//--------------------------------------------
cmd({
  pattern: "رد-تلقائي",
  alias: ["autoreply", "رد-تلقائي"],
  desc: "تشغيل أو إيقاف نظام الرد التلقائي.",
  category: "settings",
  filename: __filename
},    
async (conn, mek, m, { from, args, isCreator, reply }) => {
  if (!isCreator) return reply("📛 مش بسمع غير كلام عمك لوسيفر يلا ومساعدين بتوعه 🤫🖕🏻");

  const status = args[0]?.toLowerCase();

  if (status === "on") {
    config.AUTO_REPLY = "true";
    return reply("✅ *نظام الرد التلقائي اشتغل.*\nأي كلمة هتتقال، عمك لوسيفر هيرد بطريقته 😂🔥");
  } else if (status === "off") {
    config.AUTO_REPLY = "false";
    return reply("❌ *تم فصل نظام الرد التلقائي.*\nالواد لوسيفر دخل في المود الصامت 😴✋");
  } else {
    return reply("📝 الاستخدام الصح:\n⎔ .auto-reply on\n⎔ .auto-reply off");
  }
});

//--------------------------------------------
//   AUTO-REACT COMMANDS
//--------------------------------------------
cmd({
  pattern: "تفاعل-تلقائي",
  alias: ["autoreact", "تفاعل-تلقائي"],
  desc: "تشغيل أو إيقاف نظام التفاعل التلقائي مع الرسائل.",
  category: "settings",
  filename: __filename
},    
async (conn, mek, m, { from, args, isCreator, reply }) => {
  if (!isCreator) return reply("📛 مش بسمع غير كلام عمك لوسيفر يا نجم 🤫💀");

  const status = args[0]?.toLowerCase();

  if (status === "on") {
    config.AUTO_REACT = "true";
    await reply("✅ *نظام التفاعل التلقائي اشتغل.*\nسيب عمك لوسيفر يتفاعل مع الناس بدماغه 😂🔥");
  } else if (status === "off") {
    config.AUTO_REACT = "false";
    await reply("❌ *تم فصل نظام التفاعل التلقائي.*\nولا تفاعل ولا حاجة يا نجم 😅✋");
  } else {
    await reply("📝 الاستخدام الصح:\n⎔ .auto-react on\n⎔ .auto-react off");
  }
});
//--------------------------------------------
//  STATUS-REPLY COMMANDS
//--------------------------------------------
cmd({
  pattern: "نظام-رد-الحالات-التلقائي",
  alias: ["autostatusreply", "رد-ع-الحالات"],
  desc: "تشغيل أو إيقاف الرد التلقائي على الحالات (الاستوري).",
  category: "settings",
  filename: __filename
},    
async (conn, mek, m, { from, args, isCreator, reply }) => {
  if (!isCreator) return reply("📛 مش بسمع غير كلام عمك لوسيفر يا معلم 🤫💀");

  const status = args[0]?.toLowerCase();
  
  if (status === "on") {
    config.AUTO_STATUS_REPLY = "true";
    return reply("📢 نظام *الرد التلقائي على الحالات* اشتغل.\nأي حد ينزل حالة هيرد عليه عمك لوسيفر 😂🔥");
  } else if (status === "off") {
    config.AUTO_STATUS_REPLY = "false";
    return reply("❌ تم إيقاف *الرد التلقائي على الحالات*.\nبس لو حد استاهل رد، متقلقش هنتصرف 😈");
  } else {
    return reply("📝 الاستخدام الصح:\n⎔ .status-reply on\n⎔ .status-reply off");
  }
});

//--------------------------------------------
//  ANTILINK COMMANDS
//--------------------------------------------

cmd({
  pattern: "نظام-منع-الروابط",
  alias: ["منع-الروابط", "antilinks"],
  desc: "تشغيل أو إيقاف نظام منع الروابط في الجروب",
  category: "group",
  react: "🚫",
  filename: __filename
}, async (conn, mek, m, { isGroup, isAdmins, isBotAdmins, args, reply }) => {
  try {
    if (!isGroup) return reply("📛 الأمر ده للجروبات بس يا حب 💀");
    if (!isBotAdmins) return reply("⚠️ البوت لازم يكون أدمن الأول يا نجم، مش هينفع كده 😤");
    if (!isAdmins) return reply("🙅‍♂️ إنت مش أدمن هنا، روح نادي عمك لوسيفر أو المساعدين 🤫");

    const status = args[0]?.toLowerCase();
    if (status === "on") {
      config.ANTI_LINK = "true";
      reply("✅ نظام *منع الروابط* اشتغل خلاص.\nاللي ينزل رابط هيتاخد على قفاه قريب 😈");
    } else if (status === "off") {
      config.ANTI_LINK = "false";
      reply("❌ تم *إيقاف منع الروابط* مؤقتًا.\nبس إياكوا تلعبوا بديلكوا 😒");
    } else {
      reply("📌 الاستخدام:\n⎔ .antilink on\n⎔ .antilink off");
    }
  } catch (e) {
    reply(`❌ حصلت مصيبة:\n${e.message}`);
  }
});

cmd({
  pattern: "نظام-طرد-الروابط",
  alias: ["kicklink", "طرد-الروابط"],
  desc: "تشغيل أو إيقاف نظام الطرد التلقائي لنشر الروابط",
  category: "group",
  react: "🚫",
  filename: __filename
}, async (conn, mek, m, { isGroup, isAdmins, isBotAdmins, args, reply }) => {
  try {
    if (!isGroup) return reply("📛 يا نجم، الأمر ده مخصص للجروبات بس 💀");
    if (!isBotAdmins) return reply("⚠️ البوت لازم يكون أدمن عشان يطرد الناس اللي بتنزل روابط!");
    if (!isAdmins) return reply("🙅‍♂️ أنت مش أدمن يا حبي، سيب الإدارة لعمك لوسيفر والمساعدين بتوعه 🤫");

    const status = args[0]?.toLowerCase();
    if (status === "on") {
      config.ANTI_LINK_KICK = "true";
      reply("✅ نظام الطرد التلقائي شغال دلوقتي.\nاللي ينزل رابط هيتطرد في ساعتها 💣💀");
    } else if (status === "off") {
      config.ANTI_LINK_KICK = "false";
      reply("❌ تم إيقاف الطرد التلقائي مؤقتًا.\nخليكم محترمين بس يا حبايب عمكم 😎");
    } else {
      reply("📌 الاستخدام:\n⎔ .antilinkkick on\n⎔ .antilinkkick off");
    }
  } catch (e) {
    reply(`❌ حصلت مشكلة جامدة:\n${e.message}`);
  }
});


cmd({
  pattern: "نظام-مسح-الروابط",
  alias: ["linksdelete", "مسح-الروابط"],
  desc: "تشغيل أو إيقاف خاصية مسح الروابط في الجروب",
  category: "group",
  react: "🧹",
  filename: __filename
}, async (conn, mek, m, { isGroup, isAdmins, isBotAdmins, args, reply }) => {
  try {
    if (!isGroup) return reply("📛 الأمر ده للجروبات بس يا حب متفتيش برا الجروب 💀");
    if (!isBotAdmins) return reply("⚠️ لازم البوت يكون أدمن عشان يعرف يمسح الروابط!");
    if (!isAdmins) return reply("🙅‍♂️ أنت مش أدمن يا قلب عمك لوسيفر، متدخلش في شغل الكبار 🤫");

    const status = args[0]?.toLowerCase();
    if (status === "on") {
      config.DELETE_LINKS = "true";
      reply("✅ تم تشغيل نظام مسح الروابط.\nاللي ينزل رابط هيتبهدل يا نجم 💣");
    } else if (status === "off") {
      config.DELETE_LINKS = "false";
      reply("❌ تم إيقاف نظام مسح الروابط.\nعيشوا براحتكم مؤقتًا 😎");
    } else {
      reply("📌 الاستخدام الصح:\n⎔ .deletelink on\n⎔ .deletelink off");
    }

  } catch (e) {
    reply(`❌ حصلت مشكلة يا كبير:\n${e.message}`);
  }
});