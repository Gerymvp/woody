const CART_STORAGE_KEY = 'swoody_cart';
const MAX_QUANTITY = 99;

export const CART_UPDATED_EVENT = 'swoody:cart-updated';

const isBrowser = () => typeof window !== 'undefined' && typeof localStorage !== 'undefined';

function normalizeQuantity(quantity, fallback = 1) {
  const parsedQuantity = Number(quantity);
  if (!Number.isFinite(parsedQuantity)) return fallback;
  return Math.min(MAX_QUANTITY, Math.max(1, Math.trunc(parsedQuantity)));
}

function normalizeProduct(product) {
  if (!product || typeof product !== 'object') return null;

  const id = String(product.id ?? '').trim();
  const name = String(product.name ?? product.nombre ?? product.titulo ?? '').trim();
  const price = Number(product.price ?? product.precio);

  if (!id || !name || !Number.isFinite(price) || price < 0) return null;

  return {
    id,
    name,
    price,
    image: String(product.image ?? product.imagen ?? product.imagen_url ?? ''),
    category: String(product.category ?? product.categoria ?? ''),
    quantity: normalizeQuantity(product.quantity ?? product.cantidad),
  };
}

function saveCart(cart) {
  if (!isBrowser()) return;
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    window.dispatchEvent(new CustomEvent(CART_UPDATED_EVENT, { detail: { cart } }));
  } catch (error) {
    console.error('No se pudo guardar el carrito.', error);
  }
}

export function getCart() {
  if (!isBrowser()) return [];
  try {
    const storedCart = JSON.parse(localStorage.getItem(CART_STORAGE_KEY) ?? '[]');
    if (!Array.isArray(storedCart)) return [];
    return storedCart.map(normalizeProduct).filter(Boolean);
  } catch (error) {
    console.error('No se pudo leer el carrito.', error);
    return [];
  }
}

export function addToCart(product, quantity = 1) {
  const normalizedProduct = normalizeProduct({ ...product, quantity });
  if (!normalizedProduct) {
    throw new TypeError('El producto no contiene datos válidos para el carrito.');
  }

  const cart = getCart();
  const existingProduct = cart.find((item) => item.id === normalizedProduct.id);
  if (existingProduct) {
    existingProduct.quantity = normalizeQuantity(existingProduct.quantity + normalizedProduct.quantity);
  } else {
    cart.push(normalizedProduct);
  }

  saveCart(cart);
  return cart;
}

export function removeFromCart(productId) {
  const cart = getCart().filter((item) => item.id !== String(productId));
  saveCart(cart);
  return cart;
}

export function updateQuantity(productId, quantity) {
  const id = String(productId);
  const parsedQuantity = Number(quantity);
  if (!Number.isFinite(parsedQuantity)) return getCart();
  if (parsedQuantity <= 0) return removeFromCart(id);

  const cart = getCart();
  const product = cart.find((item) => item.id === id);
  if (!product) return cart;

  product.quantity = normalizeQuantity(parsedQuantity);
  saveCart(cart);
  return cart;
}

export function clearCart() {
  if (!isBrowser()) return [];
  try {
    localStorage.removeItem(CART_STORAGE_KEY);
    window.dispatchEvent(new CustomEvent(CART_UPDATED_EVENT, { detail: { cart: [] } }));
  } catch (error) {
    console.error('No se pudo vaciar el carrito.', error);
  }
  return [];
}

export function getCartTotal(cart = getCart()) {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

export function getCartItemCount(cart = getCart()) {
  return cart.reduce((total, item) => total + item.quantity, 0);
}

export function isCartStorageEvent(event) {
  return event.key === CART_STORAGE_KEY;
}

export function getCheckoutData() {
  const cart = getCart();
  const subtotal = getCartTotal(cart);
  const tax = subtotal * 0.07;
  return {
    productos: cart.map((item) => ({
      id: item.id,
      cantidad: item.quantity,
      precio: item.price,
    })),
    subtotal,
    itbms: tax,
    total: subtotal + tax,
  };
}
