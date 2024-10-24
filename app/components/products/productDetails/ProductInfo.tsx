"use client"
import { IndianCurrency } from "@/app/helper/IndianCurrency";
import { useCart } from "@/lib/hooks/useCart";
import { CircleMinus, CirclePlus, Star, StarHalf } from "lucide-react";
import { useState } from "react";
import Favouite from "../../Favouite";
import { useUser } from "@clerk/nextjs";

interface ProductInfoPropes {
    product: ProductType
    reviews: ReviewsType[]
}
const ProductInfo: React.FC<ProductInfoPropes> = ({ product, reviews }) => {

    const [selectSize, setSelectSize] = useState(product?.sizes[0]);
    const [selectColor, setSelectColor] = useState(product?.colors[0]);
    const [quantity, setQuantity] = useState<number>(1);

    const { user } = useUser();
    const Cart = useCart();

    const reviewsFilter = reviews?.filter((review: ReviewsType) =>
        review.rating === "5" || "4"
    )

    return (
        <div className="flex flex-col gap-6 md:w-1/2 px-2">
            <div className="flex gap-3 items-center">
                <h1 className="text-orange-400 text-xl font-bold">Brand :</h1>
                <p className="bg-red-500 text-white w-fit px-6 py-0.5 text-lg rounded-2xl animate-pulse">{product.brand}</p>
            </div>

            <div className="flex gap-3 items-center">
                <h1 className="text-orange-400 text-xl font-bold">Reating :</h1>
                <div className="flex gap-2 items-center">
                    {
                        [...Array(4)].map((index: number) =>
                            <Star
                                key={index + 1}
                                fill="yellow"
                                color="#5CB002"
                                className="w-4 h-4"
                            />

                        )
                    }
                    <div className="relative">
                        <StarHalf
                            fill="yellow"
                            color="#5CB002"
                            className="w-4 h-4"
                        />
                    </div>
                    <p className="text-lg font-medium bg-gray-200 w-fit px-3">4.5</p>

                    <div className="flex items-center gap-1 text-slate-600">
                        <p>{reviewsFilter?.length}</p>
                        <p>rating popels</p>
                    </div>
                </div>

            </div>
            <div className="flex gap-4 items-center justify-between">

                <div className="flex gap-3 items-center">
                    <h1 className="text-orange-400 text-xl font-bold">Price :</h1>
                    <div className="flex gap-3 font-semibold">
                        <span>{IndianCurrency(product.pay)}</span>
                        <span className="text-slate-600 line-through">{IndianCurrency(product.price)}</span>
                    </div>
                </div>
                <Favouite productId={product._id} />
            </div>

            <div className="flex flex-col gap-3">
                <h1 className="text-orange-400 text-xl font-bold">Discription :</h1>
                <p className="text-gray-950 text-sm">{product.discription}</p>
            </div>


            {
                product?.sizes[0] && (
                    <div className="flex flex-col gap-3">
                        <h1 className="text-orange-400 text-xl font-bold">Sizes :</h1>
                        <div className="flex gap-2">
                            {
                                product?.sizes?.map((size: string, index: number) => (
                                    <span
                                        key={index}
                                        onClick={() => setSelectSize(size)}
                                        className={`py-0.5 px-2 border-2 border-black rounded-lg ${selectSize === size && "bg-black text-white"
                                            }`}
                                    >
                                        {size}
                                    </span>
                                ))
                            }
                        </div>
                    </div>
                )
            }

            {
                product?.colors[0] && (
                    <div className="flex flex-col gap-3 w-1/2">
                        <h1 className="text-orange-400 text-xl font-bold">Sizes :</h1>
                        <div className="flex gap-2">
                            {
                                product?.colors?.map((color: string, index: number) => (
                                    <span
                                        key={index}
                                        onClick={() => setSelectColor(color)}
                                        className={`py-0.5 px-2 border-2 border-black rounded-lg ${selectColor === color && "bg-black text-white"
                                            }`}
                                    >
                                        {color}
                                    </span>
                                ))
                            }
                        </div>
                    </div>
                )
            }
            <div className="flex gap-3">
                <h1 className="text-orange-400 text-xl font-bold">Quantity :</h1>
                <div className="flex gap-3">
                    <CircleMinus onClick={() => {
                        quantity > 1 && (
                            setQuantity(quantity - 1)
                        )
                    }} />
                    <p>{quantity}</p>
                    <CirclePlus onClick={() => setQuantity(quantity + 1)} />
                </div>
            </div>

            <div className="flex items-center justify-center">
                <button onClick={() => { user ? Cart.addItem({ item: product, quantity, color: selectColor, size: selectSize }) : "/sign-in" }} className=" py-2 px-14 bg-yellow-500 font-bold text-xl border-2 border-black hover:bg-white shadow-lg  rounded-3xl">Add To Cart</button>
            </div>

        </div>
    )
}

export const dynamic = "force-dynamic"
export default ProductInfo