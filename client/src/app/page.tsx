import ThoughtForm from "@/components/ThoughtForm";
import Thoughts from "@/components/Thoughts";
import { Toaster } from "@/components/ui/sonner";

export default function Home() {
  return (
    <>
      <main className="p-4">
        <section className="flex items-center justify-center py-20">
          <div className="max-w-[49rem]">
            <h1 className="text-pretty text-center text-3xl font-bold tracking-tight md:text-5xl">
              Throw your thoughts into the void
            </h1>
            <div className="mt-12">
              <ThoughtForm />
            </div>
          </div>
        </section>
        <section className="py-20">
          <Thoughts />
        </section>
      </main>
      <Toaster richColors />
    </>
  );
}
