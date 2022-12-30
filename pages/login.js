import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Profile from './profile'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Login() {
    const supabase = useSupabaseClient()
    const session = useSession()
    const router = useRouter()
    useEffect(() => {
        if (session) {
            router.replace('/profile')
        }
    }, [session])
    return (
        <>
            <h1 className='text-3xl font-bold'>Login</h1>
            {!session ? (
                <Auth
                    supabaseClient={supabase}
                    appearance={{
                        theme: ThemeSupa,
                    }}
                />
            ) : (
                <Profile />
            )}
        </>
    )
}