import { getProducts } from "@/lib/actions/actions"
import ProductCard from "../ProductCard";
import Link from "next/link";
import Image from "next/image";

const Shoes = async () => {
    const category = "Shoes"
    const allProducts = await getProducts()

    const filterProducts = allProducts.filter((product: ProductType) =>
        product.category.includes(category)
    )

    const products = filterProducts.slice(0, 4)

    return (
        <div>
            <Link href={`/products/productCategory/${category}`} >
            <Image src="/vineet-joshi-shoes-banner.jpg" alt="shose" width={1000} height={1000} className="w-full h-[600px] mix-blend-multiply py-10" />
            </Link>
            <div className="flex flex-wrap mx-auto gap-10 justify-center items-center">
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
export default Shoes;