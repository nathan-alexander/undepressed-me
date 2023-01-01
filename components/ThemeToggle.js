import { useTheme } from 'next-themes'
import Image from 'next/image'

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme()
    return (
        <button
            onClick={() => {
                setTheme(theme === 'dark' ? 'light' : 'dark')
            }}
        >
            {theme === 'dark' ? (
                <Image
                    src={'/icons/moon.png'}
                    width='24'
                    height='24'
                    alt='Moon Icon'
                />
            ) : (
                <Image
                    src={'/icons/sun.png'}
                    width='24'
                    height='24'
                    alt='Sun Icon'
                />
            )}
        </button>
    )
}
