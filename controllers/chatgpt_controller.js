const OpenAI = require('openai');
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const chatgptController = {
    sendMessage: async (req, res) => {
        const userMessage = req.body.message;
        try {
            const response = await openai.chat.completions.create({
                messages: [{ role: "user", content: userMessage }],
                model: "gpt-3.5-turbo-1106",
            });
            const responeMessage = response.choices[0].message.content;
            return res.status(200).json({ msg: responeMessage });
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }
}

module.exports = chatgptController;