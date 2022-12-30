import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Account from '../components/Account'
import Login from './login'
export default function Profile() {
    const session = useSession()

    return <>{!session ? <Login /> : <Account session={session} />}</>
}
