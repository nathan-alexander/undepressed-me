//Create a chatbot using ReactJS and OpenAI API

import { useState, useEffect } from 'react'
import { useUser } from '@supabase/auth-helpers-react'
import { supabase } from '../lib/initSupabase'

export default function Chat() {
    const user = useUser()
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState('')
    const [chatEngaged, setChatEngaged] = useState(false)
    async function onSubmit(event) {
        event.preventDefault()
        if (!message) return
        const userMessage = {
            text: message,
            bot: false,
        }
        setMessages((prev) => [...prev, userMessage])
        setMessage('')
        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message }),
            })
            const data = await response.json()
            if (response.status !== 200) {
                throw (
                    data.error ||
                    new Error(`Request failed with status ${response.status}`)
                )
            }
            const responseMessage = {
                text: data.result,
                bot: true,
            }
            setMessages((prev) => [...prev, responseMessage])
            setChatEngaged(true)
        } catch (error) {
            // Consider implementing your own error handling logic here
            console.error(error)
            alert(error.message)
        }
    }
    return (
        <div className='flex flex-col min-h-[65vh]'>
            {!messages.length > 0 ? (
                <div className='flex-1 my-1 p-4 rounded-md text-xs lg:text-lg tracking-wide leading-loose'>
                    <p>
                        Welcome to our AI therapy tool. This innovative
                        technology uses advanced machine learning algorithms to
                        provide personalized support and guidance for those
                        looking to improve their mental health and well-being.
                        Our AI therapist is available 24/7, providing a
                        confidential and convenient way to address a wide range
                        of mental health concerns. With the ability to
                        understand and respond to your unique needs, our AI
                        therapist is here to help you achieve your mental health
                        goals. Let's get started on your journey to a happier
                        and healthier life.
                    </p>
                    <br />
                    <p>
                        Please note that our AI therapy tool is not intended to
                        replace professional medical or psychiatric advice. It
                        is not suitable for use in emergency or crisis
                        situations and should not be used as a substitute for
                        professional diagnosis, treatment, or therapy. If you
                        are experiencing severe symptoms or are in crisis,
                        please seek immediate help from a qualified healthcare
                        professional. The information provided by our AI
                        therapist is based on the data that it has been trained
                        on, and cannot account for individual circumstances or
                        variations. By using this service, you accept that our
                        company will not be held liable for any damages or harm
                        resulting from the use of this tool. The final decision
                        for any treatment should be made by a qualified
                        healthcare professional. If you have any concerns about
                        your mental health, please seek professional help.
                    </p>
                </div>
            ) : (
                <div className='flex-1 my-4p-4  text-xs md:text-md min-h-[65vh] max-h-[65vh] overflow-y-scroll border border-b-white border-x-0 border-t-0'>
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`${
                                message.bot ? 'text-left' : 'text-right'
                            } my-2 `}
                        >
                            <div
                                className={`${
                                    message.bot
                                        ? 'bg-slate-500 text-white'
                                        : 'bg-slate-700 text-white'
                                } p-2 rounded-md inline-block max-w-[50vw]`}
                            >
                                {message.text}
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <div className='mx-auto w-80'>
                <form onSubmit={onSubmit}>
                    <input
                        type='text'
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className='dark:bg-slate-800 rounded-tl-md rounded-bl-md w-5/6 text-xs md:text-md'
                        placeholder='How are you feeling today?'
                    />
                    <button
                        type='submit'
                        onClick={onSubmit}
                        className='bg-green-500 disabled:bg-green-900 p-2 rounded-tr-md rounded-br-md  text-xs md:text-md border'
                        disabled={message.length < 1}
                    >
                        Send
                    </button>
                </form>
            </div>
        </div>
    )
}
