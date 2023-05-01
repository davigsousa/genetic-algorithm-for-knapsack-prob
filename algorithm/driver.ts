import { ProblemParams } from "@/contexts/ProblemParams";
import { Individual } from "./individual";

interface AlgorithmInput {
  params: ProblemParams;
  population?: Individual[];
}

export function executeAlgorithm({
  params,
  population,
}: AlgorithmInput): Individual[] {
  return population || [];
}
