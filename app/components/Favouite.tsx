"use client"

import { useUser } from "@clerk/nextjs";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface FavouitePropes {
    productId: string;
    updateSingedInUser?: (userUpdate: UserType) => void;
}

const Favouite: React.FC<FavouitePropes> = ({ productId, updateSingedInUser }) => {
    const { user } = useUser();
    const router = useRouter()

    const [loading, setLoading] = useState(false);
    const [isLiked, setIsLiked] = useState(false);

    const getUser = async () => {
        setLoading(true)
        const res = await fetch("/api/users", {
            method: "GET"
        });

        if (res.ok) {
            const data = await res.json();
            setLoading(false)
            setIsLiked(data.wishlist.includes(productId))
        };
    };

    useEffect(() => {
        if (user) {
            getUser()
        }
    }, [user]);

    const handleLike = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()

        if (!user) {
            router.replace("/sign-in");
            return;
        };

        try {
            setLoading(true);

            const res = await fetch("/api/users/wishlist", {
                method: "POST",
                body: JSON.stringify({ productId })
            })

            if (res.ok) {
                const data = await res.json();
                setLoading(false);
                setIsLiked(data.wishlist.includes(productId));
                updateSingedInUser && updateSingedInUser(data)
            }
        } catch (error) {
            console.log("[handleLike_GET]", error);
        }
    }

    return loading ? <Heart className="w-5 h-5" /> : (
        <button
            onClick={handleLike}
            type="button"
            className="hover:bg-slate-300 w-7 h-7 flex items-center justify-center rounded-md cursor-pointer"
        >
            <Heart fill={`${isLiked ? "red" : "white"}`} className="w-5 h-5" />
        </button>
    )
}

export default Favouite;