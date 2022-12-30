import MessageCardGrid from '../components/MessageCardGrid'
import Message from '../components/WriteMessage'
import { useSession } from '@supabase/auth-helpers-react'
import WriteMessage from '../components/WriteMessage'
export default function Home() {
    const session = useSession()
    return (
        <>
            <h1 className='text-3xl font-bold underline'>Hello!</h1>
            <MessageCardGrid />
            {session ? (
                <WriteMessage />
            ) : (
                <div>Please log in to write a message</div>
            )}
        </>
    )
}
