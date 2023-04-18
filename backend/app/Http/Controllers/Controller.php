<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function sendResponse($message, $data, $totalRecord = null, $status = 200)
    {
        if (empty($totalRecord)) {
            return response()->json([
                'status' => true,
                'data'    => $data,
                'message' => $message,
            ], $status);
        } else {
            return response()->json([
                'status'      => true,
                'total' => $totalRecord,
                'data'         => $data,
                'message'      => $message,
            ], $status);
        }
    }

    public function sendSuccess($message, $status = 200)
    {
        return response()->json([
            'status' => true,
            'message' => $message,
        ], $status);
    }

    public function sendError($message, $status = 422)
    {
        return response()->json([
            'status' => false,
            'message' => $message,
        ], $status);
    }
}
