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

    function resetJournal() {
        setTitle(null)
        setText(null)
    }

    return (
        <>
            <div className='form-widget mx-auto my-4 w-100 md:w-10/12'>
                <div className='bg-white dark:bg-slate-800 rounded-md p-4'>
                    <h1 className='text-xl'>Journal for Today</h1>
                    <div>
                        <label htmlFor='title'>Title</label>
                        <input
                            id='title'
                            type='text'
                            value={title || ''}
                            onChange={(e) => setTitle(e.target.value)}
                            className='block p-2.5 w-full text-md rounded-lg border border-gray-300 dark:bg-slate-700'
                        />
                    </div>
                    <div>
                        <label htmlFor='Text'>Text</label>
                        <textarea
                            id='text'
                            type='text'
                            value={text || ''}
                            onChange={(e) => setText(e.target.value)}
                            rows='4'
                            className='block p-2.5 w-full text-sm gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:border-sky-500 dark:bg-slate-700'
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
                        className='bg-green hover:bg-green-900 text-white rounded-md py-2 px-4 text-md my-4 mx-2'
                        disabled={loading}
                    >
                        {loading ? 'Saving...' : 'Save'}
                    </button>
                    <button
                        onClick={() => resetJournal()}
                        className='bg-orange hover:bg-red text-white rounded-md py-2 px-4 text-md my-4 mx-2'
                    >
                        Reset
                    </button>
                </div>
            </div>
        </>
    )
}
