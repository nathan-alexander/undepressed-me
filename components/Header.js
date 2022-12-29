import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useSession } from '@supabase/auth-helpers-react'
const ThemeToggle = dynamic(() => import('./ThemeToggle'), { ssr: false })

export default function Header() {
    const session = useSession()
    return (
        <div className='bg-offwhite dark:bg-slate-800 flex justify-between p-4 items-center'>
            <Link href='/'>Header</Link>
            <div className='w-1/6 flex flex-row-reverse gap-8 items-center'>
                <ThemeToggle />
                <Link href='/profile'>
                    {!session ? <h5>Login</h5> : <h5>Account</h5>}
                </Link>
            </div>
        </div>
    )
}
