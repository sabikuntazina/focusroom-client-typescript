import About from "@/components/About";
import AvailableRooms from "@/components/AvailableRooms";
import Banner from "@/components/Banner";
import ReadyToBook from "@/components/ReadyToBook";
import WhyChooseUs from "@/components/WhyChooseUs ";


export default function Home() {
  return (
  <div>
    <Banner></Banner>
    <AvailableRooms></AvailableRooms>
    <WhyChooseUs></WhyChooseUs>
    <About></About>
    <ReadyToBook></ReadyToBook>
    
  </div>
  );
}
