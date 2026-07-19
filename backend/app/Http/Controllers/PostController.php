<?php

namespace App\Http\Controllers;

use App\Http\Resources\PostResource;
use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function index(Request $request)
    {
        $posts = Post::published()
            ->with(['category', 'author'])
            ->when($request->search, function ($query, $search) {
                $query->where('title', 'like', "%{$search}%");
            })
            ->when($request->category, function ($query, $categorySlug) {
                $query->whereHas('category', function ($q) use ($categorySlug) {
                    $q->where('slug', $categorySlug);
                });
            })
            ->latest('published_date')
            ->paginate(9);

        return PostResource::collection($posts);
    }

    public function show(string $slug)
    {
        $post = Post::published()
            ->with(['category', 'author'])
            ->where('slug', $slug)
            ->first();

        if (! $post) {
            return response()->json(['message' => 'Post not found.'], 404);
        }

        return PostResource::make($post);
    }

    public function related(string $slug)
    {
        $post = Post::published()->where('slug', $slug)->first();

        if (! $post) {
            return response()->json(['message' => 'Post not found.'], 404);
        }

        $related = Post::published()
            ->with(['category', 'author'])
            ->where('category_id', $post->category_id)
            ->where('id', '!=', $post->id)
            ->latest('published_date')
            ->limit(3)
            ->get();

        return PostResource::collection($related);
    }
}