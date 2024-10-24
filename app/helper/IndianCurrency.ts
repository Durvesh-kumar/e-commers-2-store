export const IndianCurrency = (price:number)=>{
    const formetCurrency = Intl.NumberFormat("en-IN",{
        style: "currency",
        currency: "INR",
        minimumFractionDigits:2
    }) 
    return formetCurrency.format(price)
}