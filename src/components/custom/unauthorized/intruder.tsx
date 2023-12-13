import { useRouter } from "next/navigation"
export const Intruder = () => {
  const router = useRouter();
  return (
    // TODO : Make this component render after 2 seconds timeout
    <div>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        You are NOT Logged in
      </h1>
      <button onClick={() => {
        router.push("/login")
      }}>
        Login
      </button>
    </div>
  );
}