import { ProblemParams } from "@/contexts/ProblemParams";
import { Individual } from "./individual";

interface AlgorithmInput {
  params: ProblemParams;
  population: Individual[];
}

export function nextPopulation({
  params,
  population,
}: AlgorithmInput): Individual[] {
  let previousPopulation = population;
  if (previousPopulation.length === 0) {
    previousPopulation = [];
    for (let i = 0; i < params.populationSize; i++) {
      const individual = Individual.generate(params.boxes);
      previousPopulation.push(individual);
    }
  }

  previousPopulation.sort((a, b) => {
    return b.getFitness() - a.getFitness();
  });

  // 10% Elitism
  const tenPercent = params.populationSize * 0.1;
  const newPopulation = previousPopulation.slice(0, tenPercent);

  const fiftyPercent = params.populationSize * 0.5;
  const ninetyPercent = params.populationSize * 0.9;

  for (let i = 0; i < ninetyPercent; i++) {
    // Only best 50% of population can mate
    const randomIndex = () => Math.floor(Math.random() * fiftyPercent);

    const parentA = previousPopulation[randomIndex()];
    const parentB = previousPopulation[randomIndex()];

    const child = parentA.mate(parentB);
    newPopulation.push(child);
  }

  return newPopulation;
}
