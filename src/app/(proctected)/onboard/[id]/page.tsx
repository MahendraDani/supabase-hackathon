import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

type OnboardPageProps = {
  params: {
    id: string;
  }
}
export default function OnboardPage({ params }: OnboardPageProps) {
  return (
    <div>{params.id}</div>
  )
}

export function generateMetadata({ params }: { params: any }) {
  return {
    title: "Onboarding | R&F",
    description: "User onboarding page"
  }
}