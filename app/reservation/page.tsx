import ReservationHero from "@/components/ReservationHero";
import ReservationForm from "@/components/Reservationform";
import Divider from "@/components/Divider";

export const metadata = {
  title: "Book a Table | Restaurant",
  description: "Reserve your table for an unforgettable dining experience.",
};

export default function ReservationPage() {
  return (
    <>
      <main className="min-h-screen bg-background mx-4 py-2 mt-2">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen gap-4">
          {/* Left — Hero image */}
          <div className="lg:sticky lg:top-0 lg:h-screen">
            <ReservationHero />
          </div>

          {/* Right — Form */}
          <div className="flex flex-col justify-center px-6 py-12 sm:px-10 lg:px-14 xl:px-20 royal-card border">
            <div className="w-full max-w-lg mx-auto">
              {/* Form header */}
              <div className="mb-8 space-y-1">
                <p className="text-muted-foreground text-xs tracking-[0.25em] uppercase font-medium">
                  Reservations
                </p>
                <h2 className="text-foreground font-display text-2xl font-light tracking-tight">
                  Your details
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed pt-1">
                  Fill in the form below and we&apos;ll be in touch to confirm
                  your booking.
                </p>
              </div>

              <ReservationForm />
            </div>
          </div>
        </div>
      </main>
      <Divider />
    </>
  );
}