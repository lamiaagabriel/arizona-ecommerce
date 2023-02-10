import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { PencilIcon, TrashIcon } from '@heroicons/react/outline'

import { useStore } from 'utils/store';
import { removeFromCartHandler, updateCartHandler } from 'components/products/actions';

import Layout from 'components/layout';

function Cart() {
    const router = useRouter();
    const { state: { cart: { cartItems } }, dispatch } = useStore();

    if(cartItems.length === 0)
        return (
            <Layout title='Cart' className='flex flex-col'>
                <section className="grow flex-center">
                    <div className="container flex-center flex-col gap-4 w-full h-full">
                        <h1 className="text-7xl mb-5">Cart is Empty</h1>
                        <Link href='/' className="primary-button">Go Shopping</Link>
                    </div>
                </section>
            </Layout>
        );


    const updateCartHandle = (e, product) => {
        const quantity = Number(e.target.value);
        updateCartHandler(dispatch, { ...product, quantity });
    }

  return (
    <Layout title='Cart'>
        <section>
            <div className="container">
                <h1 className='text-2xl pb-5'>Shopping Cart</h1>
                <div className='grid grid-cols-1 gap-4 md:grid-cols-[1fr,300px]'>
                    <div>
                        <table className='w-full'>
                            <thead className='border-b border-b-slate-400 [&>tr>th]:py-2 md:[&>tr>th]:py-4'>
                                <tr>
                                    <th>Title</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th>Total Price</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody className='text-center [&>tr>td]:py-2 md:[&>tr>td]:py-4'>
                                {cartItems.map(product => (
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
                                        <td className='input-field my-3'>
                                            <select name='quantity' value={product.quantity} onChange={(e) => updateCartHandle(e, product)} className='p-2 cursor-pointer outline-none'>
                                                {[...Array(product.countInStock).keys()].map(x => (
                                                    <option key={x} value={x + 1}>{x + 1}</option>
                                                ))}
                                            </select>    
                                        </td>
                                        <td>${product.price}</td>
                                        <td>${product.price * product.quantity}</td>
                                        <td>
                                            <div className='flex-center gap-2'>
                                                <PencilIcon className='icon table-icon text-green-500' />
                                                <TrashIcon className='icon table-icon text-red-500' onClick={() => removeFromCartHandler(dispatch, product)} />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className='flex-col-between gap-4'>
                        <div className="card">
                            <div className="w-full [&>p]:flex-between p-2">
                                <p>Items: <span>{cartItems.reduce((acc, item) => acc + item.quantity, 0)}</span></p>
                                <p>Subtotal: <span>${cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0)}</span></p>
                                <button className='w-full mt-2 primary-button' onClick={() => router.push('auth/login?redirect=/shipping')}>Checkout</button>
                            </div>
                        </div>

                        <Link href='/orders' className='w-full text-center mt-2 primary-button'>View Orders</Link>
                    </div>
                </div>
            </div>
        </section>
    </Layout>
  )
}

// To be rendered Only as client-side component, or use useState instead -> like we did with the cart icons
// May need to add: "env": { "browser": true, "node": true, "es6": true }
export default dynamic(() => Promise.resolve(Cart), { ssr: false });