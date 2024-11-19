import Hero from "../Home/Hero"; // Adjust path according to your Home folder
import Features from "../Home/ExploreEvents";
import HowItWorks from "../Home/HowItWorks";
import EventCard from "../Home/EventCard";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Features />
      <HowItWorks />
      <EventCard />
    </main>
  );
}
