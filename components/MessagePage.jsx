import Layout from "./layout"

export default function MessagePage({ title, children }) {
    return (
        <Layout title={title} className='flex flex-col'>
            <section className="grow flex-center">
                <div className="container flex-center flex-col gap-4 w-full h-full">
                    {children}
                </div>
            </section>
        </Layout>
    )
}