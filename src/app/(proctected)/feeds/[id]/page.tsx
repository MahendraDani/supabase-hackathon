interface FeedPageInterface {
  params: {
    id: string;
  }
}
const FeedPage = ({ params }: FeedPageInterface) => {
  return (
    // TODO : Show story/poem/quote in detail here 
    <div>
      <div>Hello ji REad complete story from here</div>
      <div>{params.id}</div>
    </div>
  )
}
export default FeedPage;