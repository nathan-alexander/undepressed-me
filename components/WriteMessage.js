import { useState } from 'react'
import { useUser } from '@supabase/auth-helpers-react'
export default function WriteMessage() {
    const [message, setMessage] = useState(null)
    const user = useUser()

    return (
        <>
            <h1 className='text-2xl bold'>Send Love</h1>
            <p className='text-lg text-gray-dark dark:text-gray-light'>
                Write an encouraging message for other users of the app to see.
                It might just help them!
            </p>
            <input
                id='message'
                name='message'
                placeholder='Write a message'
                onChange={(e) => setMessage(e.target.value)}
                className='dark:text-white w-1/2 h-400'
            />
            <button onClick={(e) => sendMessage(message)}>Send</button>
        </>
    )
}
