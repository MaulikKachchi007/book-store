<?php

use Illuminate\Support\Facades\Storage;

if (!function_exists('uploadImage')) {
    function uploadImage($image)
    {
        $filename = str_replace('image/', '', $image->getClientMimeType());
        $uploadImage = time().".".$filename;
        $fileName = 'books/'.$uploadImage;
//        Storage::disk('public')->put('books' . '/'. $uploadImage, $image, 'public');   
        $image->storeAs('public/books', $uploadImage);

        return $fileName;
    }
}

if (!function_exists('getPageSize')) {
    /**
     * @param $request
     *
     * @return mixed
     */
    function getPageSize($request)
    {

        return $request->input('page.size', 10);
    }
}
