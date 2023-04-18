<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Laravel\Scout\Searchable;

class Book extends BaseModel
{
    use HasFactory;
    use Searchable;

    protected $table = 'books';

    protected $appends = ['image_url'];

    protected $fillable = [
        'title',
        'author',
        'genre',
        'publisher',
        'published',
        'isbn',
        'image',
        'description',
        'status',
    ];

    public function searchableAs()
    {
        return 'books_index';
    }

    /**
     * Get the indexable data array for the model.
     *
     * @return array<string, mixed>
     */
    public function toSearchableArray(): array
    {
        // Customize the data array...

        return [
            'title'       => $this->title,
            'author'      => $this->author,
            'genre'       => $this->genre,
            'published'   => $this->published,
            'publisher'   => $this->publisher,
            'isbn'        => $this->isbn,
            'description' => $this->description,
        ];
    }

    public function getImageUrlAttribute(): ?string
    {
        if (! empty($this->image)) {
            return url('storage/'.$this->image);
        }

        return null;
    }

   
//
//    /**
//     * Get the indexable data array for the model.
//     *
//     * @return array
//     */
//    public function toSearchableArray()
//    {
//
//        return [
//            'title'       => $this->title,
//            'author'      => $this->author,
//            'genre'       => $this->genre,
//            'published'   => $this->published,
//            'publisher'   => $this->publisher,
//            'isbn'        => $this->isbn,
//            'description' => $this->description,
//        ];
//    }
}
