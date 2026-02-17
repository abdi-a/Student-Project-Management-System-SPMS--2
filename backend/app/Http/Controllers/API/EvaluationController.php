<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;


use App\Models\Submission;
use App\Models\Evaluation;

class EvaluationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Submission $submission)
    {
        $validator = \Illuminate\Support\Facades\Validator::make($request->all(), [
            'score' => 'required|integer|min:0|max:100',
            'feedback' => 'required|string',
            'status' => 'required|in:pending,graded',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $evaluation = Evaluation::create([
            'submission_id' => $submission->id,
            'evaluator_id' => $request->user()->id,
            'score' => $request->score,
            'feedback' => $request->feedback,
            'status' => $request->status,
        ]);
        
        // Optionally update submission status or project status here

        return response()->json([
            'message' => 'Evaluation submitted successfully',
            'evaluation' => $evaluation
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
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
