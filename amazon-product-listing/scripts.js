// Constants (does not change)
const maxCartTotal = 3
const totalProducts = 3

// $ naming pattern jQuery uses that tells you a var is HTML elements.
// You could also prefix (el) or suffix (El) similarly.
const $addToCartBtns = document.querySelectorAll('.add-to-cart')
const $removeCartBtns = document.querySelectorAll('.remove-from-cart')
const $cartTotal = document.querySelector('.cart-total')
const $notificationBar = document.querySelector('.notification-bar')
const $notificationMessage = document.querySelector(
  '.notification-bar .message',
)

// State management (will change)
const cartState = {
  total: 0,

  // The backend would be able to identify the items via IDs we can store here vs adding all the product's info.
  products: [],
}

// Set total products but didn't declare as var since it runs once
document.querySelector('.total-products-count').textContent = totalProducts

// Set footer to current year
document.querySelector('.current-year').textContent = new Date().getFullYear()

// Functionality
// Add IDs to cart products state
function addCartProduct(id) {
  if (!cartState.products.includes(id)) {
    console.log(`product ${id} added to cart`)
    cartState.products.push(id)

    // Moved from the click event handler allowing a singular function to manage all the needed changes.
    updateCartTotal()
    handleBtnState('add-to-cart', id, true)
    handleBtnState('remove-from-cart', id, false)
    handleNotificationDisplay('success', 'Item added to cart')
  } else {
    console.log('product already added to cart')
  }
}

function removeCartProduct(id) {
  if (cartState.products.includes(id)) {
    const position = cartState.products.indexOf(id)
    cartState.products.splice(0, 1)
    console.log('removing product from cart')

    updateCartTotal(true)
    handleBtnState('add-to-cart', id, false)
    handleBtnState('remove-from-cart', id, true)
    handleNotificationDisplay('error', 'Item removed from cart')
  } else {
    console.log("this product isn't in your cart")
  }
}

// This passed argument uses a default value of false.
// Ensures even if you don't pass anything it doesn't try and change things we don't want it to.
// The "remove" argument could be named better.
function updateCartTotal(remove = false) {
  if (!remove) {
    cartState.total++

    // Ensure max constant is enforced preventing additional adds.
    if (cartState.total <= maxCartTotal) {
      $cartTotal.textContent = cartState.total
      console.log('adding to cart total')
    } else {
      console.log('max cart total reached')
    }
  } else {
    cartState.total--
    $cartTotal.textContent = cartState.total
    console.log('removing from cart total')
  }
}

function handleBtnState(btnType, id, disableState) {
  document.querySelector(`.${btnType}[data-product-id="${id}"]`).disabled =
    disableState
}

function handleNotificationDisplay(type, message, close = false) {
  if (close) {
    $notificationBar.style.display = 'none'
    return
  }

  $notificationMessage.textContent = message
  $notificationBar.className = `notification-bar ${type}`
  $notificationBar.style.display = 'block'
}

// Events
// Apply click event across all buttons vs one at a time.
$addToCartBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    console.log('event - add to cart')
    addCartProduct(btn.dataset.productId)
  })
})

$removeCartBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    console.log('event - remove from cart')
    removeCartProduct(btn.dataset.productId)
  })
})

$notificationBar.children[1].addEventListener('click', () => {
  handleNotificationDisplay(null, null, close)
})
