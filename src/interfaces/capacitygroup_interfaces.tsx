export interface CapacityGroup {
    id: number;
    product: string;
    companyId: string;
    requiredValue: number;
    deliveredValue: number;
    maximumValue: number;
    category: string;
    description: string;
    startDate: string;
    endDate: string;
    [key: string]: any;
  }