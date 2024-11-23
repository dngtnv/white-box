import { Card, CardHeader, CardContent } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

const SkeletonCard = () => {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-4 w-[180px] space-y-3" />
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </CardContent>
    </Card>
  );
};

export default SkeletonCard;
