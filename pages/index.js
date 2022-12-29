import MessageCardGrid from '../components/MessageCardGrid'

export default function Home() {
    return (
        <>
            <main className='bg-offwhite dark:bg-gray-dark h-screen p-8'>
                <h1 className='text-3xl font-bold underline'>Hello!</h1>
                <MessageCardGrid />
            </main>
        </>
    )
}
