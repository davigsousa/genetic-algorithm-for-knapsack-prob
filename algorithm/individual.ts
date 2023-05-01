import { Box } from "@/types/problem";
import { DriverProblemParams } from "./driver";

interface Gene extends Box {
  isPresent: boolean;
}
type Chromosome = Gene[];

const randomBool = () => Math.random() < 0.5;

export class Individual {
  chromosome: Chromosome;
  fitness: number;

  constructor(chromosome: Chromosome) {
    this.chromosome = chromosome;
    this.fitness = this.getFitness();
  }

  static getMutatedGene(box: Box) {
    return {
      ...box,
      isPresent: randomBool(),
    };
  }

  static generateChromosome(params: DriverProblemParams): Chromosome {
    const genes = [];

    let currentWeight = 0;
    let currentArea = 0;

    for (const box of params.boxes) {
      const gene = Individual.getMutatedGene(box);

      gene.isPresent =
        gene.isPresent &&
        !params.exceedsArea(gene, currentArea) &&
        !params.exceedsWeight(gene, currentWeight);

      if (gene.isPresent) {
        currentWeight += gene.weight;
        currentArea += gene.width * gene.height;
      }

      genes.push(gene);
    }

    return genes;
  }

  static generate(params: DriverProblemParams): Individual {
    const chromosome = Individual.generateChromosome(params);
    return new Individual(chromosome);
  }

  mate(partner: Individual, params: DriverProblemParams): Individual {
    let currentWeight = 0;
    let currentArea = 0;

    const chromosome = this.chromosome.map((gene, index) => {
      const shouldMutate = Math.random() < 0.1;
      if (shouldMutate) {
        return Individual.getMutatedGene(gene);
      }

      const partnerGene = partner.chromosome[index];
      let isPresent = randomBool() ? gene.isPresent : partnerGene.isPresent;

      isPresent =
        isPresent &&
        !params.exceedsArea(gene, currentArea) &&
        !params.exceedsWeight(gene, currentWeight);

      if (isPresent) {
        currentWeight += gene.weight;
        currentArea += gene.width * gene.height;
      }

      return { ...gene, isPresent };
    });

    return new Individual(chromosome);
  }

  private getFitness(): number {
    return this.chromosome.reduce((acc, gene) => {
      if (gene.isPresent) {
        return acc + gene.priceValue;
      }

      return acc;
    }, 0);
  }
}
