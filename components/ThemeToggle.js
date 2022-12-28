import { useTheme } from 'next-themes'
import Image from 'next/image'
export default function ThemeToggle() {
    const { theme, setTheme } = useTheme()
    return (
        <button
            className='text-light-gray dark:text-yellow p-2 border rounded'
            onClick={() => {
                setTheme(theme === 'dark' ? 'light' : 'dark')
            }}
        >
            {theme === 'dark' ? 'Light' : 'Dark'}
        </button>
    )
}
