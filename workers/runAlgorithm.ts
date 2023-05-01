import { nextPopulation } from "@/algorithm/driver";
import { Individual } from "@/algorithm/individual";
import { ProblemParams } from "@/contexts/ProblemParams";
import { Actions } from "./actions";

const LOG_ON_GENERATION = 1000;
let shouldRunAlgorithm = false;

async function executeAlgorithm(
  params: ProblemParams,
  population: Individual[]
) {
  if (shouldRunAlgorithm) {
    return;
  }

  let current = population;
  let generation = 1;

  shouldRunAlgorithm = true;
  while (shouldRunAlgorithm) {
    current = nextPopulation({ params, population });

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
    case Actions.STOP_ALGORITHM:
      shouldRunAlgorithm = false;
      break;
  }
});
