"use client";

import { Job, JobFilters } from "@/lib/types";
import { JobCard } from "./job-card";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, MapPin, Briefcase } from "lucide-react";

interface JobListProps {
  jobs: Job[];
  showActions?: boolean;
  onEdit?: (job: Job) => void;
  onDelete?: (id: string) => void;
}

export function JobList({
  jobs,
  showActions = false,
  onEdit,
  onDelete,
}: JobListProps) {
  const [filteredJobs, setFilteredJobs] = useState(jobs);
  const [filters, setFilters] = useState<JobFilters>({});

  const jobTypes = Array.from(new Set(jobs.map((job) => job.job_type)));
  const locations = Array.from(new Set(jobs.map((job) => job.location)));

  useEffect(() => {
    let filtered = jobs;

    if (filters.search) {
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(filters.search!.toLowerCase()) ||
          job.company.toLowerCase().includes(filters.search!.toLowerCase()) ||
          job.description.toLowerCase().includes(filters.search!.toLowerCase())
      );
    }

    if (filters.location) {
      filtered = filtered.filter((job) => job.location === filters.location);
    }

    if (filters.job_type) {
      filtered = filtered.filter((job) => job.job_type === filters.job_type);
    }

    setFilteredJobs(filtered);
  }, [jobs, filters]);

  const updateFilter = (key: keyof JobFilters, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value === "all" ? undefined : value,
    }));
  };

  const clearFilters = () => {
    setFilters({});
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 p-4 bg-muted/50 rounded-lg">
        <div className="flex-1">
          <Label htmlFor="search" className="sr-only">
            Search jobs
          </Label>
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
              size={16}
            />
            <Input
              id="search"
              placeholder="Search jobs, companies, or keywords..."
              value={filters.search || ""}
              onChange={(e) => updateFilter("search", e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="min-w-[120px]">
                <MapPin size={16} className="mr-2" />
                {filters.location || "Location"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => updateFilter("location", "all")}>
                All Locations
              </DropdownMenuItem>
              {locations.map((location) => (
                <DropdownMenuItem
                  key={location}
                  onClick={() => updateFilter("location", location)}
                >
                  {location}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="min-w-[120px]">
                <Briefcase size={16} className="mr-2" />
                {filters.job_type?.replace("-", " ") || "Job Type"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => updateFilter("job_type", "all")}>
                All Types
              </DropdownMenuItem>
              {jobTypes.map((type) => (
                <DropdownMenuItem
                  key={type}
                  onClick={() => updateFilter("job_type", type)}
                >
                  {type.replace("-", " ")}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {(filters.search || filters.location || filters.job_type) && (
            <Button variant="ghost" onClick={clearFilters}>
              Clear
            </Button>
          )}
        </div>
      </div>

      <div className="text-sm text-muted-foreground">
        Showing {filteredJobs.length} of {jobs.length} jobs
      </div>

      {filteredJobs.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-muted-foreground">
            {jobs.length === 0
              ? "No jobs available."
              : "No jobs match your search criteria."}
          </div>
          {filters.search || filters.location || filters.job_type ? (
            <Button variant="link" onClick={clearFilters} className="mt-2">
              Clear filters to see all jobs
            </Button>
          ) : null}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              showActions={showActions}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
