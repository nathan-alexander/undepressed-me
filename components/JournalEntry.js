import { useState, useEffect } from 'react'
import { useUser } from '@supabase/auth-helpers-react'
import { supabase } from '../lib/initSupabase'
export default function JournalEntry({ session }) {
    const [title, setTitle] = useState(null)
    const [text, setText] = useState(null)
    const [isPublic, setIsPublic] = useState(false)
    const [mood, setMood] = useState(null)
    const [loading, setLoading] = useState(false)
    const user = useUser()

    useEffect(() => {
        fetchJournal()
    }, [])

    async function fetchJournal() {
        try {
            setLoading(true)

            let { data, error, status } = await supabase
                .from('journal_entries')
                .select('*')
                .eq('user_id', user.id)
                .single()

            if (error && status !== 406) {
                throw error
            }

            if (data) {
                setTitle(data.title)
                setText(data.text)
                setIsPublic(data.public)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    async function saveJournal({ title, text, isPublic, mood }) {
        try {
            setLoading(true)
            const entry = {
                user_id: user.id,
                title,
                text,
                public: isPublic,
            }
            let { error } = await supabase.from('journal_entries').insert(entry)
            if (error) throw error
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <div className='form-widget mx-auto my-4 w-100 md:w-10/12'>
                <div className='bg-white dark:bg-slate-800 rounded-md'>
                    <h1 className='text-xl'>Journal for Today</h1>
                    <div>
                        <label htmlFor='title'>Title</label>
                        <input
                            id='title'
                            type='text'
                            value={title || ''}
                            onChange={(e) => setTitle(e.target.value)}
                            className='dark:bg-slate-700'
                        />
                    </div>
                    <div>
                        <label htmlFor='Text'>Text</label>
                        <textarea
                            id='text'
                            type='text'
                            value={text || ''}
                            onChange={(e) => setText(e.target.value)}
                            className='dark:bg-slate-700'
                        />
                    </div>
                    <button
                        onClick={() =>
                            saveJournal({
                                title,
                                text,
                                isPublic,
                            })
                        }
                        disabled={loading}
                    >
                        {loading ? 'Saving...' : 'Save Journal'}
                    </button>
                </div>
            </div>
        </>
    )
}
