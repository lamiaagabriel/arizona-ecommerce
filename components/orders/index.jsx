import OrderItem from "./OrderItem";

export default function Orders({ orders }) {
    return(
        <div className="grid grid-cols-1 xs:grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {orders.map(order => <OrderItem key={order._id} order={order} />)}
        </div>
    )
}