import { getProducts } from "@/lib/actions/actions"
import ProductCard from "../ProductCard";
import Link from "next/link";
import Image from "next/image";

const Electronices = async () => {
    const category = "Electronices"
    const allProducts = await getProducts()

    const filterProducts = allProducts.filter((product: ProductType) =>
        product.category.includes(category)
    )

    const products = filterProducts.slice(0, 4)

    return (
        <div>
            <Link href={`/products/productCategory/${category}`} className="relative">
                <Image src="/electronice.png" alt="mobiles" width={1000} height={1000} className="w-full h-[500px] bg-slate-200 mix-blend-multiply" />
                <div className="absolute top-10 left-0 flex gap-10">
                    <p className="text-start px-10 font-bold w-2/3 flex items-center justify-center h-[400px] bg-blend-lighten hover:bg-blend-darken">
                        At Tech Haven Electronics, we believe in providing a seamless shopping experience.
                        Our store is designed to make your visit enjoyable and efficient, with well-organized sections and interactive displays.
                        Whether you’re looking to upgrade your smartphone, find the perfect gift, or explore the latest tech trends,
                        Tech Haven Electronics is your go-to destination.
                    </p>
                    <div className="flex items-center justify-around h-[500px]">
                    <button className="px-4 py-1 border-black bg-transparent font-bold rounded-md border w-fit hover:bg-slate-200">Learn more...</button>
                    </div>
                    
                </div>

            </Link>
            <div className="flex flex-wrap mx-auto gap-10 justify-center items-center mt-10">
                {
                    products.map((product: ProductType) => (
                        <ProductCard key={product._id} product={product} />
                    ))
                }
            </div>
            <div className="flex justify-end my-5">
                <Link href={`/products/productCategory/${category}`} className=" underline text-blue-500 w-fit hover:bg-slate-200 px-2" >Show more</Link>
            </div>

        </div>
    )
}
export const dynamic = "force-dynamic"
export default Electronices;