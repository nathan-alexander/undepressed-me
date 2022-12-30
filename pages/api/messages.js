import { createClient } from '@supabase/supabase-js'

const db = process.env.NEXT_PUBLIC_SUPABASE_URL
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabase = createClient(db, key)
export default async function handler(req, res) {
    try {
        let { data, error, status } = await supabase
            .from('messages')
            .select('message_text')

        if (error && status !== 406) {
            throw error
        }

        if (data) {
            console.log(data)
            res.status(200).json(data)
        }
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}
