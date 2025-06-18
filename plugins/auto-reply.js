const fs = require('fs');
const path = require('path');
const { cmd } = require('../command');

const REPLY_FILE = path.join(__dirname, '../autoreply.json');

// تحميل الردود
function loadReplies() {
  if (!fs.existsSync(REPLY_FILE)) return {};
  return JSON.parse(fs.readFileSync(REPLY_FILE, 'utf-8'));
}

// حفظ الردود
function saveReplies(data) {
  fs.writeFileSync(REPLY_FILE, JSON.stringify(data, null, 2));
}

// ✅ أمر إضافة رد
cmd({
  pattern: 'رد',
  desc: 'إضافة رد تلقائي',
  category: 'الردود',
  filename: __filename
}, async (conn, mek, m, { body, isCreator, reply }) => {
  if (!isCreator) return reply('مش بسمعش غير كلام عمك لوسيفر يلا ومساعدين بتوعو 🤫 🖕🏻');

  const match = body.split('|');
  if (match.length < 3) return reply('❌ الصيغة: رد | الكلمة | الرد');

  const key = match[1].trim();
  const res = match.slice(2).join('|').trim();

  const data = loadReplies();
  if (!data[key]) data[key] = [];

  if (!data[key].includes(res)) {
    data[key].push(res);
    saveReplies(data);
    reply(`✅ تم إضافة الرد على "${key}"`);
  } else {
    reply('❗ الرد ده موجود بالفعل للكلمة دي.');
  }
});

// ✅ أمر حذف رد
cmd({
  pattern: 'حذف',
  desc: 'حذف رد تلقائي',
  category: 'الردود',
  filename: __filename
}, async (conn, mek, m, { body, isCreator, reply }) => {
  if (!isCreator) return reply('مش بسمعش غير كلام عمك لوسيفر يلا ومساعدين بتوعو 🤫 🖕🏻');

  const match = body.split('|');
  if (match.length < 3) return reply('❌ الصيغة: حذف | الكلمة | الرد');

  const key = match[1].trim();
  const res = match.slice(2).join('|').trim();

  const data = loadReplies();
  if (!data[key]) return reply('❌ مفيش ردود للكلمة دي.');

  const index = data[key].indexOf(res);
  if (index === -1) return reply('❌ الرد ده مش موجود للكلمة دي.');

  data[key].splice(index, 1);
  if (data[key].length === 0) delete data[key];

  saveReplies(data);
  reply(`🗑️ تم حذف الرد "${res}" من الكلمة "${key}"`);
});

// ✅ أمر عرض الردود
cmd({
  pattern: 'الردود',
  desc: 'عرض كل الردود المحفوظة',
  category: 'الردود',
  filename: __filename
}, async (conn, mek, m, { isCreator, reply }) => {
  if (!isCreator) return reply('مش بسمعش غير كلام عمك لوسيفر يلا ومساعدين بتوعو 🤫 🖕🏻');

  const data = loadReplies();
  if (Object.keys(data).length === 0) return reply('📭 مفيش أي ردود محفوظة.');

  let text = '*📚 الردود الحالية:*\n\n';
  for (const [key, replies] of Object.entries(data)) {
    text += `🗝️ *${key}*:\n${replies.map(r => `– ${r}`).join('\n')}\n\n`;
  }

  reply(text.trim());
});

// ✅ رد تلقائي
cmd({
  pattern: '.*',
  dontAddCommandList: true,
  type: 'autorespond',
  filename: __filename
}, async (conn, mek, m, { body, reply }) => {
  try {
    const data = loadReplies();
    const keys = Object.keys(data);

    for (const key of keys) {
      if (body.toLowerCase().includes(key.toLowerCase())) {
        const replies = data[key];
        const randomReply = replies[Math.floor(Math.random() * replies.length)];
        return reply(randomReply);
      }
    }
  } catch (err) {
    console.error('رد تلقائي خطأ:', err.message);
  }
});