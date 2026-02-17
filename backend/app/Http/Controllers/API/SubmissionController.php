<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;


use App\Models\Project;
use App\Models\Submission;

class SubmissionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Project $project)
    {
        // Add authorization check if needed
        return response()->json($project->submissions);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Project $project)
    {
        $validator = \Illuminate\Support\Facades\Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'file' => 'required|file|mimes:pdf,doc,docx,zip|max:10240', // 10MB max
            'type' => 'required|in:proposal,progress_report,final_report,other',
            'comments' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        if ($request->hasFile('file')) {
            $path = $request->file('file')->store('submissions', 'public');

            $submission = Submission::create([
                'project_id' => $project->id,
                'student_id' => $request->user()->id,
                'title' => $request->title,
                'file_path' => $path,
                'type' => $request->type,
                'comments' => $request->comments,
            ]);

            return response()->json([
                'message' => 'Submission created successfully',
                'submission' => $submission
            ], 201);
        }

        return response()->json(['message' => 'File upload failed'], 500);
    }

    /**
     * Display the specified resource.
     */
    public function show(Submission $submission)
    {
        return response()->json($submission->load(['project', 'student', 'evaluations']));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
