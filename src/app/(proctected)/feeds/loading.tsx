import FeedCardSkeleton from "@/components/custom/skeletons/feedCardSkeleton";


export default function FeedsPageLoading() {
  const loadingArray = "loading".split("");
  return (
    <div>
      <div className="mt-16">
        <div className="flex flex-col gap-8">
          {loadingArray.map((item) => {
            return (
              <div key={1}>
                <FeedCardSkeleton />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}