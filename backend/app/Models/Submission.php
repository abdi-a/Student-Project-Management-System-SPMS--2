<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Submission extends Model
{
    use HasFactory;

    protected $fillable = [
        'project_id',
        'student_id',
        'title',
        'file_path',
        'type',
        'comments',
    ];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function student()
    {
        return $this->belongsTo(User::class, 'student_id');
    }

    public function evaluations()
    {
        return $this->hasMany(Evaluation::class);
    }
}
