import ProductItem from "./ProductItem";

export default function Products({ products }) {
    return(
        <div className="grid grid-cols-1 xs:grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {products.map(product => <ProductItem key={product.slug} product={product} />)}
        </div>
    )
}