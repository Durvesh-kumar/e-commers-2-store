import Gallery from "@/app/components/products/productDetails/Gallery";
import ProductInfo from "@/app/components/products/productDetails/ProductInfo";
import RelatedProducts from "@/app/components/products/productDetails/RelatedProducts/RelatedProducts";
import Reviews from "@/app/components/products/productDetails/Reviews";
import { getProductDetails, getReviews } from "@/lib/actions/actions"
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

const ProductCategory = async ({ params }: { params: { productId: string } }) => {
  const { userId } = await auth();
  const product = await getProductDetails(params.productId);
  const reviews = await getReviews(params.productId)
  return (
    <div className="flex flex-col">
      <div className="flex items-start gap-10 justify-center py-10 max-md:flex-col max-md:items-center">
        <Gallery product={product} />
        <ProductInfo product={product} reviews={reviews}/>
      </div>

      <RelatedProducts productId={params.productId} />

      <div className="flex items-center justify-end mt-8">
        <Link
          href={userId ? `/products/productDetails/${params.productId}/reviews` : "/sign-in"}
          className="px-4 py-1 w-fit border-2 hover:border-black hover:text-black text-white hover:bg-white bg-blue-500 font-bold rounded-lg shadow-lg"
        >Create review</Link>
      </div>

      <Reviews reviews={reviews} />

    </div>
  )
}
export const dynamic = "force-dynamic";
export default ProductCategory;