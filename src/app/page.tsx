import Pagination from "@/components/Pagination";
import Search from "@/components/Search";
import Table from "@/components/Table";

export default function Home(): JSX.Element {
  return (
    <>
      <main>
        <h1 className="text-4xl text-center m-8 font-semibold font-mono">
          Galactic Explorer
        </h1>
        <section className="flex flex-col items-center gap-8 justify-between mx-4 ">
          <Search />
          <Table />
          <Pagination />
        </section>
      </main>
    </>
  );
}
