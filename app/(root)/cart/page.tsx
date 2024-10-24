"use client"

import CartProducts from "@/app/components/cart/CartProducts";
import { IndianCurrency } from "@/app/helper/IndianCurrency";
import { useCart } from "@/lib/hooks/useCart";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const Cart = () => {
    const cart = useCart();
    const { user } = useUser();
    const router = useRouter();

    const totle = cart.cartItems.reduce(
        (account, cartItem) => account + cartItem?.item.pay * cartItem?.quantity, 0
    );

    const totalRound = parseFloat(totle.toFixed(2));

    const customer = {
        clerkId: user?.id,
        fullName: user?.fullName,
        email: user?.emailAddresses[0].emailAddress,

    }

    const handleCheckOut = async () => {
        try {
            if (!user) {
                router.push("/sign-in");
                return;
            }

            const res = await fetch(`${process.env.NEXT_PUBLIC_DASHBOARD_URL}/api/checkout`, {
                method: "POST",
                body: JSON.stringify({ customer, cartItems: cart.cartItems })
            });

            if (res.ok) {
                const data = await res.json();
                window.location.href = (data.url);
            }
        } catch (error) {
           console.log("[cart_POST]", error);
        }
    }
    return (
        <div className="flex gap-10 max-md:flex-col">
            <CartProducts cart={cart} />
            <div className="bg-slate-200 w-1/3 flex flex-col gap-4 rounded-lg px-4 py-5 max-md:w-full">
                <h1 className="flex items-center justify-center text-2xl font-bold m-3">
                    Summary &nbsp;
                    <span>{`${cart.cartItems.length} ${cart.cartItems.length > 1 ? "Products" : "Product"}`}</span>
                </h1>

                <div className="flex items-center justify-between text-lg font-bold px-4">
                    <span>Total Amount</span>
                    <span>{IndianCurrency(totalRound)}</span>
                </div>
                <div className="flex items-center justify-center">
                    <button onClick={handleCheckOut} className="bg-white rounded-lg border-2 mt-4 border-black py-1 font-medium px-8 hover:bg-black hover:text-white flex items-center justify-center">
                        Product to Checkout
                    </button>
                </div>
            </div>
        </div>
    )
}

export const dynamic = "force-dynamic";
export default Cart;