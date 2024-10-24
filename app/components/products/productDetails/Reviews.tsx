import { auth } from "@clerk/nextjs/server";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";


interface ReviewsPropes {
    reviews: ReviewsType[]
}

const Reviews: React.FC<ReviewsPropes> = async ({ reviews }) => {
    const { userId } = auth()
    return (
        <div className="px-4">
            {
                reviews?.length > 0 && (
                    <div>
                        <hr className="py-[1px] bg-gray-900 shadow-md my-6" />
                        <div className="flex gap-8 justify-center flex-wrap mx-auto">
                            {
                                reviews.map((review: ReviewsType) => (
                                    <div key={review._id} className="bg-white p-2 shadow-lg  rounded-xl w-96 max-lg:w-full">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <Image
                                                    src={review.image}
                                                    alt="image"
                                                    height={1000}
                                                    width={1000}
                                                    className="h-12 w-12 object-scale-down mix-blend-multiply rounded-full border-2 border-black"
                                                />
                                                <div>
                                                    <div>
                                                        <h3 className="font-medium text-sm">{review.email}</h3>
                                                        <h4 className="font-medium text-slate-600 text-sm">@{review.name}</h4>
                                                    </div>

                                                    <div className=" flex gap-1 mt-1">
                                                        {
                                                            [...Array(Number(review.rating))].map((star, index: number) =>
                                                                <Star
                                                                    key={index}
                                                                    fill="yellow"
                                                                    color="#5CB002"
                                                                    className="w-4 h-4"
                                                                />
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                            {
                                                review.clerkId === userId && (
                                                    <Link
                                                        href={{ pathname: `/products/productDetails/${review.productId}/reviews/update`, query: { reviewId: review._id, productId: review.productId } }}
                                                        className="px-3 py-1 bg-red-400 text-white font-bold rounded-lg border-2 hover:border-black hover:bg-white hover:text-black shadow-md"
                                                    >Update</Link>
                                                )
                                            }
                                        </div>
                                        <p className="mt-2">{review.message}</p>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                )
            }


        </div>
    )
}

export default Reviews