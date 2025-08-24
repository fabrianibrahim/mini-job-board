import { JobList } from "@/components/jobs/job-list";
import { getJobs } from "@/lib/supabase/jobs-server";
import { createClient } from "@/lib/supabase/server";
import { Job } from "@/lib/types";
import Navigation from "@/components/navigation";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let jobs: Job[];
  try {
    jobs = await getJobs();
  } catch (error) {
    console.error("Error fetching jobs:", error);
    jobs = [];
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Navigation user={user} />

      <div className="w-full bg-gradient-to-b from-background to-muted/20 py-16">
        <div className="max-w-7xl mx-auto px-5 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Find Your Next{" "}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Dream Job
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Discover amazing opportunities from top companies. Filter by
            location, job type, and more to find the perfect match for your
            skills.
          </p>
        </div>
      </div>

      <div className="flex-1 w-full max-w-7xl mx-auto p-5">
        <div className="py-8">
          <h2 className="text-2xl font-bold mb-6">Latest Job Openings</h2>
          <JobList jobs={jobs} />
        </div>
      </div>

      <footer className="w-full border-t bg-muted/50 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-5 text-center text-sm text-muted-foreground">
          <p>© 2025 JobBoard. Built with Next.js and Supabase.</p>
        </div>
      </footer>
    </main>
  );
}
