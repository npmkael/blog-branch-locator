<?php

namespace App\Filament\Resources\Posts\Schemas;

use App\Models\Post;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class PostForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('title')
                    ->required()
                    ->live()
                    ->afterStateUpdated(function ($state, callable $set) {
                        $set('slug', Str::slug($state));
                    }),

                TextInput::make('slug')
                    ->required()
                    ->unique(Post::class, 'slug', ignoreRecord: true),

                Textarea::make('excerpt')
                    ->required(),

                RichEditor::make('content')
                    ->required(),

                FileUpload::make('featured_image')
                    ->image()
                    ->directory('posts')
                    ->nullable(),

                Select::make('category_id')
                    ->relationship('category', 'name')
                    ->required(),

                Select::make('author_id')
                    ->relationship('author', 'name')
                    ->required(),

                Select::make('status')
                    ->options([
                        'draft' => 'Draft',
                        'published' => 'Published',
                    ])
                    ->required(),

                DatePicker::make('published_date')
                    ->nullable(),
            ]);
    }
}