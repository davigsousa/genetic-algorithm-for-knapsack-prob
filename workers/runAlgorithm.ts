import { nextPopulation } from "@/algorithm/driver";
import { Individual } from "@/algorithm/individual";
import { ProblemParams } from "@/contexts/ProblemParams";
import { Actions } from "./actions";

export const LOG_ON_GENERATION = 10;

async function executeAlgorithm(
  params: ProblemParams,
  population: Individual[]
) {
  let current = population;
  let generation = 1;

  while (true) {
    current = nextPopulation({ params, population: current });

    generation += 1;
    if (generation % LOG_ON_GENERATION === 0) {
      postMessage({
        action: Actions.UPDATE_SOLUTION,
        payload: {
          generation,
          population: current,
        },
      });
    }
  }
}

addEventListener("message", (event) => {
  const { data } = event;
  const { action, payload } = data;

  switch (action) {
    case Actions.START_ALGORITHM:
      executeAlgorithm(payload.params, payload.population);
      break;
  }
});
