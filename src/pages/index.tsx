import NavBar from "@components/NavBar";
import Example from "@components/example";
import HomeBody from "@src/views/HomeBody";

export default function Home() {
  return (
    <div className="w-full">
      <NavBar />
      <HomeBody />
    </div>
  );
}
