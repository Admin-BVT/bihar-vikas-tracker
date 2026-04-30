export interface Project {
  id: string;
  name: string;
  district: string;
  block?: string;
  districtCode: string;
  category: string;
  status: 'Completed' | 'Ongoing' | 'Delayed';
  budget: number;
  spent: number;
  startDate: string;
  endDate: string;
  description: string;
  department: string;
  contractor?: string;
  beneficiaries?: number;
  verified: boolean;
  lastUpdated: string;
}

export interface District {
  code: string;
  name: string;
  headquarters: string;
  population: number;
  area: number;
  projects: number;
  totalBudget: number;
}

export type StatusType = 'Completed' | 'Ongoing' | 'Delayed';
