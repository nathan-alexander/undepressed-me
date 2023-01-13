//Create a chatbot using ReactJS and OpenAI API

import { useState, useEffect } from 'react'
import { useUser } from '@supabase/auth-helpers-react'
import { supabase } from '../lib/initSupabase'

export default function Chat() {
    const user = useUser()
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState('')

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
        } catch (error) {
            // Consider implementing your own error handling logic here
            console.error(error)
            alert(error.message)
        }
    }
    return (
        <div className='flex flex-col min-h-[65vh]'>
            {!messages.length > 0 ? (
                <div className='flex-1 my-1 p-4 rounded-md text-xs md:text-md tracking-wide leading-loose'>
                    Welcome to our AI therapy tool. This innovative technology
                    uses advanced machine learning algorithms to provide
                    personalized support and guidance for those looking to
                    improve their mental health and well-being. Our AI therapist
                    is available 24/7, providing a confidential and convenient
                    way to address a wide range of mental health concerns. With
                    the ability to understand and respond to your unique needs,
                    our AI therapist is here to help you achieve your mental
                    health goals. Let's get started on your journey to a happier
                    and healthier life.
                </div>
            ) : (
                <div className='flex-1 my-1 p-4 rounded-md text-xs md:text-md'>
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
                <input
                    type='text'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className='dark:bg-slate-800 rounded-md w-5/6 text-xs md:text-md'
                    placeholder='How are you feeling today?'
                />
                <button
                    type='submit'
                    onClick={onSubmit}
                    className='bg-green-500 p-2 rounded-md  text-xs md:text-md'
                >
                    Send
                </button>
            </div>
        </div>
    )
}
