import BackButton from "@/components/buttons/back-button";
import { Badge } from "@/components/ui/badge";
import { getJobById } from "@/lib/supabase/jobs-server";
import { Building, Calendar, MapPin } from "lucide-react";
import { notFound } from "next/navigation";

interface JobDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function JobDetailPage({ params }: JobDetailPageProps) {
  const { id } = await params;
  const job = await getJobById(id);

  if (!job) {
    notFound();
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="-ml-4">
            <BackButton />
          </div>

          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold">{job.title}</h1>
                <div className="flex items-center gap-2 mt-2">
                  <Building size={16} className="text-muted-foreground" />
                  <span className="text-lg font-medium">{job.company}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Badge variant="secondary" className="text-sm">
                  {job.job_type}
                </Badge>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>Posted {formatDate(job.created_at)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {job.description.split("\n").map((paragraph: string, index: number) => (
          <p key={index} className="mb-4">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}
