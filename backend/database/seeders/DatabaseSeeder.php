<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Author;
use App\Models\Post;
use App\Models\Branch;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Category::factory()->count(3)->create();
        Author::factory()->count(3)->create();
        Post::factory()->count(10)->create();
        Branch::factory()->count(5)->create();
    }
}
