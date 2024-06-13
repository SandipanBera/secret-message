import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { nanoid } from "ai";
function Loading() {
  const skeletons = [...Array(3)];
  const id =nanoid()
  return (
    <div className="w-full  flex flex-col py-6 gap-4">
      {skeletons.map(() => (
        <div
          className="flex w-full max-w-md flex-col space-y-3 mx-auto"
          key={id}
        >
          <Skeleton className="h-[125px] w-full rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default Loading;
