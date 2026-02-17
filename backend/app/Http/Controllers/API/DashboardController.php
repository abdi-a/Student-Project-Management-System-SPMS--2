<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;


use App\Models\User;
use App\Models\Project;
use App\Models\Evaluation;
use App\Models\Submission;

class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = $request->user();
        $stats = [];

        if ($user->role === 'admin') {
            $stats = [
                'total_students' => User::where('role', 'student')->count(),
                'total_supervisors' => User::where('role', 'supervisor')->count(),
                'total_evaluators' => User::where('role', 'evaluator')->count(),
                'total_projects' => Project::count(),
                'pending_projects' => Project::where('status', 'pending')->count(),
                'completed_projects' => Project::where('status', 'completed')->count(),
                'in_progress_projects' => Project::where('status', 'in_progress')->count(),
            ];
        } elseif ($user->role === 'supervisor') {
             $stats = [
                'assigned_students' => Project::where('supervisor_id', $user->id)->count(),
                'pending_reviews' => Project::where('supervisor_id', $user->id)->where('status', 'pending')->count(),
                'projects_in_progress' => Project::where('supervisor_id', $user->id)->where('status', 'in_progress')->count(),
            ];
        } elseif ($user->role === 'evaluator') {
            $stats = [
                'assigned_evaluations' => Evaluation::where('evaluator_id', $user->id)->count(),
                'completed_evaluations' => Evaluation::where('evaluator_id', $user->id)->where('status', 'graded')->count(),
                'pending_evaluations' => Evaluation::where('evaluator_id', $user->id)->where('status', 'pending')->count(),
            ];
        } elseif ($user->role === 'student') {
             $project = Project::where('student_id', $user->id)->first();
             $stats = [
                 'has_project' => (bool)$project,
                 'project_status' => $project ? $project->status : 'Not Started',
                 'supervisor' => $project && $project->supervisor ? $project->supervisor->name : 'Not Assigned',
                 'submissions_count' => $project ? $project->submissions()->count() : 0,
             ];
        }

        return response()->json($stats);
    }
}
