<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cart;
use App\Models\Product;

class CartController extends Controller
{
    // Add to cart
    public function addToCart(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1'
        ]);

        $user = $request->user();

        // Check if product already exists in cart
        $cartItem = Cart::where('user_id', $user->id)
                        ->where('product_id', $request->product_id)
                        ->first();

        if ($cartItem) {
            // Update quantity
            $cartItem->quantity += $request->quantity;
            $cartItem->save();
        } else {
            // Add new item
            $cartItem = Cart::create([
                'user_id' => $user->id,
                'product_id' => $request->product_id,
                'quantity' => $request->quantity,
            ]);
        }

        return response()->json(['message' => 'Product added to cart', 'cart' => $cartItem]);
    }

    // Get user's cart items
    public function getCartItems(Request $request)
    {
        $user = $request->user();

        $cartItems = Cart::with('product')->where('user_id', $user->id)->get();

        return response()->json($cartItems);
    }

    // Update cart item quantity
    public function updateCartItem(Request $request, $id)
    {
        $request->validate([
            'quantity' => 'required|integer|min:1'
        ]);

        $user = $request->user();
        $cartItem = Cart::where('id', $id)->where('user_id', $user->id)->firstOrFail();

        $cartItem->quantity = $request->quantity;
        $cartItem->save();

        return response()->json(['message' => 'Cart item updated', 'cart' => $cartItem]);
    }

    // Remove item from cart
    public function removeCartItem(Request $request, $id)
    {
        $user = $request->user();
        $cartItem = Cart::where('id', $id)->where('user_id', $user->id)->firstOrFail();

        $cartItem->delete();

        return response()->json(['message' => 'Cart item removed']);
    }
}
