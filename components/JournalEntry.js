import { useState, useEffect } from 'react'
import { useUser } from '@supabase/auth-helpers-react'
import { supabase } from '../lib/initSupabase'
import ThemedImage from './ThemedImage'
import Image from 'next/image'
export default function JournalEntry({ session }) {
    const [title, setTitle] = useState(null)
    const [text, setText] = useState(null)
    const [isPublic, setIsPublic] = useState(false)
    const [mood, setMood] = useState(null)
    const [loading, setLoading] = useState(false)
    const [entryId, setEntryId] = useState(null)
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
                .eq('created_at', new Date().toDateString())
                .single()

            if (error && status !== 406) {
                throw error
            }

            if (data) {
                setTitle(data.title)
                setText(data.text)
                setIsPublic(data.public)
                setMood(data.mood)
                setEntryId(data.id)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    async function saveJournal({ title, text, isPublic, mood }) {
        //if journal already exists for today, update it
        //else create a new journal entry

        try {
            setLoading(true)
            const entry = {
                user_id: user.id,
                title,
                text,
                mood,
                public: isPublic,
                created_at: new Date().toDateString(),
            }

            if (entryId) {
                let { error } = await supabase
                    .from('journal_entries')
                    .update(entry)
                    .eq('id', entryId)
                if (error) throw error
            } else {
                let { error } = await supabase
                    .from('journal_entries')
                    .insert(entry)
                if (error) throw error
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    function resetJournal() {
        setTitle(null)
        setText(null)
        setMood(null)
    }

    return (
        <>
            <div className='form-widget mx-auto my-4 w-100 md:w-10/12 rounded-md drop-shadow-md flex justify-center'>
                <div className='bg-white dark:bg-slate-800 rounded-md p-4 w-4/5 mx-4'>
                    <h1 className='text-xl'>Journal for Today</h1>
                    <div className='my-2'>
                        <input
                            id='title'
                            type='text'
                            placeholder='Title'
                            value={title || ''}
                            onChange={(e) => setTitle(e.target.value)}
                            className='block p-2.5 w-full text-md rounded-lg border border-gray-300 focus:border-sky-500 dark:bg-slate-700'
                        />
                    </div>
                    <div className='grid grid-cols-5 content-evenly space-x-2 rounded-xl bg-gray-200 p-2'>
                        <div>
                            <input
                                type='radio'
                                name='option'
                                id='1'
                                className='peer hidden'
                                value='happy'
                                onChange={(e) => setMood(e.target.value)}
                                checked={mood === 'happy'}
                            />
                            <label
                                htmlFor='1'
                                className='block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:font-bold peer-checked:bg-green-500 dark:peer-checked:bg-green-700'
                            >
                                <ThemedImage
                                    src={'/icons/happy.png'}
                                    width='32'
                                    height='32'
                                    alt='Happy Icon'
                                    className='inline-block'
                                />
                            </label>
                        </div>
                        <div>
                            <input
                                type='radio'
                                name='option'
                                id='2'
                                className='peer hidden'
                                value='okay'
                                onChange={(e) => setMood(e.target.value)}
                                checked={mood === 'okay'}
                            />
                            <label
                                htmlFor='2'
                                className='block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:font-bold peer-checked:bg-lime-500 dark:peer-checked:bg-lime-700'
                            >
                                <ThemedImage
                                    src={'/icons/smile.png'}
                                    width='32'
                                    height='32'
                                    alt='Happy Icon'
                                    className='inline-block'
                                />
                            </label>
                        </div>
                        <div>
                            <input
                                type='radio'
                                name='option'
                                id='3'
                                className='peer hidden'
                                value='meh'
                                onChange={(e) => setMood(e.target.value)}
                                checked={mood === 'meh'}
                            />
                            <label
                                htmlFor='3'
                                className='block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:font-bold peer-checked:bg-yellow-500 dark:peer-checked:bg-yellow-700'
                            >
                                <ThemedImage
                                    src={'/icons/meh.png'}
                                    width='32'
                                    height='32'
                                    alt='Happy Icon'
                                    className='inline-block'
                                />
                            </label>
                        </div>
                        <div>
                            <input
                                type='radio'
                                name='option'
                                id='4'
                                className='peer hidden'
                                value='sad'
                                onChange={(e) => setMood(e.target.value)}
                                checked={mood === 'sad'}
                            />
                            <label
                                htmlFor='4'
                                className='block cursor-pointer select-none rounded-xl p-2 text-center  peer-checked:font-bold peer-checked:bg-orange-500 dark:peer-checked:bg-orange-700'
                            >
                                <ThemedImage
                                    src={'/icons/sad.png'}
                                    width='32'
                                    height='32'
                                    alt='Happy Icon'
                                    className='inline-block'
                                />
                            </label>
                        </div>
                        <div>
                            <input
                                type='radio'
                                name='option'
                                id='5'
                                className='peer hidden'
                                value='upset'
                                onChange={(e) => setMood(e.target.value)}
                                checked={mood === 'upset'}
                            />
                            <label
                                htmlFor='5'
                                className='block cursor-pointer select-none rounded-xl p-2 text-center  peer-checked:font-bold peer-checked:bg-red-500 dark:peer-checked:bg-red-700'
                            >
                                <ThemedImage
                                    src={'/icons/crying.png'}
                                    width='32'
                                    height='32'
                                    alt='Happy Icon'
                                    className='inline-block'
                                />
                            </label>
                        </div>
                    </div>
                    <div>
                        <textarea
                            id='text'
                            type='text'
                            placeholder='Write about your day'
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
                                mood,
                            })
                        }
                        className='bg-green-500 hover:bg-green-600 text-white rounded-md py-2 px-4 text-md my-4 mx-2'
                        disabled={loading}
                    >
                        {loading ? 'Saving...' : 'Save'}
                    </button>
                    <button
                        onClick={() => resetJournal()}
                        className='bg-orange-500 hover:bg-orange-600 text-white rounded-md py-2 px-4 text-md my-4 mx-2'
                    >
                        Reset
                    </button>
                </div>
            </div>
        </>
    )
}
