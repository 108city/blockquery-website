import { Star } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      quote:
        "Blockquery gave us defensible, regulator-ready blockchain intelligence that turned complex wallet activity into clear risk decisions.",
      name: "Julian Thorne",
      title: "Financial Compliance Officer",
      stars: 5,
    },
    {
      quote:
        "Their fraud-monitoring layer flags suspicious payouts in real time. It's become a standard part of our risk workflow rather than an after-the-fact forensic exercise.",
      name: "Marek Halász",
      title: "Head of Risk, Licensed Gaming Operator",
      stars: 5,
    },
    {
      quote:
        "Blockquery delivered precise attribution and court-ready reporting that strengthened our case and saved weeks of forensic work.",
      name: "Clara Montrose",
      title: "Corporate Attorney",
      stars: 5,
    },
  ];

  return (
    <section className="py-20 sm:py-28 md:py-36 px-4 sm:px-6">
      <div className="container mx-auto max-w-5xl text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3">
          What our partners say
        </h2>
        <p className="text-lg text-muted-foreground mb-14">
          Voices from across the regulatory, legal, and operator landscape.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="border border-border rounded-lg p-6 sm:p-8 text-left"
            >
              <p className="text-muted-foreground mb-4 italic">"{t.quote}"</p>
              <p className="text-sm font-semibold">{t.name}</p>
              <p className="text-xs text-muted-foreground mb-3">{t.title}</p>
              <div className="flex gap-1">
                {Array.from({ length: t.stars }).map((_, si) => (
                  <Star
                    key={si}
                    className="w-4 h-4 text-primary fill-primary"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
