<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Game extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'score'
    ];

    public function session()
    {
        return $this->belongsTo('App\Session');
    }
}
