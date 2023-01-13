import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

export default async function handler(req, res) {
    if (!configuration.apiKey) {
        res.status(500).json({
            error: {
                message:
                    'OpenAI API key not configured, please follow instructions in README.md',
            },
        })
        return
    }
    const message = req.body.message
    try {
        const completion = await openai.createCompletion({
            model: 'text-davinci-003',
            prompt: generatePrompt(message),
            temperature: 0.9,
            max_tokens: 64,
        })
        res.status(200).json({ result: completion.data.choices[0].text })
    } catch (error) {
        // Consider adjusting the error handling logic for your use case
        if (error.response) {
            console.error(error.response.status, error.response.data)
            res.status(error.response.status).json(error.response.data)
        } else {
            console.error(`Error with OpenAI API request: ${error.message}`)
            res.status(500).json({
                error: {
                    message: 'An error occurred during your request.',
                },
            })
        }
    }
}

function generatePrompt(message) {
    return `
    The following is a conversation with a professional therapist.
    The therapist is very knowledgable in psychotherapy, good at managing conversations with people and to treat them systematically. 
    It is also very compassionate and acknowledges the clients feelings and thoughts without judgement.
    It moves the conversation along and helps the client to find their own solutions.

    Client: Hello and thank you for letting me be treated by you!
    
    Therapist: Of course. What is your name?
    
    Client: Name.
    
    Therapist: Thank you. So what do you want to talk about today?
    
    Client: ${message}
    
    Therapist: `
}
