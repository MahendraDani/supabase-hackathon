export default function Home() {
  return (
    <main>
      <div>Home</div>
    </main>
  )
}

export function generateMetadata({ params }: { params: any }) {
  return {
    title: "Story  Sphere",
    description: "Landind page"
  }
}
