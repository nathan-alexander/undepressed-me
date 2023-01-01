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
        <div className='bg-white dark:bg-slate-800 rounded-md drop-shadow-md p-4'>
            <h1 className='text-2xl bold'>Send Love</h1>
            <p className='text-lg text-gray-dark dark:text-gray-light my-2'>
                Write an encouraging message for other users of the app to see.
                It might just help them!
            </p>
            <input
                id='message'
                name='message'
                value={message}
                placeholder='Write a message'
                onChange={(e) => setMessage(e.target.value)}
                className='block p-2.5 w-1/2 text-md rounded-lg border border-gray-300 focus:border-sky-500 dark:bg-slate-700'
            />
            <button
                onClick={(e) => sendMessage(message)}
                className='bg-green hover:bg-green-900 text-white rounded-md py-2 px-4 text-md my-4 mx-2'
            >
                Send
            </button>
            <button
                onClick={(e) => sendMessageAnon(message)}
                className='bg-green hover:bg-green-900 text-white rounded-md py-2 px-4 text-md my-4 mx-2'
            >
                Send Anonymously
            </button>
        </div>
    )
}
