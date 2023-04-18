<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

/**
 * Class BaseModel
 */
class BaseModel extends Model
{
    public function findById($id)
    {
        return $this->find($id);
    }

    public function deleteRecord($id): int
    {
        return $this->destroy($id);
    }

    public function createRecord($input)
    {
        return $this->create($input);
    }

    public function updateRecord($input): bool
    {
        return $this->update($input);
    }

    public function multipleInsert($data)
    {
        return $this->insert($data);
    }

    public function getRecord($query, $orderBy = null)
    {
        if (!empty($orderBy)) {
            return $this->orderBy($orderBy, 'desc')->get();
        }
        return $this->get();
    }

    public function getFirstRecord($query)
    {
        return $this->first();
    }
}
