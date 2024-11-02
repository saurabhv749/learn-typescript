// https://www.codecademy.com/courses/learn-typescript/projects/restaurant-orders
import { restaurants, Restaurant } from "./data/restaurants";
import { orders, Order, PriceBracket } from "./data/orders";

// Add your getMaxPrice() function below:
function getMaxPrice(priceBracket: PriceBracket) {
    if (priceBracket === PriceBracket.Low)
        return 10.0
    else if (priceBracket === PriceBracket.Medium)
        return 20.0
    else if (priceBracket === PriceBracket.High)
        return 30.0
    return 0.0
}

// Add your getOrders() function below:
function getOrders(price: PriceBracket, orders: Order[][]): Order[][] {
    const filteredOrders: Order[][] = []
    const maxPrice = getMaxPrice(price) 
    orders.forEach(restaurantOrders=>{
        const filteredRestaurantOrders = restaurantOrders.filter(order=>order.price <= maxPrice)
        filteredOrders.push(filteredRestaurantOrders)
    })

    return filteredOrders

}
// Add your printOrders() function below:
function printOrders(restaurants: Restaurant[], filteredOrders: Order[][]):void{
    filteredOrders.forEach((restaurantOrders,index)=>{
        if(restaurantOrders.length){
            console.log(restaurants[index].name)
            restaurantOrders.forEach((order) => {
                console.log(`- ${order.name}: $${order.price}`)
            });
            console.log('\n')
        }
    })
}

// Main
const eligibleOrders = getOrders(PriceBracket.Low, orders);
// console.log(eligibleOrders)
printOrders(restaurants, eligibleOrders);
