import Image from "next/image";
import star from "@/assests/starwars.jpg";

import About from "@/components/About";
import Link from "next/link";

const page = ({ params }: any): JSX.Element => {
  const { category, id } = params;

  return (
    <main className="relative min-h-screen">
      <Image
        src={star}
        className="w-full h-full object-cover fixed inset-0 z-0"
        alt="starwars"
      />
      <section className="relative z-10 text-white">
        <Link href="/">
          <h1 className="text-4xl text-center m-8 font-semibold font-mono">
            Galactic Explorer
          </h1>
        </Link>
        <About category={category} id={id} />
      </section>
    </main>
  );
};

export default page;
