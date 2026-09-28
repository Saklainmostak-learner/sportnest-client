import BookingTimeline from "../components/BookingTimeline";
import ExploreSports from "../components/ExploreSports";
import FeaturedFacilities from "../components/FeaturedFacilities";
import FinalArenaCTA from "../components/FinalArenaCTA";
import Hero from "../components/Hero";

import VenueExplorer from "../components/VenueExplorer";

const Home = () => {
  return (
    <>
      <Hero />
      <ExploreSports />
      <VenueExplorer />
      <FeaturedFacilities />
      <BookingTimeline />
      <FinalArenaCTA />
    </>
  );
};

export default Home;
