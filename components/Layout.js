import Footer from './Footer'
import Header from './Header'

export default function Layout({ children }) {
    return (
        <>
            <Header />
            <div className='bg-sky-50 dark:bg-slate-900 h-full min-h-screen p-8'>
                {children}
            </div>
            <Footer />
        </>
    )
}
