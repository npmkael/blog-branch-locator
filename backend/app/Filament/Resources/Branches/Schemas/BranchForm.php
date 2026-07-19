<?php

namespace App\Filament\Resources\Branches\Schemas;

use App\Models\Branch;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Placeholder;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Utilities\Get;
use Filament\Schemas\Schema;
use Illuminate\Support\HtmlString;
use Illuminate\Support\Str;

class BranchForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('branch_name')
                    ->required()
                    ->live()
                    ->afterStateUpdated(function ($state, callable $set) {
                        $set('slug', Str::slug($state));
                    }),

                TextInput::make('slug')
                    ->required()
                    ->unique(Branch::class, 'slug', ignoreRecord: true),

                TextInput::make('branch_code')
                    ->nullable()
                    ->unique(Branch::class, 'branch_code', ignoreRecord: true),

                TextInput::make('address')
                    ->required(),

                TextInput::make('city')
                    ->required(),

                TextInput::make('province')
                    ->required(),

                TextInput::make('postal_code'),

                TextInput::make('contact_number'),

                TextInput::make('email_address')
                    ->email()
                    ->nullable(),

                TextInput::make('latitude')
                    ->required()
                    ->numeric()
                    ->minValue(-90)
                    ->maxValue(90)
                    ->live(),

                TextInput::make('longitude')
                    ->required()
                    ->numeric()
                    ->minValue(-180)
                    ->maxValue(180)
                    ->live(),

                Placeholder::make('map_preview')
                    ->label('Location preview')
                    ->content(function (Get $get): HtmlString {
                        $lat = $get('latitude');
                        $lng = $get('longitude');

                        if (!is_numeric($lat) || !is_numeric($lng)) {
                            return new HtmlString(
                                '<p style="color:#6b7280;font-size:13px;">Enter latitude and longitude to see a map preview.</p>'
                            );
                        }

                        $delta = 0.01;
                        $bbox = ($lng - $delta) . ',' . ($lat - $delta) . ',' . ($lng + $delta) . ',' . ($lat + $delta);
                        $url = 'https://www.openstreetmap.org/export/embed.html?bbox=' . $bbox . '&layer=mapnik&marker=' . $lat . ',' . $lng;

                        return new HtmlString(
                            '<iframe src="' . $url . '" style="width:100%;height:300px;border:1px solid #e5e7eb;border-radius:8px;" loading="lazy"></iframe>'
                        );
                    }),

                Textarea::make('business_hours')
                    ->nullable(),

                Textarea::make('description')
                    ->nullable(),

                FileUpload::make('featured_image')
                    ->image()
                    ->directory('branches')
                    ->nullable(),

                Select::make('status')
                    ->options([
                        'active' => 'Active',
                        'inactive' => 'Inactive',
                    ])
                    ->required(),
            ]);
    }
}