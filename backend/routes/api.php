<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\PostController;
use Illuminate\Support\Facades\Route;

// Posts
Route::get('/posts', [PostController::class, 'index'])->name('api.posts.index');
Route::get('/posts/{slug}', [PostController::class, 'show'])->name('api.posts.show');

// Categories
Route::get('/categories', [CategoryController::class, 'index'])->name('api.categories.index');
Route::get('/categories/{slug}/posts', [CategoryController::class, 'posts'])->name('api.categories.posts');
?>