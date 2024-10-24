import { IndianCurrency } from "@/app/helper/IndianCurrency";
import { CartItem, CartStore } from "@/lib/hooks/useCart"
import { CircleMinus, PlusCircle, Trash2 } from "lucide-react";
import Image from "next/image";

interface CartProductsPropes {
    cart: CartStore;
}
const CartProducts: React.FC<CartProductsPropes> = ({ cart }) => {
    return (
        <div className="w-2/3 grid gap-8 max-md:w-full">
            <h1 className="text-3xl font-bold">Shopping Cart</h1>

            <hr className="py-0.5 bg-gray-950" />

            {
                cart.cartItems.length === 0 ? (
                    <p className="text-xl font-bold flex items-center justify-center">No Products in cart</p>
                )
                    :
                    (
                        <div className="grid gap-10 max-sm:items-center max-sm:justify-center">
                            {
                                cart?.cartItems.map((cartItem: CartItem) => (
                                    <div key={cartItem.item._id} className="bg-white rounded-lg p-2 hover:bg-slate-200">
                                        <div className="flex items-center max-md:flex-col gap-5">
                                            <Image
                                                src={cartItem.item.media[0]}
                                                alt="image"
                                                width={1000}
                                                height={1000}
                                                className="w-32 h-32 max-md:w-52 max-md:h-52 border shadow-md object-scale-down mix-blend-multiply py-1 rounded-lg"
                                            />
                                            <div className="flex items-center justify-between gap-3 w-full max-sm:flex-col px-2">
                                                <div className="grid gap-1">
                                                    <div className="text-xl font-bold">{cartItem.item.title}</div>
                                                    <div className="flex items-center gap-3">
                                                        <h2 className="text-lg font-bold">Price:</h2>
                                                        <div className="flex items-center gap-3">
                                                            <span className="font-medium">{IndianCurrency(cartItem.item.pay)}</span>
                                                            <span className="font-medium text-stone-600 line-through">{IndianCurrency(cartItem.item.price)}</span>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <h2 className="text-lg font-bold">Color:</h2>
                                                        <p className="font-medium">{cartItem.color}</p>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <h2 className="text-lg font-bold">Size:</h2>
                                                        <p className="font-medium">{cartItem.size}</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-10">
                                                    <div className="flex gap-3">
                                                        <CircleMinus onClick={() => {
                                                            if (cartItem.quantity > 1) {
                                                                cart.decresaeQuantity(cartItem.item._id)
                                                            }
                                                        }}
                                                        />
                                                        {cartItem.quantity}
                                                        <PlusCircle onClick={() => { cart.increaseQuantity(cartItem.item._id) }} />
                                                    </div>
                                                    <div className="hover:bg-slate-300 w-8 h-8 rounded-lg flex items-center justify-center">
                                                        <Trash2 onClick={() => cart.removeItem(cartItem.item._id)} className="w-5 h-5" />
                                                    </div>

                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    )
            }

        </div>
    )
}

export default CartProducts