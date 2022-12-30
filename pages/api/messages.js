let messageData = [
    {
        message: 'Great job',
        user: 'Nate',
    },
    {
        message: 'You got this!',
        user: 'Gillian',
    },
    {
        message: 'Take it day by day! Sending love!',
        user: 'Piper',
    },
    {
        message: 'Take it day by day! Sending love!',
        user: 'Piper',
    },
    {
        message: 'Take it day by day! Sending love!',
        user: 'Piper',
    },
    {
        message: 'Take it day by day! Sending love!',
        user: 'Piper',
    },
    {
        message: 'Take it day by day! Sending love!',
        user: 'Piper',
    },
]

export default function handler(req, res) {
    res.status(200).json(messageData)
}
