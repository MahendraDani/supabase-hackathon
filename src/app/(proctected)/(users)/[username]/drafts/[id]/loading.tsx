import { Skeleton } from "@/components/ui/skeleton";

export default function DraftsPageLoading() {
  return (
    <section className="md:mt-4 relative w-full md:flex md:justify-start md:items-start md:gap-4">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col justify-start items-start gap-4 md:w-1/5 fixed left-4 bottom-4 top-[5.5rem] bg-slate-100 dark:bg-slate-700 p-4">
        <Skeleton className="w-10rem h-6 bg-slate-200 dark:bg-slate-600" />
        {/* <CreateNewDraftComponent handleCreateNewDraft={handleCreateNewDraft} /> */}
        <div className="w-full flex flex-col justify-start items-center gap-4">
          {"loading".split("").map(() => {
            return (
              <div key={1}>
                <Skeleton className="w-[10rem] md:w-[13rem] lg:w-[15rem] h-8 dark:bg-slate-600 bg-slate-200" />
              </div>
            )
          })}
        </div>
      </aside>
      <section className="md:w-4/5 md:sticky md:left-72 md:px-8" >
        <Skeleton className="w-full h-12 dark:bg-slate-600 bg-slate-200" />
        <div className="mt-4">
          {"longlonglong".split("").map(() => {
            return (
              <div key={1} className="py-1">
                <Skeleton className="md:w-[80%] w-full h-6 bg-slate-200 dark:bg-slate-600" />
              </div>
            )
          })}
        </div>
      </section>
    </section>
  )
}