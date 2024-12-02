"use client";
import { fetcher } from "@/lib/fetcher";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import useSWR from "swr";
import { toast } from "sonner";
import SkeletonCard from "./SkeletonCard";

interface Thoughts {
  _id: string;
  content: string;
  styles: {
    background: string;
  };
}

const Thoughts = () => {
  const { data, error, isLoading } = useSWR<Thoughts[]>(
    "http://localhost:5000/api/thoughts",
    fetcher,
    {
      revalidateOnFocus: false,
    },
  );

  if (error) {
    toast.error(error.message);
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {"abcdefghijklmno".split("").map((char) => (
          <SkeletonCard key={char} />
        ))}
      </div>
    );
  }

  if (!data || data!.length === 0) {
    return <p className="text-center">No thoughts found.</p>;
  }

  return (
    <div className="columns-xs">
      {data &&
        data.length !== 0 &&
        data.map((thought: Thoughts) => (
          <Card
            key={thought._id}
            style={{
              background: thought.styles.background,
            }}
            className="mb-4 break-inside-avoid"
          >
            <CardHeader>
              <CardTitle>Anonymous</CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className="break-words"
                dangerouslySetInnerHTML={{ __html: thought.content }}
              />
            </CardContent>
          </Card>
        ))}
    </div>
  );
};

export default Thoughts;
