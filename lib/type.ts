export interface Project {
  id: string;
  name: string;
  district: string;
  districtCode?: string;
  category: string;
  status: 'Ongoing' | 'Completed' | 'Delayed';
  budget: number;
  spent?: number;
  startDate: string;
  endDate: string;
  description: string;
  department?: string;
  contractor?: string;
  beneficiaries: number;
  verified?: boolean;
  lastUpdated: string;
  images?: string;
  videos?: string;
}

export interface District {
  code: string;
  name: string;
  headquarters: string;
  population: number;
  area: number;
  projects: number;
  totalBudget: number;
  completedProjects: number;
  ongoingProjects: number;
  delayedProjects: number;
}
