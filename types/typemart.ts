// https://www.codecademy.com/courses/learn-typescript/projects/typemart

import products from "./data/products"

const productName: string = 'tote bag'

const product = products.find(product => product.name === productName)
if (product) {
    if (product.preOrder === 'true') {
        console.log('We will send you a message when your product is on its way.')
    }
    let shipping: number
    let taxPercent: number
    let taxTotal: number
    let total: number

    const shippingAddress: string = '575 Broadway, California'
    if (Number(product.price) >= 25) {
        shipping = 0
        console.log('we provide free shipping for this product.')
    } else {
        shipping = 5
    }

    taxPercent = shippingAddress.match('New York') ? 0.1 : 0.05
    taxTotal = Number(product.price) * taxPercent
    total = Number(product.price) + taxTotal + shipping

    console.log(`
        Product:  ${product.name}
        Address:  ${shippingAddress}
        Price:    $${product.price}
        Tax:      $${taxTotal.toFixed(2)}
        Shipping: $${shipping.toFixed(2)}
        Total:    $${total.toFixed(2)}
        `);

}

