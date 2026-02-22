export interface Project {
  id: string
  name: string
  district: string
  category: string
  status: 'Completed' | 'Ongoing' | 'Delayed'
  budget: number
  spent: number
  startDate: string
  endDate: string
  description: string
  department: string
  verified: boolean
}

export interface District {
  code: string
  name: string
  projects: number
}
