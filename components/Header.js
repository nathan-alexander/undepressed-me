import dynamic from 'next/dynamic'

const ThemeToggle = dynamic(() => import('./ThemeToggle'), { ssr: false })

export default function Header() {
    return (
        <div className='bg-offwhite dark:bg-gray-dark flex justify-between p-4 items-center'>
            <h1>Header</h1>
            <div className='w-1/6 flex flex-row-reverse gap-8 items-center'>
                <ThemeToggle />
                <h5>Login</h5>
            </div>
        </div>
    )
}
