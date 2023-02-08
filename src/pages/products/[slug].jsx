import { useRouter } from "next/router"
import data from "utils/data";

import Layout from "components/layout";
import Error from "../404";
import ProductDetails from "components/products/ProductDetails";

export default function Product() {
    const { query: { slug } } = useRouter();
    const product = data.products.find(x => x.slug == slug);

    if(!product) return <Error />
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


// export async function getServerSideProps(context) {
//     const res = await getReq(`/getUrl`, 'content', context);
//     switch (res.url) {
//         case 'checkout': {
//             return {
//                 props: {
//                     //my other props
//                 },
//             };
//         }
//         default:
//             return {
//                 notFound: true
//             };
//     }
// }