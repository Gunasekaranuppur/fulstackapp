<?php

namespace App\Http\Controllers;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    //
    // Store category (for admin)
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $category = new Category();
        $category->name = $request->name;

        if ($request->hasFile('image')) {
            $category->image = $request->file('image')->store('categories', 'public');
        }

        $category->save();

        return response()->json(['message' => 'Category created successfully!', 'category' => $category], 201);
    }

    // Get all categories
    public function index()
    {
        $categories = Category::all();
        return response()->json($categories);
    }
}
