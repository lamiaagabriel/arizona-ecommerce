import axios from "axios";

import Layout from "components/layout";
import MessagePage from "components/MessagePage";
import ProductDetails from "components/products/ProductDetails";
import Link from "next/link";

export default function Product({ product }) {
    if(!product)
        return (
            <MessagePage title='Not Found'>
                <h1 className="text-4xl mb-2">Product Not Found</h1>
                <Link href='/' className="primary-button">Continue Shipping</Link>
            </MessagePage>
        )

    return (
        <Layout title={product.title}>
            <section>
                <div className="container">
                    <ProductDetails product={product} />
                </div>
            </section>
        </Layout>
    )
}


export async function getStaticPaths() {
    const { docs } = await axios.get('/products').then(res => res.data);
    const paths = docs && docs.map(product => ({
        params: { slug: product.slug }
    }));
    return {
        paths: paths,
        fallback: 'blocking'
    }
  }
export async function getStaticProps(context) {
    const { doc } = await axios.get(`/products/${context.params.slug}`).then(res => res.data);
    return {
        props: { product: doc },
        revalidate: 100
    }
}
