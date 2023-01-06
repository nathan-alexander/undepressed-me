import Image from 'next/image'
import { useTheme } from 'next-themes'

function ThemedImage({ src, alt, width, height, className }) {
    const { resolvedTheme } = useTheme()

    switch (resolvedTheme) {
        case 'dark':
            src = src.replace('.png', '-dark.png')
            break
        case 'light':
            src = src.replace('.png', '-light.png')
            break
        default:
            src = src
            break
    }
    return (
        <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className={className}
        />
    )
}
export default ThemedImage
