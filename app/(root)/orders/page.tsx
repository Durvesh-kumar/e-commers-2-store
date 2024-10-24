import { IndianCurrency } from "@/app/helper/IndianCurrency";
import { getOrders } from "@/lib/actions/actions";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";

const Orders = async() => {
  const {userId} = auth()

  const orders = await getOrders(userId as string);

  return (
    <div className="grid gap-5">
      <h1 className="text-2xl font-bold text-gray-800">Your Orders</h1>
      <hr className="py-0.5 bg-black shadow-md my-5" />
      {!orders || orders.length === 0 ? (
        <p>Your have no orders yet.</p>
      ) : (
        <div className="flex flex-col gap-10">
          {orders?.map((order: OrderType) => (
            <div key={order._id} className="flex flex-col gap-8 p-4 hover:bg-gray-50 bg-pink-50 rounded-lg shadow-md border">
              <div className="flex gap-20 max-md:flex-col max-md:gap-3">
                <p className="text-lg font-semibold">Order ID: {order?._id}</p>
                <p className="text-lg font-semibold flex items-center gap-2">
                   <span>Tolte Amount:</span>
                  {IndianCurrency(order?.totalAmount)}
                </p>
              </div>

              <div className="flex flex-col gap-8">
                {order?.products?.map((orderItem:OrderItemType) => (
                  <div key={orderItem._id} className="flex gap-24 max-md:gap-3 max-md:flex-col">
                  <div className="flex gap-6 max-md:flex-col" key={orderItem._id}>
                    <Image
                      src={orderItem?.product.media[0]}
                      alt={orderItem?.product.title}
                      width={500}
                      height={500}
                      className="h-32 w-32 object-scale-down mix-blend-multiply rounded-lg"
                    />
                    <div className="flex flex-col items-start justify-between">
                        <p className="text-xl font-bold">Title: <span className=" font-medium">{orderItem?.product.title}</span></p>
                        {
                            orderItem?.color &&(
                                <p className="font-bold">
                                    Color: {" "}
                                    <span className="font-medium">
                                        {orderItem.color}
                                    </span>
                                </p>
                            )
                        }
                        {
                            orderItem?.size &&(
                                <p className="font-bold">
                                    Size: {" "}
                                    <span className="font-medium">
                                        {orderItem.size}
                                    </span>
                                </p>
                            )
                        }
                        {
                            orderItem?.quantity &&(
                                <p className="font-bold">
                                    Quantity: {" "}
                                    <span className="font-medium">
                                        {orderItem.quantity}
                                    </span>
                                </p>
                            )
                        }
                    </div>
                    
                  </div>
                  <div>
                    <p className="text-lg flex items-center gap-2"><span className="font-semibold">Price: </span><span className="text-gray-400 line-through">{IndianCurrency(orderItem?.product?.price)}</span></p>
                    <p className="text-lg flex items-center gap-2"><span className="font-semibold">Pay: </span><span className="text-gray-800">{IndianCurrency(orderItem?.product?.pay)}</span></p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export const dynamic = "force-dynamic";
export default Orders