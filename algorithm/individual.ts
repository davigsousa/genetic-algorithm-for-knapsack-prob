import { Box } from "@/types/problem";

interface Gene extends Box {
  isPresent: boolean;
}
type Chromosome = Gene[];

const randomBool = () => Math.random() < 0.5;

export class Individual {
  chromosome: Chromosome;

  constructor(chromosome: Chromosome) {
    this.chromosome = chromosome;
  }

  static getMutatedGene(box: Box) {
    return {
      ...box,
      isPresent: randomBool(),
    };
  }

  static generateChromosome(boxes: Box[]): Chromosome {
    const genes = [];

    for (const box of boxes) {
      const gene = Individual.getMutatedGene(box);
      genes.push(gene);
    }

    return genes;
  }

  mate(partner: Individual): Individual {
    const chromosome = this.chromosome.map((gene, index) => {
      const shouldMutate = Math.random() < 0.1;
      if (shouldMutate) {
        return Individual.getMutatedGene(gene);
      }

      const partnerGene = partner.chromosome[index];
      const isPresent = randomBool() ? gene.isPresent : partnerGene.isPresent;

      return { ...gene, isPresent };
    });

    return new Individual(chromosome);
  }

  getFitness(): number {
    return this.chromosome.reduce((acc, gene) => {
      if (gene.isPresent) {
        return acc + gene.priceValue;
      }

      return acc;
    }, 0);
  }
}
