import dynamic from 'next/dynamic'

const ThemeToggle = dynamic(() => import('./ThemeToggle'), { ssr: false })

export default function Header() {
    return (
        <div className='dark:bg-gray-dark flex justify-between p-4'>
            Header
            <ThemeToggle />
        </div>
    )
}
