interface ProfilePageProps {
  params: {
    username: string;
  }
}
export default function ProfilePage({ params }: ProfilePageProps) {
  return (
    <div>
      <div>This is private user's page</div>
      {params.username}
    </div>
  )
}