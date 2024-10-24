import { getRelatedProducts } from "@/lib/actions/actions";
import ProductCard from "../../ProductCard";

interface RelatedProductsPropes {
    productId: string
}

const RelatedProducts: React.FC<RelatedProductsPropes> = async ({ productId }) => {

    const products = await getRelatedProducts(productId)

    return (
        <>
            {
                products?.length > 0 && (
                    <div>
                        <hr className="py-[1px] bg-gray-900 shadow-md mb-6" />
                        <div className="flex flex-wrap mx-auto gap-10 justify-center items-center">
                            {
                                products?.map((product: ProductType) => (
                                    <ProductCard key={product._id} product={product} />
                                ))
                            }
                        </div>
                    </div>
                )
            }

        </>
    )
}

export default RelatedProducts;