<?php

namespace App\Filament\Resources\Authors\Schemas;

use App\Models\Author;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class AuthorsForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->required(),

                TextInput::make('email')
                    ->required()
                    ->email()
                    ->unique(Author::class, 'email', ignoreRecord: true),

                Textarea::make('biography')
                    ->nullable(),

                FileUpload::make('profile_image')
                    ->image()
                    ->directory('authors')
                    ->nullable(),
            ]);
    }
}
