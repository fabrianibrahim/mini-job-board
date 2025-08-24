"use client";

import { useState, useEffect } from "react";
import { JobList } from "@/components/jobs/job-list";
import { JobForm } from "@/components/jobs/job-form";
import { Job } from "@/lib/types";
import {
  getUserJobs,
  createJob,
  updateJob,
  deleteJob,
} from "@/lib/supabase/jobs-client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Briefcase } from "lucide-react";

export default function DashboardPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showNewJobForm, setShowNewJobForm] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const userJobs = await getUserJobs();
        setJobs(userJobs);
      } catch (err) {
        console.error("Error fetching user jobs:", err);
        setError("Failed to load your jobs. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleCreateJob = async (
    jobData: Omit<Job, "id" | "created_at" | "updated_at" | "user_id">
  ) => {
    try {
      const newJob = await createJob(jobData);
      setJobs((prev) => [newJob, ...prev]);
      setShowNewJobForm(false);
    } catch (err) {
      console.error("Error creating job:", err);
      setError("Failed to create job. Please try again.");
    }
  };

  const handleEditJob = (job: Job) => {
    setEditingJob(job);
  };

  const handleUpdateJob = async (
    jobData: Omit<Job, "id" | "created_at" | "updated_at" | "user_id">
  ) => {
    if (!editingJob) return;

    try {
      const updatedJob = await updateJob(editingJob.id, jobData);
      setJobs((prev) =>
        prev.map((job) => (job.id === editingJob.id ? updatedJob : job))
      );
      setEditingJob(null);
    } catch (err) {
      console.error("Error updating job:", err);
      setError("Failed to update job. Please try again.");
    }
  };

  const handleDeleteJob = async (jobId: string) => {
    if (window.confirm("Are you sure you want to delete this job posting?")) {
      try {
        await deleteJob(jobId);
        setJobs((prev) => prev.filter((job) => job.id !== jobId));
      } catch (err) {
        console.error("Error deleting job:", err);
        setError("Failed to delete job. Please try again.");
      }
    }
  };

  const handleCancelForm = () => {
    setShowNewJobForm(false);
    setEditingJob(null);
    setError(null);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Job Dashboard</h1>
          <p className="text-muted-foreground">Loading your job postings...</p>
        </div>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (showNewJobForm || editingJob) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        {error && (
          <div className="mb-4 p-4 bg-destructive/10 border border-destructive/20 rounded-md">
            <p className="text-destructive">{error}</p>
          </div>
        )}
        <JobForm
          job={editingJob || undefined}
          onSubmit={editingJob ? handleUpdateJob : handleCreateJob}
          onCancel={handleCancelForm}
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Job Dashboard</h1>
        <p className="text-muted-foreground">
          Manage your job postings and keep track of your applications.
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-md">
          <p className="text-destructive">{error}</p>
          <Button
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={() => setError(null)}
          >
            Dismiss
          </Button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Jobs</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{jobs.length}</div>
            <p className="text-xs text-muted-foreground">
              All your job postings
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Latest Job</CardTitle>
            <div className="h-4 w-4 rounded-full bg-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {jobs.length > 0 ? jobs[0].title : "None"}
            </div>
            <p className="text-xs text-muted-foreground">
              {jobs.length > 0
                ? `Posted ${new Date(jobs[0].created_at).toLocaleDateString()}`
                : "No jobs posted yet"}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mb-6">
        <Button onClick={() => setShowNewJobForm(true)}>
          <Plus size={16} className="mr-2" />
          Post New Job
        </Button>
      </div>

      {jobs.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>No Job Postings Yet</CardTitle>
            <CardDescription>
              You haven&apos;t posted any jobs yet. Create your first job
              posting to get started.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => setShowNewJobForm(true)}>
              <Plus size={16} className="mr-2" />
              Post Your First Job
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">
              Your Jobs ({jobs.length})
            </h2>
            <JobList
              jobs={jobs}
              showActions={true}
              onEdit={handleEditJob}
              onDelete={handleDeleteJob}
            />
          </div>
        </div>
      )}
    </div>
  );
}
