import { useState, useEffect } from 'react'
import Image from 'next/image'
import { supabase } from '../lib/initSupabase'
import { useUser } from '@supabase/auth-helpers-react'
export default function MessageCard({ message }) {
    const [isLiked, setIsLiked] = useState(false)
    const [likes, setLikes] = useState(message.likes)
    const user = useUser()
    useEffect(() => {
        getUserLiked()
    }, [])
    const handleLike = async () => {
        if (user) {
            setIsLiked(!isLiked)
            isLiked ? removeLike() : addLike()
            setLikes(isLiked ? likes - 1 : likes + 1)
        }
    }
    async function getUserLiked() {
        try {
            const { data, error } = await supabase
                .from('likes')
                .select('user_id')
                .eq('message_id', message.id)
            if (error) throw error
            setIsLiked(data.some((like) => like.user_id === user.id))
        } catch (error) {
            console.log(error)
        }
    }
    async function addLike() {
        try {
            const { data, error } = await supabase
                .from('messages')
                .update({ likes: likes + 1 })
                .match({ id: message.id })
            if (error) throw error
        } catch (error) {
            console.log(error)
        }
        try {
            const likeObject = {
                user_id: user.id,
                message_id: message.id,
                created_at: new Date().toISOString(),
            }
            const { error } = await supabase.from('likes').insert(likeObject)
            if (error) throw error
        } catch (error) {
            console.log(error)
        }
    }
    async function removeLike() {
        try {
            const { data, error } = await supabase
                .from('messages')
                .update({ likes: likes - 1 })
                .match({ id: message.id })
            if (error) throw error
        } catch (error) {
            console.log(error)
        }
        try {
            const { error } = await supabase
                .from('likes')
                .delete()
                .eq('user_id', user.id)
                .eq('message_id', message.id)
            if (error) throw error
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='bg-sky-200 dark:bg-sky-800 rounded-md p-2 m-4 col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 lg:h-[100px]'>
            <div className='float-right flex'>
                {isLiked ? (
                    <Image
                        src={'/icons/heart_filled.png'}
                        width='16'
                        height='16'
                        alt='Filled heart icon'
                        onClick={handleLike}
                    />
                ) : (
                    <Image
                        src={'/icons/heart.png'}
                        width='16'
                        height='16'
                        alt='Unfilled heart icon'
                        onClick={handleLike}
                    />
                )}
                <span className='float-right text-xs mx-1'>{likes}</span>
            </div>
            <h1 className='text-gray-dark dark:text-offwhite text-xs md:text-sm'>
                {message.message_text}
            </h1>
            <p className='text-gray text-xs md:text-sm'>
                {message.anonymous ? 'Anonymous' : message.profiles.username}
            </p>
        </div>
    )
}
