import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
export default function FeedCardSkeleton() {
  return (
    <Skeleton className="w-full md:w-[80%] lg:w-[60%] mx-auto bg-slate-50 dark:bg-slate-700">
      <CardContent className="p-8 w-full -mb-8 flex justify-between items-center">
        <div className="flex justify-start items-center gap-4">
          <Skeleton className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-600" />
          <div className="flex flex-col justify-start items-start gap-1">
            <Skeleton className="w-[15rem] h-4 bg-slate-200 dark:bg-slate-600" />
            <Skeleton className="w-[15rem] h-4 bg-slate-200 dark:bg-slate-600" />
          </div>
        </div>
      </CardContent>
      <CardHeader>
        <CardTitle>
          <Skeleton className="w-[25rem] h-6 bg-slate-200 dark:bg-slate-600" />
        </CardTitle>
        <CardDescription>
          <Skeleton className="w-full h-[4.5rem] bg-slate-200 dark:bg-slate-600" />
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between items-center gap-4 text-slate-600">
        <div className="flex justify-between items-center gap-2">
          <Skeleton className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-600" />
          <Skeleton className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-600" />
          <Skeleton className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-600" />
        </div>
      </CardFooter>
    </Skeleton>
  )
}