<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    // ✅ View all products
    public function index()
    {
        return response()->json(Product::with('category')->get());
    }

    // ✅ Add product (Admin only)
    public function store(Request $request)
    {
        // Ensure only admin can add products
        if ($request->user()->role !== 'admin') {
            return response()->json(['message' => 'Only admins can add products'], 403);
        }

        // Validate the request
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric',
            'quantity' => 'required|integer',
            'category_id' => 'required|exists:categories,id',
            'image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        // Handle image upload if exists
        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('products', 'public');
        }

        // Create product
        $product = Product::create($data);

        return response()->json(['message' => 'Product created successfully', 'product' => $product]);
    }

    // ✅ Update product (Admin only)
    public function update(Request $request, $id)
    {
        // Ensure only admin can update products
        if ($request->user()->role !== 'admin') {
            return response()->json(['message' => 'Only admins can update products'], 403);
        }

        // Find the product or fail
        $product = Product::findOrFail($id);

        // Validate the request
        $data = $request->validate([
            'name' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'price' => 'sometimes|numeric',
            'quantity' => 'sometimes|integer',
            'category_id' => 'sometimes|exists:categories,id',
            'image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        // Handle image upload if exists
        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('products', 'public');
        }

        // Update product
        $product->update($data);

        return response()->json(['message' => 'Product updated successfully', 'product' => $product]);
    }

    // ✅ Delete product (Admin only)
    public function destroy(Request $request, $id)
    {
        // Ensure only admin can delete products
        if ($request->user()->role !== 'admin') {
            return response()->json(['message' => 'Only admins can delete products'], 403);
        }

        // Find and delete the product
        $product = Product::findOrFail($id);
        $product->delete();

        return response()->json(['message' => 'Product deleted successfully']);
    }
}
