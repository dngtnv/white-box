"use client";
import { fetcher } from "@/app/utils/fetcher";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import useSWR from "swr";
import { toast } from "sonner";
import SkeletonCard from "./SkeletonCard";

interface Thoughts {
  _id: string;
  content: string;
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

  if (!data) {
    return <p>No thoughts found</p>;
  }

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
      {data &&
        data.length !== 0 &&
        data.map((thought: Thoughts) => (
          <Card key={thought._id}>
            <CardHeader>
              <CardTitle>Anonymous</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{thought.content}</p>
            </CardContent>
          </Card>
        ))}
    </div>
  );
};

export default Thoughts;
