import Link from 'next/link';
import Image from 'next/image';
import { addToCartHandler } from './actions';
import { useStore } from 'utils/store';

export default function ProductItem({ product }) {
  const { state, dispatch } = useStore();
  
    return(
    <div className="card">
        <Link href={'/products/' + product.slug}>
            <Image
              src={product.image}
              alt={product.title}
              width={1000}
              height={1000}
              className="rounded shadow"
            />
        </Link>
        <div className='p-2'>
          <Link href={'/products/' + product.slug}>
            <h1 className='text-lg font-semibold'>{product.title}</h1>
            <div className='text-sm flex-between pb-2'>
                <p>{product.brand}</p>
                <p className=''>${product.price}</p>
            </div>
          </Link>
          <button className='w-full mt-2 primary-button' onClick={() => addToCartHandler(state, dispatch, product)}>Add To Cart</button>
        </div>
      </div>
    )
}