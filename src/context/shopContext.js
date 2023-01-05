import React, { Component } from 'react'
import Client from 'shopify-buy'

const ShopContext = React.createContext()

const client = Client.buildClient({
  domain: process.env.REACT_APP_SHOPIFY_DOMAIN,
  storefrontAccessToken: process.env.REACT_APP_SHOPIFY_API,
})

class ShopProvider extends Component {
  state = {
    product: {},
    products: [],
    checkout: {},
    isCartOpen: false,
    isMenuOpen: false,
  }

  componentDidMount() {
    if (localStorage.checkout_id) {
      this.fetchCheckout(localStorage.checkout_id)
    } else {
      this.createCheckout()
    }
  }

  createCheckout = async () => {
    const checkout = await client.checkout.create()
    localStorage.setItem('checkout-id', checkout.id)
    this.setState({ checkout: checkout })
  }
  fetchCheckout = async (checkoutId) => {
    const checkout = await client.checkout.fetch(checkoutId)
    this.setState({ checkout: checkout })
  }
  addItemToCheckout = async (variantId, quantity) => {
    const lineItemsToAdd = [
      {
        variantId,
        quantity: parseInt(quantity, 10),
      },
    ];
    const checkout = await client.checkout.addLineItems(
      this.state.checkout.id,
      lineItemsToAdd
    );
    this.setState({ checkout: checkout });

    this.openCart();
  }
  removeLineItem = async (lineItemIdsRemove) => {
    const checkout = await client.checkout.removeLineItems(this.state.checkout.id, lineItemIdsRemove)
    this.setState({checkout:checkout})
  }

  fetchAllProducts = async () => {
    const products = await client.product.fetchAll()
    // Do something with the products
    this.setState({ products: products })
  }

  fetchProductWithHandle = async (handle) => {
    const product = await client.product.fetchByHandle(handle)
    this.setState({ product: product })
  }

  openCart = () => {this.setState({isCartOpen:true})}
  closeCart = () => {this.setState({isCartOpen:false})}
  closeMenu = () => {this.setState({ isMenuOpen: false })}
  openMenu = () => {this.setState({ isMenuOpen: true })}

  render() {
    return (
     
      <ShopContext.Provider
        value={{
          ...this.state,
          fetchAllProducts: this.fetchAllProducts,
          fetchProductWithHandle: this.fetchProductWithHandle,
          addItemToCheckout: this.addItemToCheckout,
          removeLineItem: this.removeLineItem,
          closeCart: this.closeCart,
          openCart: this.openCart,
          closeMenu: this.closeMenu,
          openMenu: this.openMenu,
        }}
      >
        {this.props.children}
      </ShopContext.Provider>
    )
  }
}
const ShopConsumer = ShopContext.Consumer
export { ShopConsumer, ShopContext }
export default ShopProvider
