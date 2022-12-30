export default function MessageCard({ message }) {
    return (
        <div className='bg-sky-200 dark:bg-sky-800 rounded-md p-2 m-4 col-span-12 md:col-span-4'>
            <h1 className='text-gray-dark dark:text-offwhite text-xs md:text-sm'>
                {message.message}
            </h1>
            <p className='text-gray text-xs md:text-sm'>{message.user}</p>
        </div>
    )
}
