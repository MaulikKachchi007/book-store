<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateBookRequest;
use App\Http\Requests\UpdateBookRequest;
use App\Models\Book;
use App\Repositories\BookRepository;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class BookController extends Controller
{
    protected BookRepository $bookRepository;
    protected Book $book;

    public function __construct(BookRepository $bookRepository, Book $book)
    {
        $this->bookRepository = $bookRepository;
        $this->book = $book;
    }

    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index(Request $request)
    {
        try {
            $input = $request->all();
            $books = $this->bookRepository->allBooks($input);
            if (! count($books) < 0) {
                return $this->sendError('Book Not Found.');
            }

            return $this->sendResponse('Book retrieved successfully.', $books, count($books));
        } catch (Exception $e) {
            return $this->sendError($e->getMessage());
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return void
     */
    public function create(CreateBookRequest $request)
    {

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  CreateBookRequest  $request
     * @return JsonResponse
     */
    public function store(CreateBookRequest $request)
    {
        try {
            $input = $request->all();
            $input['published'] = Carbon::parse($input['published'])->format('Y-m-d');
            $input['status'] = $input['status'] == true ? true : false;
            if ($request->hasFile('image')) {
                $input['image'] = uploadImage($request->file('image'));
            }
            $this->bookRepository->createBook($input);

            return $this->sendSuccess('Book created successfully.');
        } catch (Exception $e) {
            return $this->sendError($e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return JsonResponse
     */
    public function show($id)
    {
        try {
            $book = $this->bookRepository->getBook($id);
            if (empty($book)) {
                return $this->sendError('Book Not Found.');
            }

            return $this->sendResponse('Book retrieved successfully.', $book);
        } catch (Exception $e) {
            return $this->sendError($e->getMessage());
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return JsonResponse
     */
    public function edit($id)
    {

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateBookRequest  $request
     * @param  int  $id
     * @return JsonResponse
     */
    public function update(UpdateBookRequest $request, $book)
    {
        try {
            $input = $request->all();
            $book = $this->bookRepository->getBook($book);
            if (empty($book)) {
                return $this->sendError('Book Not Found.');
            }
            $input['published'] = Carbon::parse($input['published'])->format('Y-m-d');
            if ($request->hasFile('image')) {
                Storage::delete(public_path($book['image']));
                $input['image'] = uploadImage($request->file('image'));
            }
            $input['status'] = true;
            $this->bookRepository->updateBook($input, $book);

            return $this->sendSuccess('Book updated successfully.');
        } catch (Exception $e) {
            return $this->sendError($e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return JsonResponse
     */
    public function destroy($id)
    {
        try {
            $book = $this->bookRepository->deleteBook($id);
            if (empty($book)) {
                return $this->sendError('Book Not Found.');
            }

            return $this->sendSuccess('Book delete successfully.');
        } catch (Exception $e) {
            return $this->sendError($e->getMessage());
        }
    }

    /**
     * @param  Request  $request
     * @return JsonResponse
     */
    public function getAllBooks(Request $request) 
    {
        try {
            $input = $request->all();
            $books = $this->bookRepository->getAllBooks($input);
            if (! count($books) < 0) {
                return $this->sendError('Book Not Found.');
            }

            return $this->sendResponse('Book retrieved successfully.', $books, count($books));
        } catch (Exception $e) {
            return $this->sendError($e->getMessage());
        }
    }
}
