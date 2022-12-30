import Footer from './Footer'
import Header from './Header'

export default function Layout({ children }) {
    return (
        <>
            <Header />
            <div className='bg-offwhite dark:bg-slate-900 h-screen p-8'>
                {children}
            </div>
            <Footer />
        </>
    )
}
