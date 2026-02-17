<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;


class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = $request->user();
        
        if ($user->role === 'admin') {
            $projects = \App\Models\Project::with(['student', 'supervisor'])->get();
        } elseif ($user->role === 'supervisor') {
            $projects = \App\Models\Project::where('supervisor_id', $user->id)
                ->with(['student'])
                ->get();
        } else {
            // Student sees their own projects
            $projects = \App\Models\Project::where('student_id', $user->id)
                ->with(['supervisor'])
                ->get();
        }

        return response()->json($projects);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = \Illuminate\Support\Facades\Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'supervisor_id' => 'required|exists:users,id',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $project = \App\Models\Project::create([
            'student_id' => $request->user()->id,
            'title' => $request->title,
            'description' => $request->description,
            'supervisor_id' => $request->supervisor_id,
            'status' => 'pending',
        ]);

        return response()->json([
            'message' => 'Project proposal submitted successfully',
            'project' => $project
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $project = \App\Models\Project::with(['student', 'supervisor', 'submissions.evaluations'])->findOrFail($id);
        
        // Authorization check could be added here
        
        return response()->json($project);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $project = \App\Models\Project::findOrFail($id);
        
        // Example logic: Only supervisors/admins can approve/reject
        // Students can only update pending projects
        
        $project->update($request->only(['title', 'description', 'status', 'supervisor_id']));

        return response()->json([
            'message' => 'Project updated successfully',
            'project' => $project
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $project = \App\Models\Project::findOrFail($id);
        $project->delete();

        return response()->json(['message' => 'Project deleted successfully']);
    }
}
