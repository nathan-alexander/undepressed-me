import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Profile from './profile'
export default function Login() {
    const supabase = useSupabaseClient()
    const session = useSession()

    return (
        <>
            <main className='bg-offwhite dark:bg-slate-900 h-screen p-8'>
                <h1 className='text-3xl font-bold'>Login</h1>
                {!session ? (
                    <Auth
                        supabaseClient={supabase}
                        appearance={{ theme: ThemeSupa }}
                    />
                ) : (
                    <Profile />
                )}
            </main>
        </>
    )
}
