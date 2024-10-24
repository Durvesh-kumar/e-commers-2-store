import Image from "next/image"
import Link from "next/link"

const categoryLink = [
    {
        name: "Mobiles",
        image: "/mobileLink.jpg",
        categroy: "Mobiles"
    },
    {
        name: "Watches",
        image: "/watchLink.jpg",
        categroy: "Watches"
    },
    {
        name: "Shoes",
        image: "/shoesLink.jpg",
        categroy: "Shoes"
    },
    {
        name: "Cloth",
        image: "/clothLink.jpg",
        categroy: "Clothes"
    },
    {
        name: "Electronic",
        image: "/electronices.jpg",
        categroy: "Electronices"
    },
    {
        name: "Jewellery",
        image: "/JewelleryLink.jpg",
        categroy: "Jewellery"
    },
    {
        name: "Camera",
        image: "/cameraLink.jpg",
        categroy: "Camera"
    },

]

function Constant() {

    return (
        <div className="h-16 mt-3">
            <div className="flex gap-5 items-center justify-around overflow-auto tailwind-scrollbar-hide scroll-smooth">
                {
                    categoryLink.map((link, index:number) => (
                        <Link href={`/products/productCategory/${link.categroy}`} key={link.categroy+index} className="flex gap-1 flex-col">
                            <Image
                                src={link.image}
                                alt={link.categroy}
                                width={1000}
                                height={1000}
                                className="w-14 h-14 object-scale-down mix-blend-multiply rounded-full border-2 border-black hover:shadow-blue-400 hover:shadow-lg p-1"
                            />
                            <p className="font-medium text-sm text-center">{link.name}</p>
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}

export const dynamic = "force-dynamic";
export default Constant;