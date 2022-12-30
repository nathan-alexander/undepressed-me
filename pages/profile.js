import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Account from '../components/Account'
import Login from './login'
export default function Profile() {
    const session = useSession()

    return (
        <>
            <main className='bg-offwhite dark:bg-slate-900 h-screen p-8'>
                {!session ? <Login /> : <Account session={session} />}
            </main>
        </>
    )
}
