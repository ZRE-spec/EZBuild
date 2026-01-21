export interface BuildComponents {
  cpu: string;
  motherboard: string;
  cpuCooler: string;
  ram: string;
  gpu: string;
  storage: string;
  psu: string;
  case: string;
}

export interface BuildStep {
  id: number;
  title: string;
  instruction: string;
  warning?: string;
}

export interface BuildGuide {
  components: BuildComponents;
  steps: BuildStep[];
}
