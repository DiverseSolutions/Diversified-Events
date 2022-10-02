import CardData from "../../dummyData/CardData";
import Card from "../components/Card";

export default function HomePage() {
  return (
    <div className='min-h-screen w-full flex justify-center mt-10'>
      <div className='flex max-w-4xl justify-center'>
        <div className='grid grid-cols-3 gap-3 w-full h-64'>
          {CardData.map((data) => (
            <Card data={data} />
          ))}
        </div>
      </div>
    </div>
  );
}
