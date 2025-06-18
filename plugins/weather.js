const axios = require('axios');
const { cmd } = require('../command');

cmd({
    pattern: "الطقس",
    alias: ["weather", "جو", "احوال_الطقس"],
    desc: "⛅ اعرف الجو عامل إزاي في أي حته",
    react: "🌤",
    category: "other",
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return reply("🌆 اكتب اسم المدينة يا معلم، مثال:\n*الطقس القاهرة*");

        const apiKey = '2d61a72574c11c4f36173b627f8cb177'; // مفتاح API
        const city = q;
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        const response = await axios.get(url);
        const data = response.data;

        const weatherMessage = `🌤 *الجو عامل إزاي في ${data.name}, ${data.sys.country}?*

🔥 *الحرارة:* ${data.main.temp}°C  
🥵 *حاسس بإيه:* ${data.main.feels_like}°C  
📉 *أقل حرارة:* ${data.main.temp_min}°C  
📈 *أعلى حرارة:* ${data.main.temp_max}°C  
💧 *الرطوبة:* ${data.main.humidity}%  
🌫️ *الوصف:* ${data.weather[0].description}  
🌪️ *الهواء بيجري بسرعة:* ${data.wind.speed} m/s  
🔽 *الضغط الجوي:* ${data.main.pressure} hPa  

📡 *بيانات جايه من عمك لوسيفر وطقس العالم 🤓*`;

        return reply(weatherMessage);
    } catch (e) {
        console.error(e);
        if (e.response && e.response.status === 404) {
            return reply("😐 مش لاقي المدينة دي، انت كاتبها صح؟ جرب تاني يا غالي.");
        }
        return reply("💥 في حاجه ضربت وملحقتش أجيبلك الجو، جرب كمان شويه!");
    }
});