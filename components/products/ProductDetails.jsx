import Image from 'next/image';
import { addToCartHandler } from './actions';
import { useStore } from 'utils/store';


export default function ProductDetails({ product }) {
    const { state, dispatch } = useStore();

    return(
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 ">
            <Image
                src={product.image}
                alt={product.title}
                width={1000}
                height={1000}
                className='max-h-[400px] object-cover object-center'
            />
            {/* Details */}
            <div>
                <div className="h-full flex-col-between ite gap-4">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-2xl">{product.title}</h1>
                        <div className="text-sm font-light [&>p>span]:font-normal">
                            <p>category: <span>{product.category}</span></p>
                            <p>brand: <span>{product.brand}</span></p>
                        </div>
                        <div className="text-sm font-light [&>p>span]:font-normal">
                            <p>rating: <span>{product.rating}</span></p>
                            <p>description: <span>{product.description}</span></p>
                        </div>
                    </div>

                    <div className="card">
                        <div className="w-full [&>p]:flex-between [&>p>span]:font-normal p-2 text-sm font-light">
                            <p>price: <span>${product.price}</span></p>
                            <p>status: <span>{product.countInStock > 0? 'In Stock': 'Out Of Stock'}</span></p>
                            <button className='w-full mt-2 primary-button' onClick={() => addToCartHandler(state, dispatch, product)}>Add To Cart</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}