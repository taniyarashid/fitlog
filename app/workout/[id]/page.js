import { Suspense } from "react";
import WorkoutDetails from "@/components/WorkoutDetails";

export default function WorkoutPage() {
  return (
    <main>
      <Suspense
        fallback={
          <div className="flex justify-center py-40">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-line border-t-accent" />
          </div>
        }
      >
        <WorkoutDetails />
      </Suspense>
    </main>
  );
}