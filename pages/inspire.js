import MessageCardGrid from '../components/MessageCardGrid'
import { useSession } from '@supabase/auth-helpers-react'
import WriteMessage from '../components/WriteMessage'
import Link from 'next/link'
export default function Inspire() {
    const session = useSession()
    return (
        <>
            <MessageCardGrid />
            {session ? (
                <WriteMessage />
            ) : (
                <Link href='/login'>
                    <div className='text-center w-3/4 md:w-1/2 p-4 my-20 mx-auto rounded-lg bg-green-500 hover:bg-green-700'>
                        Please log in to write a message
                    </div>
                </Link>
            )}
        </>
    )
}
