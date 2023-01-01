import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useSession } from '@supabase/auth-helpers-react'
const ThemeToggle = dynamic(() => import('./ThemeToggle'), { ssr: false })

export default function Header() {
    const session = useSession()
    return (
        <div className='bg-offwhite dark:bg-slate-900 flex justify-between p-8 items-center'>
            <Link href='/'>
                <h1 className='text-2xl bold'>Undepressed.me</h1>
            </Link>
            <div className='w-1/6 flex flex-row-reverse gap-8 items-center'>
                <ThemeToggle />
                {!session ? (
                    <Link href='/login'>
                        <h5>Log in</h5>
                    </Link>
                ) : (
                    <>
                        <Link href='/profile'>
                            <h5>Account</h5>
                        </Link>
                        <Link href='journal'>
                            <h5>Journal</h5>
                        </Link>
                    </>
                )}
            </div>
        </div>
    )
}
