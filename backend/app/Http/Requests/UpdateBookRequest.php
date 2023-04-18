<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class UpdateBookRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'title'       => 'required|unique:books,title,'. request()->route('book'),
            'author'      => 'required',
            'genre'       => 'nullable',
            'publisher'   => 'nullable',
            'published'   => 'nullable|date',
            'isbn'        => 'nullable|unique:books,title,'. request()->route('book'),
            'image'       => 'nullable|mimes:jpeg,jpg,png',
            'description' => 'nullable',
        ];
    }

    /**
     * @param  Validator  $validator
     */
    public function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'success' => false,
            'message' => $validator->errors()->first(),
        ], 422));
    }
}
