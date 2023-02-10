import Link from "next/link";
import Image from "next/image";
import axios from "axios";

import Layout from "components/layout";
import MessagePage from "components/MessagePage";
import { useRouter } from "next/router";

export default function Order({ order }) {
    const router = useRouter();
    if(!order)
        return (
            <MessagePage title='Not Found'>
                <h1 className="text-4xl mb-2">Order Not Found</h1>
                <Link href='/' className="primary-button">Continue Shipping</Link>
            </MessagePage>
        )
    const cancelOrderHandler = async() => {
        const result = await axios.delete('http://localhost:3000/api/orders/' + order._id);
        console.log(result);
        if(!result.errors) router.replace('/orders');
    }
    return (
        <Layout title='Order Details'>
            <section>
                <div className="container">
                    <h1 className='font-semibold text-xl pb-4'>Order Details <span>{order._id}</span></h1>
                    <div className='grid grid-cols-1 lg:grid-cols-[1fr,300px] gap-4'>
                        <div className='flex-col-between gap-4'>
                            <div className='card p-4 text-lg'>
                                <div className='flex-between gap-2'>
                                    <h1 className='font-semibold pb-4'>Shipping Address</h1>
                                    <p className={order.isDelivered? 'bg-green-400': 'bg-red-400' + ' p-2 rounded-3xl text-sm text-white'}>{!order.isDelivered && 'Not '}Delivered</p>
                                </div>
                                <div className="w-full [&>p]:flex-between [&>p>span]:font-light p-2">
                                    <p>Full Name: <span>{order.shippingAddress.name}</span></p>
                                    <p>Address: <span>{order.shippingAddress.address}</span></p>
                                    <p>Country: <span>{order.shippingAddress.country}</span></p>
                                    <p>City: <span>{order.shippingAddress.city}</span></p>
                                    <p>Postal Code: <span>{order.shippingAddress.postalCode}</span></p>
                                </div>
                            </div>

                            <div className='card p-4 [&>p]:font-light'>
                                <div className='flex-between gap-2'>
                                    <h1 className='font-semibold pb-4'>Payment Method</h1>
                                    <p className={order.isPaid? 'bg-green-400': 'bg-red-400' + ' p-2 rounded-3xl text-sm text-white'}>{!order.isPaid && 'Not '}Paid</p>
                                </div>
                                <p>{order.paymentMethod}</p>
                            </div>

                            <div className='card p-4'>
                                <h1 className='font-semibold pb-4 text-lg'>Order Items</h1>
                                <table className='w-full'>
                                    <thead className='border-b border-b-slate-400 [&>tr>th]:py-2 md:[&>tr>th]:py-4'>
                                        <tr>
                                            <th>Title</th>
                                            <th>Quantity</th>
                                            <th>Price</th>
                                            <th>Total Price</th>
                                        </tr>
                                    </thead>
                                    <tbody className='text-center [&>tr>td]:py-2 md:[&>tr>td]:py-4'>
                                        {order.items.map(product => (
                                            <tr key={product.slug}>
                                                <td>
                                                    <Link href={'/products/' + product.slug}>
                                                        <div className='flex-start gap-4'>
                                                            <Image
                                                                src={product.image}
                                                                alt={product.title}
                                                                width={1000}
                                                                height={1000}
                                                                className='w-16 h-16 object-cover object-center'
                                                            />
                                                            {product.title}
                                                        </div>
                                                    </Link>
                                                </td>
                                                <td>{product.quantity}</td>
                                                <td>${product.price}</td>
                                                <td>${product.price * product.quantity}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div>
                            <div className='flex-col-between gap-4'>
                                <div className='card p-4 text-lg'>
                                    <h1 className='font-semibold pb-4'>Order Summary</h1>
                                    <div className="w-full [&>p]:flex-between p-2">
                                        <p>Items: <span>{order.itemsPrice}</span></p>
                                        <p>shipping: <span>${order.shippingPrice}</span></p>
                                        <p>tax: <span>${order.taxPrice}</span></p>
                                        <p>total: <span>${order.totalPrice}</span></p>
                                        <button className='w-full mt-2 cancel-button' onClick={cancelOrderHandler}>Cancel Order</button>
                                    </div>
                                </div>
                                <Link href='/orders' className='w-full text-center mt-2 primary-button'>View Orders</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    )
}
Order.auth = true;


export async function getStaticPaths() {
    const { docs } = await axios.get('http://localhost:3000/api/orders').then(res => res.data);
    const paths = docs && docs.map(order => ({
        params: { id: order._id }
    }));
    return {
        paths: paths,
        fallback: 'blocking'
    }
  }
export async function getStaticProps(context) {
    const { doc } = await axios.get(`http://localhost:3000/api/orders/${context.params.id}`).then(res => res.data);
    return {
        props: { order: doc },
        revalidate: 10
    }
}
