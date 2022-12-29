import useSWR from 'swr'

import MessageCard from './MessageCard'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function MessageCardGrid() {
    const { data, error, isLoading } = useSWR('/api/messages', fetcher)
    let messageCards
    if (error) {
        return <div>Failed to load</div>
    }
    if (data) {
        messageCards = data.map((message) => {
            return <MessageCard message={message} />
        })
        return <div className='flex gap-4'>{messageCards}</div>
    }
}
