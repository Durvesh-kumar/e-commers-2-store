import { IndianCurrency } from "@/app/helper/IndianCurrency"
import Image from "next/image"
import Link from "next/link"
import Favouite from "../Favouite"

interface ProductCardPropes {
    product: ProductType;
    updateSingedInUser?: (updateUser: UserType) => void;
}
const ProductCard: React.FC<ProductCardPropes> = ({ product, updateSingedInUser }) => {
    return (
        <Link href={`/products/productDetails/${product._id}`} className="w-64 rounded-lg border shadow-md hover:shadow-xl hover:shadow-slate-600 shadow-blue-600 duration-100 scale-100 pb-3">
            <Image
                src={product?.media[0]}
                alt="image"
                width={1000}
                height={1000}
                className="w-64 h-64 object-scale-down mix-blend-multiply bg-slate-100 rounded-t-lg py-2"
            />
            <hr />
            <div className="p-3">
                <h3 className="text-lg font-bold text-gray-950">{product.title}</h3>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <span>{IndianCurrency(product.pay)}</span>
                        <span className="text-gray-400 line-through">{IndianCurrency(product.price)}</span>
                    </div>
                    <Favouite productId={product._id} updateSingedInUser={updateSingedInUser} />
                </div>
            </div>
        </Link>
    )
}

export default ProductCard;