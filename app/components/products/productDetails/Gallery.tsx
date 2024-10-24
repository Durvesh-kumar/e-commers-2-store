"use client"

import Image from "next/image"
import { useState } from "react"

interface GalleryPropes {
    product: ProductType
}
const Gallery: React.FC<GalleryPropes> = ({ product }) => {
    const [minImage, setMainImage] = useState(product?.media[0])
    return (
        <div className="flex gap-6 max-md:flex-col ">
            <div className="flex gap-3 md:flex-col overflow-auto tailwind-scrollbar-hide">
                {
                    product?.media?.map((image) =>
                        <Image
                            key={image}
                            src={image}
                            alt="image"
                            width={1000}
                            height={1000}
                            onClick={()=> setMainImage(image)}
                            className={`w-20 h-20 object-scale-down mix-blend-multiply py-1 rounded-lg border shadow-md ${minImage === image ? "border-black border-2": null}`} />
                    )
                }
            </div>
            <div>
                <Image
                    src={minImage}
                    alt="image"
                    width={1000}
                    height={1000}
                    className="w-[400px] h-[400px] mix-blend-multiply object-scale-down border rounded-lg shadow-xl" />
            </div>
        </div>
    )
}

export const dynamic = "force-dynamic";
export default Gallery;