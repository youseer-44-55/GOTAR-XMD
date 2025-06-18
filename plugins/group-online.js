const { cmd } = require('../command');

cmd({
    pattern: "مين-متصل",
    alias: ["شوف-كام-حد-صاحي", "co"],
    desc: "Check who's online in the group (Admins & Owner only)",
    category: "group",
    react: "🟢",
    filename: __filename
},
async (conn, mek, m, { from, quoted, isGroup, isAdmins, isCreator, fromMe, reply }) => {
    try {
        // Check if the command is used in a group
        if (!isGroup) return reply("في الجروبات بس يا عسل 🙄");

        // Check if user is either creator or admin
        if (!isCreator && !isAdmins && !fromMe) {
            return reply("للادمن والمطور بس يا علق 🤫");
        }

        // Inform user that we're checking
        await reply("*بشوف كام علق فاتح....✨*");

        const onlineMembers = new Set();
        const groupData = await conn.groupMetadata(from);
        const presencePromises = [];

        // Request presence updates for all participants
        for (const participant of groupData.participants) {
            presencePromises.push(
                conn.presenceSubscribe(participant.id)
                    .then(() => {
                        // Additional check for better detection
                        return conn.sendPresenceUpdate('composing', participant.id);
                    })
            );
        }

        await Promise.all(presencePromises);

        // Presence update handler
        const presenceHandler = (json) => {
            for (const id in json.presences) {
                const presence = json.presences[id]?.lastKnownPresence;
                // Check all possible online states
                if (['available', 'composing', 'recording', 'online'].includes(presence)) {
                    onlineMembers.add(id);
                }
            }
        };

        conn.ev.on('presence.update', presenceHandler);

        // Longer timeout and multiple checks
        const checks = 3;
        const checkInterval = 5000; // 5 seconds
        let checksDone = 0;

        const checkOnline = async () => {
            checksDone++;
            
            if (checksDone >= checks) {
                clearInterval(interval);
                conn.ev.off('presence.update', presenceHandler);
                
                if (onlineMembers.size === 0) {
                    return reply("كلو نايم او خافي اخر ظهور مفيش علق صاحي 😂.");
                }
                
                const onlineArray = Array.from(onlineMembers);
                const onlineList = onlineArray.map((member, index) => 
                    `✑ @${member.split('@')[0]}`
                ).join('\n');
                
                const message = `*لاقيت عيال صاحيه اهي 😂😁 ${onlineArray.length}/${groupData.participants.length}*\n\n${onlineList}`;
                
                await conn.sendMessage(from, { 
                    text: message,
                    mentions: onlineArray
                }, { quoted: mek });
            }
        };

        const interval = setInterval(checkOnline, checkInterval);

    } catch (e) {
        console.error("Error in online command:", e);
        reply(`An error occurred: ${e.message}`);
    }
});
