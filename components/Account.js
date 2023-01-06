import { useState, useEffect } from 'react'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'

export default function Account({ session }) {
    const supabase = useSupabaseClient()
    const user = useUser()
    const [loading, setLoading] = useState(true)
    const [username, setUsername] = useState(null)
    const [fullname, setFullname] = useState(null)
    const [avatar_url, setAvatarUrl] = useState(null)

    useEffect(() => {
        getProfile()
    }, [session])

    async function getProfile() {
        try {
            setLoading(true)

            let { data, error, status } = await supabase
                .from('profiles')
                .select(`username, full_name, avatar_url`)
                .eq('id', user.id)
                .single()

            if (error && status !== 406) {
                throw error
            }

            if (data) {
                setUsername(data.username)
                setFullname(data.full_name)
                setAvatarUrl(data.avatar_url)
            }
        } catch (error) {
            alert('Error loading user data!')
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    async function updateProfile({ username, avatar_url, fullname }) {
        try {
            setLoading(true)
            const updates = {
                id: user.id,
                username,
                avatar_url,
                full_name: fullname,
                updated_at: new Date().toISOString(),
            }

            let { error } = await supabase.from('profiles').upsert(updates)
            if (error) throw error
        } catch (error) {
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <div className='form-widget mx-auto my-4 w-100 md:w-10/12'>
                <div className='bg-white dark:bg-slate-800 rounded-md'>
                    <div className='border-sky-500 border-b-4 p-4 flex justify-between'>
                        <h1 className='text-xl'>Account Settings</h1>
                        <div>
                            <button
                                className={`bg-green hover:bg-blue text-white rounded-md p-1 text-sm`}
                                onClick={() =>
                                    updateProfile({
                                        username,
                                        avatar_url,
                                        fullname,
                                    })
                                }
                                disabled={loading}
                            >
                                {loading ? 'Loading ...' : 'Update'}
                            </button>
                        </div>
                    </div>
                    <div className='px-4 py-2 flex gap-2 flex-col'>
                        <label htmlFor='email'>Email</label>{' '}
                        <input
                            id='email'
                            type='text'
                            value={session.user.email}
                            disabled
                            className='w-1/2 disabled:border-none dark:bg-slate-900'
                        />
                    </div>
                    <div className='px-4 py-2 flex gap-2 flex-col'>
                        <label htmlFor='username'>Username</label>{' '}
                        <input
                            id='username'
                            type='text'
                            value={username || ''}
                            onChange={(e) => setUsername(e.target.value)}
                            className='w-1/2 rounded focus:border-green dark:bg-slate-700'
                        />
                    </div>

                    <div className='px-4 py-2 flex gap-2 flex-col'>
                        <label htmlFor='fullname'>Name</label>{' '}
                        <input
                            id='fullname'
                            type='text'
                            value={fullname || ''}
                            onChange={(e) => setFullname(e.target.value)}
                            className='w-1/2 rounded focus:border-green dark:bg-slate-700'
                        />
                    </div>
                </div>

                <div>
                    <button
                        className='bg-blue-500 text-white rounded-md p-2 my-4'
                        onClick={() => supabase.auth.signOut()}
                    >
                        Sign Out
                    </button>
                </div>
            </div>
        </>
    )
}
