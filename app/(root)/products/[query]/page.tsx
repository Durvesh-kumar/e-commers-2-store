import ProductCard from '@/app/components/products/ProductCard';
import { getProducts } from '@/lib/actions/actions'

const Query = async({params}:{params:{query:string}}) => {
      const allproducts = await getProducts()

      const filterProducts = allproducts.filter(
        (product:ProductType)=>(
            product.brand.toLowerCase().includes(params.query.toLowerCase()) ||
            product.category.toLowerCase().includes(params.query.toLowerCase()) ||
            product.title.toLowerCase().includes(params.query.toLowerCase()) ||
            product.collections?.title.toLowerCase().includes(params.query.toLowerCase()) ||
            product.tags.map((item)=> item.toLowerCase()).includes(params.query.toLowerCase()) ||
            product.colors.map((item)=> item.toLowerCase()).includes(params.query.toLowerCase())
        ))

  return (
    <div className='grid gap-8'>
        <h1 className='font-bold text-3xl'>Search Products</h1>
        <hr className='py-0.5 bg-gray-950'/>
        {
            filterProducts.length === 0 &&(
                <p className='font-bold text-2xl flex items-center justify-center'>Products not found</p>
            )
        }
            <div className="flex flex-wrap mx-auto gap-10 justify-center items-center">
            {
                filterProducts?.map((product: ProductType) => (
                    <ProductCard key={product._id} product={product} />
                ))
            }
            </div>
        </div>
  )
}
export const dynamic = "force-dynamic";
export default Query