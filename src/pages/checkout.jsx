import Link from "next/link";
import Layout from "components/layout";
export default function Checkout() {
    return (
        <Layout title='404' className='flex flex-col'>
            <section className="grow flex-center">
                <div className="container flex-center flex-col gap-4 w-full h-full">
                    <h1 className="text-5xl mb-5">Checkout</h1>
                    <Link href='/' className="primary-button">Go Home</Link>
                </div>
            </section>
        </Layout>
    )
}