<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Admin
        \App\Models\User::create([
            'name' => 'Admin User',
            'email' => 'admin@spms.com',
            'password' => \Illuminate\Support\Facades\Hash::make('password'),
            'role' => 'admin',
        ]);

        // Student
        $student = \App\Models\User::create([
            'name' => 'John Student',
            'email' => 'student@spms.com',
            'password' => \Illuminate\Support\Facades\Hash::make('password'),
            'role' => 'student',
        ]);

        // Supervisor
        $supervisor = \App\Models\User::create([
            'name' => 'Dr. Supervisor',
            'email' => 'supervisor@spms.com',
            'password' => \Illuminate\Support\Facades\Hash::make('password'),
            'role' => 'supervisor',
        ]);

        // Evaluator
        \App\Models\User::create([
            'name' => 'Prof. Evaluator',
            'email' => 'evaluator@spms.com',
            'password' => \Illuminate\Support\Facades\Hash::make('password'),
            'role' => 'evaluator',
        ]);

        // Sample Project
        \App\Models\Project::create([
            'student_id' => $student->id,
            'supervisor_id' => $supervisor->id,
            'title' => 'AI-Based Student Management System',
            'description' => 'A comprehensive system to manage student projects using Artificial Intelligence.',
            'status' => 'in_progress',
        ]);
    }
}
