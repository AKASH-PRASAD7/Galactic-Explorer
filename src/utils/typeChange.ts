import { films, people, planets, species, starships, vehicles } from "@/schema";
const handleTypeChange = (typeParam: string) => {
  switch (typeParam) {
    case "people":
      return people;

    case "films":
      return films;

    case "species":
      return species;

    case "starships":
      return starships;

    case "planets":
      return planets;

    case "vehicles":
      return vehicles;

    default:
      return people;
  }
};

export default handleTypeChange;
