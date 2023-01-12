import MessageCardGrid from '../components/MessageCardGrid'
import { useSession } from '@supabase/auth-helpers-react'
import WriteMessage from '../components/WriteMessage'
import Link from 'next/link'
export default function Home() {
    const session = useSession()
    return (
        <>
            <div className='text-xl flex flex-col gap-8'>
                <h1>
                    Say goodbye to feeling alone in your struggles with
                    Undepressed.me.
                </h1>
                <p>
                    Our web application connects you with a supportive community
                    of individuals going through similar challenges.
                </p>
                <p>
                    Send uplifting messages to others and receive encouragement
                    in return. Keep track of your journey and progress with our
                    easy-to-use journal.{' '}
                </p>
                <p>
                    Join Undepressed.me today and start on the path to a
                    brighter tomorrow.
                </p>
            </div>
            <div className='my-20 flex flex-col items-center'>
                <Link
                    href='/login'
                    className='p-4 bg-green-500 rounded-md hover:bg-green-700'
                >
                    {!session ? 'Join Today' : 'Account'}
                </Link>
            </div>
        </>
    )
}
