export default function MessageCard({ message }) {
    return (
        <div className='bg-sky-200 dark:bg-sky-800 rounded-md w-1/4 p-2 m-4'>
            <h1 className='text-gray-dark dark:text-offwhite'>
                {message.message}
            </h1>
            <p className='text-gray'>{message.user}</p>
        </div>
    )
}
