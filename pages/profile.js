import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Account from '../components/Account'

export default function Profile() {
    const session = useSession()
    const supabase = useSupabaseClient()
    return (
        <>
            <>
                <main className='bg-offwhite dark:bg-slate-800 h-screen p-8'>
                    <h1 className='text-3xl font-bold'>Account</h1>
                    {!session ? (
                        <Auth
                            supabaseClient={supabase}
                            appearance={{ theme: ThemeSupa }}
                        />
                    ) : (
                        <Account session={session} />
                    )}
                </main>
            </>
        </>
    )
}
