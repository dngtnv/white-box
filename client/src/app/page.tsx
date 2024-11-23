import Form from "@/components/Form";
import Thoughts from "@/components/Thoughts";
import { Toaster } from "@/components/ui/sonner";

export default function Home() {
  return (
    <>
      <main className="p-4">
        <section className="flex items-center justify-center py-20">
          <div className="max-w-[49rem]">
            <h1 className="text-5xl font-bold tracking-tight">
              Throw your thoughts into the void
            </h1>
            <div className="mt-12">
              <Form />
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
