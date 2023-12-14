import Navbar from "@/components/custom/navbar/navbar"

export default function Home() {
  return (
    <main>
      <Navbar />
      <div>Home</div>
    </main>
  )
}

export function generateMetadata({ params }: { params: any }) {
  return {
    title: "Rhymes & Fables",
    description: "Landind page"
  }
}
