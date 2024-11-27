"use client";
import { fetcher } from "@/app/utils/fetcher";
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
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
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
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
      {data &&
        data.length !== 0 &&
        data.map((thought: Thoughts) => (
          <Card
            key={thought._id}
            style={{
              background: thought.styles.background,
            }}
          >
            <CardHeader>
              <CardTitle>Anonymous</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="break-words">{thought.content}</p>
            </CardContent>
          </Card>
        ))}
    </div>
  );
};

export default Thoughts;
