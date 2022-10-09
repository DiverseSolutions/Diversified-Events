import EventCardData from "../../dummyData/EventCardData";
import Card from "../components/EventCard";

export default function HomePage() {
  return (
    <div className="min-h-screen w-full flex justify-center mt-10">
      <div className="flex max-w-5xl justify-center">
        <div className="grid grid-cols-3 gap-3 w-full h-64">
          {EventCardData.map((data, index) => (
            <Card key={index} data={data} />
          ))}
        </div>
      </div>
    </div>
  );
}
