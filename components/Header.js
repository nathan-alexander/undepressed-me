import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useSession } from '@supabase/auth-helpers-react'
const ThemeToggle = dynamic(() => import('./ThemeToggle'), { ssr: false })

export default function Header() {
    const session = useSession()
    return (
        <div className='bg-sky-50 dark:bg-slate-900 flex justify-between p-6 items-center'>
            <Link href='/'>
                <h1 className='text-2xl bold'>Undepressed.me</h1>
            </Link>
            <div className='w-1/6 flex flex-row-reverse gap-8 items-center'>
                <ThemeToggle />

                {!session ? (
                    <Link href='/login'>
                        <div className='p-2 hover:bg-sky-100 hover:dark:bg-slate-800 border rounded'>
                            Log in
                        </div>
                    </Link>
                ) : (
                    <>
                        <Link href='/profile'>
                            <div className='p-2 hover:bg-sky-100 hover:dark:bg-slate-800  rounded'>
                                Account
                            </div>
                        </Link>

                        <Link href='journal'>
                            <div className='p-2 hover:bg-sky-100 hover:dark:bg-slate-800  rounded'>
                                Journal
                            </div>
                        </Link>
                    </>
                )}
            </div>
        </div>
    )
}
