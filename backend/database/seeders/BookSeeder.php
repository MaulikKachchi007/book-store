<?php

namespace Database\Seeders;

use App\Models\Book;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;

class BookSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $booksData = file_get_contents(public_path('books.json'));
        $books = json_decode($booksData, true)['data'];

        // Set the batch size to 100
        $batchSize = 100;

        // Use the chunk method to create records in batches
        collect($books)->chunk($batchSize)->each(function ($booksChunk) {
            $books = [];

            foreach ($booksChunk as $book) {
                $contents = file_get_contents($book['image']);
                $file = 'books/' . time().".jpg";
                Storage::disk('public')->put($file, $contents);

                $books[] = [
                    'title'       => $book['title'],
                    'author'      => $book['author'],
                    'genre'       => $book['genre'],
                    'publisher'   => $book['publisher'],
                    'published'   => Carbon::parse($book['published'])->format('Y-m-d'),
                    'isbn'        => $book['isbn'],
                    'image'       => $file,
                    'description' => $book['description'],
                    'created_at'  => now(),
                    'updated_at'  => now(),
                ];
            }

            Book::insert($books);
        });
    }
}
