<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\BranchController;
use Illuminate\Support\Facades\Route;

// Posts
Route::get('/posts', [PostController::class, 'index'])->name('api.posts.index');
Route::get('/posts/{slug}/related', [PostController::class, 'related'])->name('api.posts.related');
Route::get('/posts/{slug}', [PostController::class, 'show'])->name('api.posts.show');

// Categories
Route::get('/categories', [CategoryController::class, 'index'])->name('api.categories.index');
Route::get('/categories/{slug}/posts', [CategoryController::class, 'posts'])->name('api.categories.posts');

// Branches
Route::get('/branches', [BranchController::class, 'index'])->name('api.branches.index');
Route::get('/branches/nearby', [BranchController::class, 'nearby'])->name('api.branches.nearby');
Route::get('/branches/{slug}', [BranchController::class, 'show'])->name('api.branches.show');

?>