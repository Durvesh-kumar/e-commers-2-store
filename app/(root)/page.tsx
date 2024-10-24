import Camera from "../components/products/productCategory/Camera";
import Clothes from "../components/products/productCategory/Clothes";
import Electronices from "../components/products/productCategory/Electronices";
import Jewellery from "../components/products/productCategory/Jewellery";
import Mobiles from "../components/products/productCategory/Mobiles";
import Shoes from "../components/products/productCategory/Shoes";
import Watches from "../components/products/productCategory/Watches";

export default function Home() {
  return (
    <div className="grid gap-5">
      <Mobiles />
      <Watches />
      <Electronices />
      <Shoes />
      <Clothes />
      <Camera />
      <Jewellery />
    </div>
  )
}
export const dynamic = "force-dynamic"