import { ConnectedToDB } from "@/lib/db/ConnectToBD";
import User from "@/lib/models/StoreUser";
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server";

export const GET = async () => {
    const { userId } = await auth();

    if (!userId) {
        return new NextResponse("Unauthorized", { status: 401 })
    }

    try {

        await ConnectedToDB();
        
        let user = await User.findOne({ clerkId: userId });

        if (!user) {
            user = await User.create({ clerkId: userId });
            await user.save();
        };

        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        console.log("[user_GET]", error);
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}
export const dynamic = "force-dynamic";