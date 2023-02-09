import axios from "axios";
import Link from "next/link";
import { TrashIcon } from "@heroicons/react/outline";

import MessagePage from "components/MessagePage";
import Layout from "components/layout";
import { useRouter } from "next/router";

export default function Orders({ docs }) {
    const router = useRouter();
    
    if(!docs || docs?.length == 0) {
        return (
            <MessagePage title='Orders'>
                <h1 className="text-4xl">There is no orders</h1>
                <Link href='/cart' className="primary-button">Place Order</Link>
            </MessagePage>
        )
    }
    
    const cancelOrderHandler = async(id) => {
        const result = await axios.delete('/orders/' + id);

        if(!result.errors)
            router.reload();
    }
    return (
        <Layout title='Orders'>
            <section>
                <div className="container">
                    <h1 className='text-2xl pb-5'>Orders</h1>
                    <div className='card p-4'>
                        <h1 className='font-semibold pb-4 text-lg'>Orders</h1>
                        <table className='w-full'>
                            <thead className='border-b border-b-slate-400 [&>tr>th]:py-2 md:[&>tr>th]:py-4'>
                                <tr>
                                    <th>ID</th>
                                    <th>Paid</th>
                                    <th>Delivered</th>
                                    <th>Total Price</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody className='text-center [&>tr>td]:py-2 md:[&>tr>td]:py-4'>
                                {docs.map(order => (
                                    <tr key={order._id}>
                                        <td className="max-w-[50px] truncate">
                                            <Link href={'/orders/' + order._id}>{order._id}</Link>    
                                        </td>
                                        <td className={order.isPaid? 'text-green-400' : 'text-red-400'}>{!order.isPaid && 'Not '}Paid</td>
                                        <td className={order.isDelivered? 'text-green-400' : 'text-red-400'}>{!order.isDelivered && 'Not '}Delivered</td>
                                        <td>${order.totalPrice}</td>
                                        <td>
                                            <div className='flex-center gap-2'>
                                                <TrashIcon className='icon table-icon text-red-500' onClick={() => cancelOrderHandler(order._id)} />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </Layout>
    )
}
Orders.auth = true;

export async function getServerSideProps() {
    const { data: { docs } } = await axios.get('/orders');
    return {
      props: { docs }
    }
}

// {docs[0].items.map(product => (
//     <tr key={product.slug}>
//         <td>
//             <Link href={'/products/' + product.slug}>
//                 <div className='flex-start gap-4'>
//                     <Image
//                         src={product.image}
//                         alt={product.title}
//                         width={1000}
//                         height={1000}
//                         className='w-16 h-16 object-cover object-center'
//                     />
//                     {product.title}
//                 </div>
//             </Link>
//         </td>
//         <td>{product.quantity}</td>
//         <td>${product.price}</td>
//         <td>${product.price * product.quantity}</td>
//     </tr>
// ))}