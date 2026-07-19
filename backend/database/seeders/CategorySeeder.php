<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Tech',
                'slug' => 'tech',
                'description' => 'Tutorials, programming guides, software development, web technologies, and developer tools.',
            ],
            [
                'name' => 'AI',
                'slug' => 'ai',
                'description' => 'Articles about artificial intelligence, machine learning, automation, and the latest AI trends.',
            ],
            [
                'name' => 'Business',
                'slug' => 'business',
                'description' => 'Content covering entrepreneurship, startups, marketing, finance, and business growth.',
            ],
        ];

        foreach ($categories as $category) {
            Category::updateOrCreate(
                ['slug' => $category['slug']],
                $category
            );
        }
    }
}
