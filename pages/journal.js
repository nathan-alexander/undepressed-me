import { useSession } from '@supabase/auth-helpers-react'
import JournalEntry from '../components/JournalEntry'
import Login from './login'
export default function Journal() {
    const session = useSession()

    return <>{!session ? <Login /> : <JournalEntry session={session} />}</>
}
