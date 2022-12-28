import { useTheme } from 'next-themes'

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme()
    return (
        <button
            className='black dark:text-yellow'
            onClick={() => {
                setTheme(theme === 'dark' ? 'light' : 'dark')
            }}
        >
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </button>
    )
}
