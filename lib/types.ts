export interface Job {
  id: string;
  user_id: string;
  title: string;
  company: string;
  description: string;
  location: string;
  job_type: "Full-Time" | "Part-Time" | "Contract";
  created_at: string;
  updated_at: string;
}

export interface JobFilters {
  location?: string;
  job_type?: string;
  search?: string;
}
