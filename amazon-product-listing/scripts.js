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

// One time setup for setting product count and the current year in footer.
document.querySelector('.total-products-count').textContent = totalProducts
document.querySelector('.current-year').textContent = new Date().getFullYear()

// Functionality
// Add IDs to cart products state
function addCartProduct(id) {
  if (!cartState.products.includes(id)) {
    cartState.products.push(id)

    // Moved from the click event handler allowing a singular function to manage all the needed changes.
    updateCartTotal()

    // Contrary to the above comment we could do this more effectively as singular function handling each need.
    handleBtnState('add-to-cart', id, true)
    handleBtnState('remove-from-cart', id, false)
    handleNotificationDisplay('success', 'Item added to cart')
  } else {
    console.log('product already added to cart')
  }
}

// Remove product by ID from cart state
function removeCartProduct(id) {
  if (cartState.products.includes(id)) {
    // Find the position of the product ID so we can cut it out of state
    const position = cartState.products.indexOf(id)

    // Note when designing state that it is typically immutable. Splice mutates the original array.
    // Array.slice() would be better here producing a new array and replacing state with it.
    cartState.products.splice(0, 1)

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
function updateCartTotal(removeProduct = false) {
  if (!removeProduct) {
    // Increment the total
    cartState.total++

    // Ensure max constant is enforced preventing additional adds.
    if (cartState.total <= maxCartTotal) {
      $cartTotal.textContent = cartState.total
    } else {
      console.log('max cart total reached')
    }
  } else {
    // Decrement the total
    cartState.total--
    $cartTotal.textContent = cartState.total
  }
}

// handle{FunctionName} is a common naming pattern
function handleBtnState(btnType, id, disableState) {
  // Dynamic query using template literals so we can find the specific button.
  // Doc: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
  document.querySelector(`.${btnType}[data-product-id="${id}"]`).disabled =
    disableState
}

// Show/hide notifications including the close button
function handleNotificationDisplay(type, message, hideNotification = false) {
  if (hideNotification) {
    $notificationBar.style.display = 'none'

    // If statements are useful but there are times when you want to break the control flow from executing additional code.
    // We aren't actually returning anything here but it won't execute any more code if the condition is met.
    return
  }

  // Various things you can do to an element (change text, update classes, inline CSS styles, etc.)
  $notificationMessage.textContent = message
  $notificationBar.className = `notification-bar ${type}`
  $notificationBar.style.display = 'block'
}

// Events
// Apply click event across all buttons vs one at a time.
$addToCartBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    // Pass the product ID data attribute through as argument.
    addCartProduct(btn.dataset.productId)
  })
})

$removeCartBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    removeCartProduct(btn.dataset.productId)
  })
})

// Another way to access elements within another vs an additional declaration at the top of file.
$notificationBar.children[1].addEventListener('click', () => {
  handleNotificationDisplay(null, null, true)
})
