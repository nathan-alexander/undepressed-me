import { useState } from 'react'
import { useUser } from '@supabase/auth-helpers-react'
import { supabase } from '../lib/initSupabase'
export default function WriteMessage() {
    const [message, setMessage] = useState('')
    const user = useUser()

    async function sendMessage(message) {
        if (message.length > 1) {
            try {
                const messageObject = {
                    user_id: user.id,
                    message_text: message,
                    anonymous: false,
                }
                let { error } = await supabase
                    .from('messages')
                    .insert(messageObject)
                if (error) throw error
            } catch (error) {
                console.log(error)
            } finally {
                setMessage('')
            }
        }
    }

    async function sendMessageAnon(message) {
        if (message.length > 1) {
            try {
                const messageObject = {
                    user_id: user.id,
                    message_text: message,
                    anonymous: true,
                }
                let { error } = await supabase
                    .from('messages')
                    .insert(messageObject)
                if (error) throw error
            } catch (error) {
                console.log(error)
            } finally {
                setMessage('')
            }
        }
    }
    return (
        <div className='bg-zinc-50 dark:bg-slate-800 border border-zinc-300 rounded-md drop-shadow-md p-4 my-8'>
            <h1 className='text-2xl bold'>Send Love</h1>
            <p className='lg:text-lg text-gray-dark dark:text-gray-light my-4'>
                Write an encouraging message for other users of the app to see.
                It might just help them!
            </p>
            <input
                id='message'
                name='message'
                value={message}
                placeholder='Write a message'
                onChange={(e) => setMessage(e.target.value)}
                className='block p-2.5 w-full md:w-3/4 text-md rounded-lg border border-slate-400 focus:border-sky-500  dark:bg-slate-700'
            />
            <button
                onClick={(e) => sendMessage(message)}
                className='bg-green-500 hover:bg-green-600 text-white rounded-md py-2 px-4 text-md my-4 disabled:bg-green-900'
                disabled={message.length < 1}
            >
                Send
            </button>
            <button
                onClick={(e) => sendMessageAnon(message)}
                className='bg-green-500 hover:bg-green-600 text-white rounded-md py-2 px-4 text-md my-4 mx-2 disabled:bg-green-900'
                disabled={message.length < 1}
            >
                Send Anonymously
            </button>
        </div>
    )
}
