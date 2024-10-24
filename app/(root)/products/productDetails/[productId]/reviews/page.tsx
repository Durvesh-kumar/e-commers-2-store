"use client"
import { useUser } from '@clerk/nextjs';
import { Star } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const CreateReview = ({ params }: { params: { productId: string } }) => {
    const { user } = useUser();
    const [rating, setRating] = useState<number>(5);
    const [hover, setHover] = useState<number | null>(null);

    const router = useRouter();

    const [message, setmessage] = useState("");

    const handleonSubmit = async () => {

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_DASHBOARD_URL}/api/products/${params.productId}/reviews`, {
                method: "POST",
                body: JSON.stringify({
                    email: user?.emailAddresses[0].emailAddress,
                    name: user?.fullName, image: user?.imageUrl, rating, message
                })
            });

            if (res.ok) {
                router.replace(`/products/productDetails/${params.productId}`);
                toast.success("Review created successfully")
                setmessage("")
            };
        } catch (error) {
            console.log("[reviews_POST]", error);
            toast.error("Somthing went wrong! please try agian")
        }
    };

    return (
        <div className='flex items-center justify-center'>
            <form onSubmit={handleonSubmit} className='flex flex-col gap-6 w-[500px] p-5 border-2 shadow-xl rounded-lg'>
                <div>
                    <h1 className='text-center font-bold text-2xl'>Create Review</h1>
                </div>
                <div>
                    <div className="flex  items-center justify-between">
                        <label htmlFor="rating" className="block text-sm font-bold leading-6 text-gray-900">
                            Message :
                        </label>
                    </div>
                    <div className="mt-2 flex gap-8">
                        {
                            [...Array(5)].map((star, index: number) => {
                                const currentRating = index + 1;
                                return (
                                    <div className='relative' key={index}>
                                        <input
                                            type="radio"
                                            name='rating'
                                            value={currentRating}
                                            onClick={() => setRating(currentRating)}
                                            className='w-6 h-6 opacity-0 cursor-pointer'
                                        />
                                        <Star
                                            fill={currentRating <= (hover || rating) ? "yellow" : "white"}
                                            color={currentRating <= (hover || rating) ? "#5CB002" : "black"}
                                            onMouseEnter={() => setHover(currentRating)}
                                            onMouseLeave={() => setHover(null)}
                                            className=' absolute top-0 left-0  -z-40'
                                        />
                                    </div>
                                )
                            })
                        }

                    </div>
                    {
                        rating == 1 && (
                            <div className='flex gap-3 mt-3 items-center'>
                                <p className='font-medium'>Your rating is {rating}</p>
                                <p className='text-2xl'>&#128557;</p>
                                <p className='text-2xl'>&#128557;</p>
                                <p className='text-2xl'>&#128557;</p>
                            </div>
                        )
                    }
                    {
                        rating == 2 && (
                            <div className='flex gap-3 mt-3 items-center'>
                                <p className='font-medium'>Your rating is {rating}</p>
                                <p className='text-xl'>&#128519;</p>
                                <p className='text-xl'>&#128557;</p>
                            </div>
                        )
                    }
                    {
                        rating == 3 && (
                            <div className='flex gap-3 mt-3 items-center'>
                                <p className='font-medium'>Your rating is {rating}</p>
                                <p className='text-xl'>&#128519;</p>
                            </div>
                        )
                    }

                    {
                        rating == 4 && (
                            <div className='flex gap-3 mt-3 items-center'>
                                <p className='font-medium'>Your rating is {rating}</p>
                                <p className='text-xl'>&#128525;</p>
                                <p className=' text-2xl'>&#128536;</p>
                            </div>
                        )
                    }
                    {
                        rating == 5 && (
                            <div className='flex gap-3 mt-3 items-center'>
                                <p className='font-medium'>Your rating is {rating}</p>
                                <p className='text-xl'>&#128525;</p>
                                <p className=' text-2xl'>&#128536;</p>
                                <p className='text-2xl'>&#129392;</p>
                            </div>
                        )
                    }

                </div>

                <div>
                    <div className="flex  items-center justify-between">
                        <label htmlFor="message" className="block text-sm font-bold leading-6 text-gray-900">
                            Message :
                        </label>
                    </div>
                    <div className="mt-2">
                        <textarea
                            id="message"
                            name="message"
                            value={message}
                            autoComplete="message"
                            minLength={4}
                            onChange={(e) => setmessage(e.target.value)}
                            required
                            className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
                <div className='flex items-center justify-between'>
                    <button
                        type='button'
                        onClick={() => window.location.replace(`/products/productDetails/${params.productId}`)}
                        className='px-4 py-1 border-2 hover:border-black rounded-md font-bold bg-red-400 text-white hover:bg-white hover:text-black shadow-lg'
                    >
                        Back
                    </button>

                    <button
                        type='submit'
                        className='px-4 py-1 border-2 hover:border-black rounded-md font-bold bg-blue-400 text-white hover:bg-white hover:text-black shadow-lg'
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}

export const dynamic = "force-dynamic";
export default CreateReview