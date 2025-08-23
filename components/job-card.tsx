"use client";

import { Job } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock } from "lucide-react";
import Link from "next/link";

interface JobCardProps {
  job: Job;
  showActions?: boolean;
  onEdit?: (job: Job) => void;
  onDelete?: (id: string) => void;
}

export function JobCard({
  job,
  showActions = false,
  onEdit,
  onDelete,
}: JobCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-lg line-clamp-2">{job.title}</CardTitle>
            <CardDescription className="text-base font-medium text-foreground mt-1">
              {job.company}
            </CardDescription>
          </div>
          <Badge variant="secondary" className="ml-2">
            {job.job_type}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="flex-1">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin size={16} />
            <span>{job.location}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock size={16} />
            <span>Posted {formatDate(job.created_at)}</span>
          </div>

          <p className="text-sm text-muted-foreground line-clamp-3">
            {job.description}
          </p>
        </div>
      </CardContent>

      <CardFooter className="flex gap-2">
        <Link href={`/jobs/${job.id}`} className="flex-1">
          <Button variant="outline" className="w-full">
            View Details
          </Button>
        </Link>

        {showActions && (
          <>
            <Button
              variant="outline"
              onClick={() => onEdit?.(job)}
              className="flex-1"
            >
              Edit
            </Button>
            <Button
              variant="destructive"
              onClick={() => onDelete?.(job.id)}
              className="flex-1"
            >
              Delete
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
}
