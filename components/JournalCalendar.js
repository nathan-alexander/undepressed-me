import { useState, useEffect } from 'react'
import { useUser } from '@supabase/auth-helpers-react'
import { supabase } from '../lib/initSupabase'

export default function JournalCalendar() {
    const [journalCalendar, setJournalCalendar] = useState([])
    const user = useUser()

    useEffect(() => {
        getJournalCalendar()
        console.log(journalCalendar)
    }, [])

    async function getJournalCalendar() {
        try {
            let { data, error } = await supabase
                .from('journal_entries')
                .select('*')
                .eq('user_id', user.id)
            if (error) throw error
            setJournalCalendar(data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='grid grid-cols-12 gap-2'>
            {journalCalendar.map((entry) => (
                <div key={entry.id} className='col-span-2'>
                    <div className='bg-gray-100 rounded-lg p-2'>
                        <div className='text-center text-gray-500 text-xs'>
                            {entry.journal_date}
                        </div>
                        <div className='text-center text-gray-500 text-xs'>
                            {entry.mood}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
