import Link from "next/link";
import Layout from "components/layout";

export default function Error() {
    return (
        <Layout title='404' className='flex flex-col'>
            <section className="grow flex-center">
                <div className="container flex-center flex-col gap-4 w-full h-full">
                    <h1 className="text-9xl mb-5">404</h1>
                    <p>Page Not Found</p>
                    <Link href='/' className="primary-button">Go Home</Link>
                </div>
            </section>
        </Layout>
    )
}