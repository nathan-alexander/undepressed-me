import Footer from './Footer'
import Header from './Header'

export default function Layout({ children }) {
    return (
        <>
            <Header />
            <div className='bg-sky-50 dark:bg-slate-900 md:h-auto lg:h-screen p-8'>
                {children}
            </div>
            <Footer />
        </>
    )
}
