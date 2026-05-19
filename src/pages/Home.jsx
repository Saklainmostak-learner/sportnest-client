
import BookingTimeline from "../components/BookingTimeline";
import ExploreSports from "../components/ExploreSports";
import FeaturedFacilities from "../components/FeaturedFacilities";
import FinalArenaCTA from "../components/FinalArenaCTA";
import Hero from "../components/Hero";
import PlayerSpotlight from "../components/PlayerSpotlight";

import VenueExplorer from "../components/VenueExplorer";

const Home = () => {
  return (
    <>
      <Hero />
      <VenueExplorer />
      <FeaturedFacilities />
      <ExploreSports />
      <BookingTimeline/>
      <PlayerSpotlight/>
      <FinalArenaCTA/>
    </>
  );
};

export default Home;
