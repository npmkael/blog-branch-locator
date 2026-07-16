<?php

namespace App\Http\Controllers;

use App\Http\Resources\CategoryResource;
use App\Http\Resources\PostResource;
use App\Models\Category;
use App\Models\Post;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::withCount(['posts' => function ($query) {
            $query->published();
        }])->get();

        return CategoryResource::collection($categories);
    }

    public function posts(string $slug)
    {
        $category = Category::where('slug', $slug)->first();

        if (! $category) {
            return response()->json(['message' => 'Category not found.'], 404);
        }

        $posts = Post::published()
            ->with(['category', 'author'])
            ->where('category_id', $category->id)
            ->latest('published_date')
            ->paginate(9);

        return PostResource::collection($posts);
    }
}