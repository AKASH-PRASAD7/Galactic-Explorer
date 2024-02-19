import HomeComp from "@/components/HomeComp";
import Image from "next/image";
import star from "@/assests/starwars.jpg";

export default function Home(): JSX.Element {
  return (
    <>
      <main className="relative min-h-screen ">
        <Image
          src={star}
          className="w-full h-full object-cover fixed inset-0 z-0 "
          alt="starwars"
        />

        <section className="relative z-10 flex text-white flex-col items-center gap-8 justify-between mx-4 p-8">
          <h1 className="text-4xl  text-center font-semibold font-mono">
            Galactic Explorer
          </h1>
          <HomeComp />
        </section>
      </main>
    </>
  );
}
