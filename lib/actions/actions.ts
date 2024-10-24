
export const getProducts = async()=>{
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_DASHBOARD_URL}/api/products`,{
            method: "GET"
        })
        return await res.json()
    } catch (error) {
        console.log("[getProducts_GET]", error);
    }
}

export const getProductDetails = async(id:string)=>{
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_DASHBOARD_URL}/api/products/${id}`,{
            method: "GET"
        })
        return await res.json()
    } catch (error) {
        console.log("[getProductDetails_GET]", error);
    }
}

export const getRelatedProducts = async(id:string)=>{
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_DASHBOARD_URL}/api/products/${id}/related`,{
            method: "GET"
        })
        return await res.json()
    } catch (error) {
        console.log("[getProductDetails_GET]", error);
    }
}

export const getReviews = async(id:string)=>{
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_DASHBOARD_URL}/api/products/${id}/reviews`,{
            method: "GET"
        })
        return await res.json()
    } catch (error) {
        console.log("[getProductDetails_GET]", error);
    }
}

export const getOrders = async(id:string)=>{
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_DASHBOARD_URL}/api/orders/customers/${id}`,{
            method: "GET"
        })
        return await res.json()
    } catch (error) {
        console.log("[getProductDetails_GET]", error);
    }
}
export const dynamic = "force-dynamic";