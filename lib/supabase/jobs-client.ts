import { createClient } from "./client";
import { Job } from "../types";

export async function getJobs(): Promise<Job[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("jobs")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching jobs:", error);
    throw error;
  }

  return data || [];
}

export async function getJobById(id: string): Promise<Job | null> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("jobs")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return null; // Job not found
    }
    console.error("Error fetching job:", error);
    throw error;
  }

  return data;
}

export async function getUserJobs(): Promise<Job[]> {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("User not authenticated");
  }

  const { data, error } = await supabase
    .from("jobs")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching user jobs:", error);
    throw error;
  }

  return data || [];
}

export async function createJob(
  jobData: Omit<Job, "id" | "created_at" | "updated_at" | "user_id">
): Promise<Job> {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("User not authenticated");
  }

  const { data, error } = await supabase
    .from("jobs")
    .insert([
      {
        ...jobData,
        user_id: user.id,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error("Error creating job:", error);
    throw error;
  }

  return data;
}

export async function updateJob(
  id: string,
  jobData: Partial<Omit<Job, "id" | "created_at" | "updated_at" | "user_id">>
): Promise<Job> {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("User not authenticated");
  }

  const { data, error } = await supabase
    .from("jobs")
    .update(jobData)
    .eq("id", id)
    .eq("user_id", user.id)
    .select()
    .single();

  if (error) {
    console.error("Error updating job:", error);
    throw error;
  }

  return data;
}

export async function deleteJob(id: string): Promise<void> {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("User not authenticated");
  }

  const { error } = await supabase
    .from("jobs")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    console.error("Error deleting job:", error);
    throw error;
  }
}
