const filterType = (dataObj: any, type: string): any => {
  let finalResult: object = {};

  switch (type) {
    case "people":
      finalResult = {
        name: dataObj.name,
        height: dataObj.height,
        hairColor: dataObj.hair_color,
        birthYear: dataObj.birth_year,
        mass: dataObj.mass,
        skinColor: dataObj.skin_color,
        eyeColor: dataObj.eye_color,
      };

      break;
    case "films":
      finalResult = {
        name: dataObj.title,
        director: dataObj.director,
        producer: dataObj.producer,
        release_date: dataObj.release_date,
      };

      break;
    case "species":
      finalResult = {
        name: dataObj.name,
        classification: dataObj.classification,
        designation: dataObj.designation,
        averageHeight: dataObj.average_height,
        averageLifespan: dataObj.average_lifespan,
        skinColor: dataObj.skin_colors,
        eyeColor: dataObj.eye_colors,
        language: dataObj.language,
      };

      break;
    case "starships":
      finalResult = {
        name: dataObj.name,
        model: dataObj.model,
        manufacturer: dataObj.manufacturer,
        costInCredits: dataObj.cost_in_credits,
        maxAtmospheringSpeed: dataObj.max_atmosphering_speed,
        crew: dataObj.crew,
        passengers: dataObj.passengers,
        hyperdriveRating: dataObj.hyperdrive_rating,
        starshipClass: dataObj.starship_class,
      };

      break;
    case "planets":
      finalResult = {
        name: dataObj.name,
        rotationPeriod: dataObj.rotation_period,
        orbitalPeriod: dataObj.orbital_period,
        diameter: dataObj.diameter,
        climate: dataObj.climate,
        gravity: dataObj.gravity,
        terrain: dataObj.terrain,
        surfaceWater: dataObj.surface_water,
        population: dataObj.population,
      };

      break;
    case "vehicles":
      finalResult = {
        name: dataObj.name,
        model: dataObj.model,
        manufacturer: dataObj.manufacturer,
        costInCredits: dataObj.cost_in_credits,
        length: dataObj.length,
        maxAtmospheringSpeed: dataObj.max_atmosphering_speed,
        crew: dataObj.crew,
        passengers: dataObj.passengers,
        cargoCapacity: dataObj.cargo_capacity,
        consumables: dataObj.consumables,
        vehicleClass: dataObj.vehicle_class,
      };

      break;
    default:
      finalResult = {
        name: dataObj.name,
        height: dataObj.height,
        hairColor: dataObj.hair_color,
        birthYear: dataObj.birth_year,
        mass: dataObj.mass,
        skinColor: dataObj.skin_color,
        eyeColor: dataObj.eye_color,
      };
  }

  return finalResult;
};

export default filterType;
