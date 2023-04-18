<?php

namespace App\Repositories;

use App\Models\Book;
use Carbon\Carbon;
use Illuminate\Support\Arr;

/**
 * Class BookRepository
 */
class BookRepository extends AppBaseRepository
{
    protected $book;

    /**
     * BookRepository constructor.
     * @param  Book  $book
     */
    public function __construct(Book $book)
    {
        $this->book = $book;
    }

    /**
     * @param $input
     * @return mixed
     */
    public function allBooks($input): mixed
    {
        $books = $this->book::query();
        if ($input) {
            if (@$input['search']) {
                $books = $books->where(function ($q) use ($input) {
                    $q->orWhere('title', 'LIKE', '%'.$input['search'].'%');
                    $q->orWhere('author', 'LIKE', '%'.$input['search'].'%');
                    $q->orWhere('genre', 'LIKE', '%'.$input['search'].'%');
                    $q->orWhere('publisher', 'LIKE', '%'.$input['search'].'%');
                    $q->orWhere('isbn', 'LIKE', '%'.$input['search'].'%');
                });
            }
            if (@$input['page'] || @$input['limit']) {
                $perPage = $input['limit'] ?? 15;
                $page = $input['page'] ?? 1;

                return $books->orderBy('created_at', 'desc')->paginate($perPage, ['*'], 'page', $page);
            }
        }
        $perPage = $input['limit'] ?? 15;
        $page = $input['page'] ?? 1;


        return $books->orderBy('created_at', 'desc')->paginate($perPage, ['*'], 'page', $page);
    }

    /**
     * @param $input
     * @return mixed
     */
    public function createBook($input)
    {
        return $this->book->createRecord($input);
    }

    /**
     * @param $id
     * @return mixed
     */
    public function getBook($id)
    {
        return $this->book->findById($id);
    }

    /**
     * @param $input
     * @param $book
     * @return mixed
     */
    public function updateBook($input, $book)
    {
        return $book->updateRecord($input);
    }

    /**
     * @param $id
     * @return int
     */
    public function deleteBook($id)
    {
        return $this->book->deleteRecord($id);
    }

    /**
     * @param $input
     * @return mixed
     */
    public function getAllBooks($input): mixed
    {
        $books = $this->book::query();
        if ($input) {
            if (@$input['search']) {
                $books = $this->book::search($input['search'])->get();
            }
            if (@$input['date']) {
                $date = explode("/", $input['date']);
                $startDate = Carbon::parse($date[0])->format('Y-m-d');
                $endDate = Carbon::parse($date[1])->format('Y-m-d');
                $books = $this->book->whereBetween('published', [$startDate, $endDate]);
            }
            if (@$input['page'] || @$input['limit']) {
                $perPage = $input['limit'] ?? 15;
                $page = $input['page'] ?? 1;

                return $books->orderBy('created_at', 'desc')->paginate($perPage, ['*'], 'page', $page);
            }
        }
        $perPage = $input['limit'] ?? 15;
        $page = $input['page'] ?? 1;


        return $books->orderBy('created_at', 'desc')->paginate($perPage, ['*'], 'page', $page);
    }
}
