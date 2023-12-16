import { Skeleton } from "@/components/ui/skeleton";

export default function FeedPageLoading() {
  return (
    <div className="relative mt-4 w-full flex flex-col justify-center items-center">
      <section className="w-full md:w-[80%] p-4 flex flex-col justify-center items-center">
        <h1 className="mb-6">
          <Skeleton className="w-[20rem] md:w-[50rem] h-12 md:h-16 bg-slate-100 dark:bg-slate-600" />
        </h1>
        <div className="flex justify-between items-center gap-4">
          <div>
            <Skeleton className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-600" />
          </div>
          <div className="flex flex-col justify-start items-start gap-2">
            <Skeleton className="w-[15rem] md:w-[20rem] h-8 bg-slate-100 dark:bg-slate-600 " />
            <Skeleton className="w-[10rem] md:w-[15rem] h-6 bg-slate-100 dark:bg-slate-600 " />
          </div>
        </div>
        <div className="mt-6">
          <Skeleton className="w-[25rem] md:w-[70rem] min-h-[30rem] md:min-h-[40rem] bg-slate-100 dark:bg-slate-600" />
        </div>
      </section>
    </div>
  )
}