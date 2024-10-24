type ProductType = {
    _id: string;
    title: string;
    discription: string;
    media: [string];
    brand: string;
    collections: string;
    tags: [string];
    price: number;
    pay: number;
    sizes: [string];
    colors: [string];
    category: string;
};

type UserType = {
    _id: string;
    clerkId: string;
    wishlist: string[];
    orders: string[]
};

type OrderType = {
    _id: string;
    customerClerkId: string;
    products: [OrderItemType];
    totalAmount: number;
    shippingRate:string;
    shippingAddress: object;
    createdAt: string
}

type OrderItemType ={
    _id: string;
    product: ProductType;
    color: string;
    size: string;
    quantity: number;
}

type ReviewsType = {
    _id: string;
    image: string;
    email: string;
    name: string;
    message: string;
    clerkId: string;
    productId:string;
    rating: string;
}