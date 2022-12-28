import Header from '../components/Header'
export default function Home() {
    return (
        <>
            <Header />
            <main className='bg-white dark:bg-gray-dark h-screen p-8'>
                <h1 className='text-3xl font-bold underline'>Hello!</h1>
            </main>
        </>
    )
}
