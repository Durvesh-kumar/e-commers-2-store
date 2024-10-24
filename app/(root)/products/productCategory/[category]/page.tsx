
import ProductCard from "@/app/components/products/ProductCard"
import { getProducts } from "@/lib/actions/actions"

const Category = async ({ params }: { params: { category: string } }) => {
    const allProducts = await getProducts()

    const filterProducts = allProducts.filter((product: ProductType) =>
        product.category.includes(params.category)
    )
    return (
        <div className="flex flex-wrap mx-auto gap-10 justify-center items-center">
            {
                filterProducts.map((product: ProductType) => (
                    <ProductCard key={product._id} product={product} />
                ))
            }
        </div>
    )
}

export const dynamic = "force-dynamic";
export default Category;