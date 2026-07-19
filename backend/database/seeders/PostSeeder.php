<?php

namespace Database\Seeders;

use App\Models\Author;
use App\Models\Category;
use App\Models\Post;
use Illuminate\Database\Seeder;

class PostSeeder extends Seeder
{
    public function run(): void
    {
        $posts = [
            [
                'title' => 'Getting Started with Next.js 15',
                'slug' => 'getting-started-with-nextjs-15',
                'excerpt' => 'Learn the fundamentals of Next.js 15 and build faster web applications.',
                'content' => '<p>Next.js 15 introduces improved routing, server components, and better performance. In this guide, we walk through creating your first project and deploying it successfully.</p>
<h2>Why Next.js 15?</h2>
<p>The new release ships improved caching defaults, faster streaming with the App Router, and a more flexible server component model that makes data fetching predictable.</p>
<h2>Creating Your First Project</h2>
<p>Run the create-next-app command, pick TypeScript and the App Router, and you are ready to scaffold your first route within minutes.</p>
<h2>Deploying</h2>
<p>Connect your repository to Vercel, set your environment variables, and deploy. Next.js 15 handles the build output for you with zero configuration.</p>
<p>Once deployed, take advantage of incremental static regeneration and edge rendering to keep your pages fast worldwide.</p>',
                'category_slug' => 'tech',
                'author' => 'John Carter',
                'status' => 'published',
                'published_date' => '2026-01-05',
            ],
            [
                'title' => '7 AI Tools Every Student Should Know',
                'slug' => 'ai-tools-for-students',
                'excerpt' => 'Discover AI tools that improve productivity and learning.',
                'content' => '<p>AI helps students summarize notes, generate ideas, debug code, and manage research. Learn which tools fit different study habits and how to use them responsibly.</p>
<h2>Note-Taking and Summaries</h2>
<p>Tools that condense long lectures into structured notes can save hours of review time. Pair them with your own annotations so the material actually sticks.</p>
<h2>Research Assistants</h2>
<p>AI research companions help you find sources, draft outlines, and surface opposing viewpoints. Always verify citations before submitting.</p>
<h2>Coding Helpers</h2>
<p>For programming courses, AI assistants explain error messages, suggest fixes, and generate practice problems tailored to your skill level.</p>
<p>Use these tools as a supplement, not a replacement, for active learning.</p>',
                'category_slug' => 'ai',
                'author' => 'Sophia Martinez',
                'status' => 'published',
                'published_date' => '2026-01-09',
            ],
            [
                'title' => 'Why I Started Waking Up at 6 AM',
                'slug' => 'why-i-started-waking-up-at-6am',
                'excerpt' => 'A small habit that changed my daily routine.',
                'content' => '<p>Waking up earlier gave me uninterrupted time to read, exercise, and plan the day. The transition was difficult, but consistency made the difference.</p>
<h2>The First Week</h2>
<p>My body resisted. I hit snooze more than once and questioned why I started. By the fourth day, I began winding down earlier at night.</p>
<h2>What I Gained</h2>
<p>Mornings became my only quiet, phone-free window. I read more, journaled briefly, and felt ahead of the day instead of chasing it.</p>
<p>The habit itself mattered less than the proof that I could change one.</p>',
                'category_slug' => 'business',
                'author' => 'Daniel Cruz',
                'status' => 'published',
                'published_date' => '2026-01-15',
            ],
            [
                'title' => 'How Small Businesses Win with Social Media',
                'slug' => 'small-business-social-media',
                'excerpt' => 'Practical social media strategies for growing businesses.',
                'content' => '<p>You do not need a large budget to attract customers. Consistent posting, authentic content, and customer engagement drive long-term growth.</p>
<h2>Pick One Platform First</h2>
<p>Spreading yourself across five channels dilutes every post. Choose the one where your customers already spend time and commit to it.</p>
<h2>Show the Behind-the-Scenes</h2>
<p>People buy from people. Short clips of your process, your team, and your mistakes build more trust than polished ads.</p>
<h2>Engage, Do Not Broadcast</h2>
<p>Reply to comments, ask questions, and reshare customer stories. Engagement signals the algorithm and reinforces community.</p>
<p>Growth compounds when you treat social media as a conversation rather than a billboard.</p>',
                'category_slug' => 'business',
                'author' => 'Daniel Cruz',
                'status' => 'published',
                'published_date' => '2026-01-21',
            ],
            [
                'title' => 'Mastering Tailwind CSS Utilities',
                'slug' => 'mastering-tailwind-css-utilities',
                'excerpt' => 'Build responsive interfaces faster with Tailwind CSS.',
                'content' => '<p>Learn utility classes, responsive layouts, reusable components, and techniques for maintaining clean frontend code.</p>
<h2>Think in Utilities</h2>
<p>Instead of naming components and switching context to CSS, style elements inline with utilities. The feedback loop is immediate.</p>
<h2>Responsive Prefixes</h2>
<p>Use <code>sm:</code>, <code>md:</code>, and <code>lg:</code> prefixes to adapt layouts without media queries. Mobile-first becomes the default.</p>
<h2>Component Patterns</h2>
<p>Extract repeated utility combinations into small components or use <code>@apply</code> sparingly for elements that truly repeat.</p>
<p>Master the utilities and you spend less time naming things and more time shipping.</p>',
                'category_slug' => 'tech',
                'author' => 'John Carter',
                'status' => 'published',
                'published_date' => '2026-01-29',
            ],
            [
                'title' => 'AI vs Human Creativity',
                'slug' => 'ai-vs-human-creativity',
                'excerpt' => 'Does artificial intelligence replace creativity?',
                'content' => '<p>AI speeds up brainstorming and content generation, while human creativity adds emotion, experience, and originality. Both work best together.</p>
<h2>What AI Does Well</h2>
<p>It produces variations fast, breaks creative blocks, and surfaces combinations a single mind might miss. Useful for first drafts and exploration.</p>
<h2>What Humans Still Own</h2>
<p>Taste, lived experience, and emotional resonance. The decision of which idea is worth pursuing remains a human one.</p>
<h2>The Collaborative Middle</h2>
<p>The strongest workflows use AI for volume and humans for judgment. Treat output as raw material, not finished work.</p>
<p>Replace the either-or framing with a loop: generate, critique, refine, repeat.</p>',
                'category_slug' => 'ai',
                'author' => 'Sophia Martinez',
                'status' => 'published',
                'published_date' => '2026-02-05',
            ],
            [
                'title' => 'My First Solo Coffee Shop Visit',
                'slug' => 'first-solo-coffee-shop',
                'excerpt' => 'Spending time alone taught me something unexpected.',
                'content' => '<p>I visited a local café with nothing except a notebook. The quiet atmosphere helped me reflect, organize ideas, and appreciate slow moments.</p>
<h2>Settling In</h2>
<p>Without company to fill the silence, I noticed everything: the hiss of the steam wand, the scratch of pens at the next table, the smell of fresh pastries.</p>
<h2>What I Wrote</h2>
<p>Three pages of half-thoughts. None of it was profound, but the act of writing without interruption felt rare.</p>
<p>By the time I left, the day felt less rushed. Slowness, it turns out, is a practice.</p>',
                'category_slug' => 'business',
                'author' => 'Daniel Cruz',
                'status' => 'draft',
                'published_date' => null,
            ],
            [
                'title' => 'Starting an Online Business While in College',
                'slug' => 'online-business-college',
                'excerpt' => 'Lessons learned from running a side business as a student.',
                'content' => '<p>Balancing classes and customers was challenging, but good time management and realistic goals made everything manageable.</p>
<h2>Start Small</h2>
<p>Your first offering should be something you can deliver in a weekend. Validate demand before investing in branding or inventory.</p>
<h2>Protect Your Schedule</h2>
<p>Block dedicated business hours and treat class time as non-negotiable. Without boundaries, both suffer.</p>
<h2>Use What You Learn</h2>
<p>Every course becomes a potential tool: accounting, marketing, even the discipline of deadlines. Apply coursework to your business in real time.</p>
<p>Graduation is easier when you already have customers.</p>',
                'category_slug' => 'business',
                'author' => 'Daniel Cruz',
                'status' => 'published',
                'published_date' => '2026-02-13',
            ],
            [
                'title' => 'Building REST APIs with Laravel',
                'slug' => 'building-rest-apis-with-laravel',
                'excerpt' => 'Learn how to build secure REST APIs with Laravel.',
                'content' => '<p>This guide covers routing, controllers, validation, authentication, and best practices for scalable backend applications.</p>
<h2>Routing and Controllers</h2>
<p>Define resource routes with <code>Route::apiResource</code> and keep controllers thin. Move business logic into service classes or actions.</p>
<h2>Validation</h2>
<p>Use form requests to validate input and authorize access. Centralized rules keep controllers clean and errors consistent.</p>
<h2>Authentication</h2>
<p>Sanctum is the simplest entry point for token-based APIs. Issue tokens per client and scope them when needed.</p>
<h2>Versioning and Scaling</h2>
<p>Prefix routes with <code>/api/v1</code> from day one and cache expensive reads. Structure now saves refactors later.</p>',
                'category_slug' => 'tech',
                'author' => 'John Carter',
                'status' => 'published',
                'published_date' => '2026-02-20',
            ],
            [
                'title' => 'Will AI Change Software Development?',
                'slug' => 'will-ai-change-software-development',
                'excerpt' => 'Exploring the future of AI-assisted programming.',
                'content' => '<p>This draft discusses AI coding assistants, automation, developer productivity, and the skills software engineers will continue to need.</p>
<h2>What AI Handles Today</h2>
<p>Boilerplate, tests, refactors, and straightforward bug fixes are increasingly generated. The productivity gains are real for routine work.</p>
<h2>What Still Requires Humans</h2>
<p>System design, ambiguous requirements, and trade-off decisions remain difficult to delegate. Context is the bottleneck.</p>
<h2>Skills Worth Investing In</h2>
<p>Reading code, communicating trade-offs, and understanding failure modes become more valuable as generation becomes commoditized.</p>
<p>The job shifts from writing every line to directing and verifying the work.</p>',
                'category_slug' => 'ai',
                'author' => 'Sophia Martinez',
                'status' => 'draft',
                'published_date' => null,
            ],
        ];

        foreach ($posts as $post) {
            $category = Category::where('slug', $post['category_slug'])->firstOrFail();
            $author = Author::where('name', $post['author'])->firstOrFail();

            Post::updateOrCreate(
                ['slug' => $post['slug']],
                [
                    'title' => $post['title'],
                    'excerpt' => $post['excerpt'],
                    'content' => $post['content'],
                    'category_id' => $category->id,
                    'author_id' => $author->id,
                    'status' => $post['status'],
                    'published_date' => $post['published_date'],
                ]
            );
        }
    }
}
