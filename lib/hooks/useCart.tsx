import toast from "react-hot-toast";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface CartItem {
    item: ProductType;
    size?: string,
    quantity: number;
    color?: string
}

export interface CartStore {
    cartItems: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (_id: string) => void;
    increaseQuantity: (_id: string) => void;
    decresaeQuantity: (_id: string) => void;
    clearCart: () => void;
}

export const useCart = create(
    persist<CartStore>(
        (set, get) => ({
            cartItems: [],
            addItem: (data: CartItem) => {
                const { item, size, quantity, color } = data;
                const currentItem = get().cartItems;
                const exitItem = currentItem.find(
                    (cartItem) => cartItem.item._id === item._id
                );
                if (exitItem) {
                    return toast("Product already exist in cart")
                }

                set({ cartItems: [...currentItem, { size, color, quantity, item }] });
                toast.success("Product add in cart");
            },
            removeItem: (idToRemove: string) => {
                const newCartItems = get().cartItems.filter(
                    (cartItem) => cartItem.item._id !== idToRemove
                );

                set({ cartItems: newCartItems });
                toast.success("Product remoce in Cart")
            },

            increaseQuantity: (idToIncrese: string) => {
                const newCartItem = get().cartItems.map(
                    (cartItem) => cartItem.item._id === idToIncrese
                        ?
                        { ...cartItem, quantity: cartItem.quantity + 1 }
                        :
                        cartItem
                );
                set({ cartItems: newCartItem })
                toast.success("Product quantity increased")
            },
            decresaeQuantity: (idToIncrese: string) => {
                const newCartItem = get().cartItems.map(
                    (cartItem) => cartItem.item._id === idToIncrese
                        ?
                        { ...cartItem, quantity: cartItem.quantity - 1 }
                        :
                        cartItem
                );
                set({ cartItems: newCartItem })
                toast.success("Product quantity decreased")
            },

            clearCart: () => set({ cartItems: [] })
        }),
        {
            name: "cart-storage",
            storage: createJSONStorage(() => localStorage),
        }

    )
)