import { supabase } from '../lib/initSupabase'
import { useState, useEffect } from 'react'
import MessageCard from './MessageCard'

export default function MessageCardGrid() {
    const [messages, setMessages] = useState([])

    useEffect(() => {
        fetchMessages()
    }, [])

    const fetchMessages = async () => {
        let { data: messages, error } = await supabase
            .from('messages')
            .select(
                `
                id,
                message_text,
                profiles (
                    username,
                    full_name
                )
            `
            )
            .order('created_at', false)

        if (error) console.log('error', error)
        else setMessages(messages)
    }

    supabase
        .channel('public:messages')
        .on(
            'postgres_changes',
            {
                event: 'INSERT',
                schema: 'public',
                table: 'messages',
            },
            () => {
                fetchMessages()
            }
        )
        .subscribe()
    const channels = supabase.getChannels()

    return (
        <div className='grid grid-cols-12 gap-2'>
            {messages.map((message) => (
                <MessageCard key={message.id} message={message} />
            ))}
        </div>
    )
}
