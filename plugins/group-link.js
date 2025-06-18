const { cmd, commands } = require('../command');
const config = require('../config');
const prefix = config.PREFIX;
const fs = require('fs');
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, sleep, fetchJson } = require('../lib/functions2');
const { writeFileSync } = require('fs');
const path = require('path');

cmd({
    pattern: "لينك-الجروب",
    alias: ["glink", "grouplink"],
    desc: "جيب لينك الجروب.",
    category: "group",
    filename: __filename,
}, async (conn, mek, m, { from, quoted, body, args, q, isGroup, sender, reply }) => {
    try {
        if (!isGroup) return reply("✖️ الأمر ده يشتغل بس في الجروبات يا نجم.");

        const senderNumber = sender.split('@')[0];
        const botNumber = conn.user.id.split(':')[0];

        const groupMetadata = await conn.groupMetadata(from);
        const groupAdmins = groupMetadata.participants.filter(member => member.admin);
        const isBotAdmins = groupAdmins.some(admin => admin.id === botNumber + '@s.whatsapp.net');
        if (!isBotAdmins) return reply("✖️ ارفعني مشرف يا معلم عشان أقدر أجيب اللينك.");

        const isAdmins = groupAdmins.some(admin => admin.id === sender);
        if (!isAdmins) return reply("✖️ انت مش مشرف يا نجم، متأمرش عليا كده.");

        const inviteCode = await conn.groupInviteCode(from);
        if (!inviteCode) return reply("⚠️ معرفتش أجيب لينك الدعوة، جرب تاني.");

        const inviteLink = `https://chat.whatsapp.com/${inviteCode}`;
        return reply(`📩 *لينك الدعوة للجروب بتاعك:*\n${inviteLink}\n\n✪『𝐋𝐔𝐂𝐈𝐅𝐄𝐑』✪ بيقولك: خد اللينك وانشره زي ما تحب يا باشا 🔥`);
        
    } catch (error) {
        console.error("Error in invite command:", error);
        reply(`❌ حصلت غلطة: ${error.message || "مش معروف السبب 😶‍🌫️"}`);
    }
});
