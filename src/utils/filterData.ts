const filterData = (dataObj: any, type: string): any => {
  let finalResult: any[] = [];

  switch (type) {
    case "people":
      finalResult = dataObj.data.results.map((item: any) => ({
        name: item.name,
        height: item.height,
        hairColor: item.hair_color,
        birthYear: item.birth_year,
        mass: item.mass,
      }));

      break;
    case "films":
      finalResult = dataObj.data.results.map((item: any) => ({
        title: item.title,
        director: item.director,
        producer: item.producer,
        release_date: item.release_date,
      }));

      break;
    case "species":
      finalResult = dataObj.data.results.map((item: any) => ({
        name: item.name,
        classification: item.classification,
        average_lifespan: item.average_lifespan,
        language: item.language,
      }));

      break;
    case "starships":
      finalResult = dataObj.data.results.map((item: any) => ({
        name: item.name,
        model: item.model,
        starship_class: item.starship_class,
        hyperdrive_rating: item.hyperdrive_rating,
        max_atmosphering_speed: item.max_atmosphering_speed,
        passengers: item.passengers,
      }));

      break;
    case "planets":
      finalResult = dataObj.data.results.map((item: any) => ({
        name: item.name,
        population: item.population,
        climate: item.climate,
        gravity: item.gravity,
        terrain: item.terrain,
      }));

      break;
    case "vehicles":
      finalResult = dataObj.data.results.map((item: any) => ({
        name: item.name,
        model: item.model,
        max_atmosphering_speed: item.max_atmosphering_speed,
        passengers: item.passengers,
        manufacturer: item.manufacturer,
      }));

      break;
    default:
      finalResult = dataObj.data.results.map((item: any) => ({
        name: item.name,
        height: item.height,
        hairColor: item.hair_color,
        birthYear: item.birth_year,
        mass: item.mass,
      }));
  }

  return finalResult;
};

export default filterData;
