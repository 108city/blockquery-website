import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import handshakeCorporate from "@/assets/handshake-corporate.jpg";

const RevenueCTA = () => {
  return (
    <section 
      className="py-20 sm:py-32 md:py-40 lg:py-[200px] px-4 sm:px-6 relative bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${handshakeCorporate})` }}
    >
      <div className="absolute inset-0 bg-black/60" />
      <div className="container mx-auto max-w-4xl text-center relative z-10">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8 sm:mb-12 text-white leading-tight px-2">
          Grow together with our Revenue-sharing model
        </h2>
        <Button size="lg" className="font-semibold w-full sm:w-auto text-base sm:text-lg" asChild>
          <Link to="/contact">Book a call to find out more</Link>
        </Button>
      </div>
    </section>
  );
};

export default RevenueCTA;
