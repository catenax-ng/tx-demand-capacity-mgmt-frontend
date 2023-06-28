// DemandContextProvider.tsx
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export interface Demand {
  id: number;
  product: string;
  companyId: string;
  requiredValue: number;
  deliveredValue: number;
  maximumValue: number;
  demandCategory: string;
  description: string;
  startDate: string;
  endDate: string;
  [key: string]: any;
}

interface DemandContextData {
  demands: Demand[];
  deleteDemand: (id: number) => Promise<void>;
  createDemand: (newDemand: Demand) => Promise<void>;
  updateDemand: (updatedDemand: Demand) => Promise<void>;
}

export const DemandContext = createContext<DemandContextData | undefined>(undefined);

const DemandContextProvider: React.FC<React.PropsWithChildren<{}>> = (props) => {
  const api = axios.create({
    baseURL: 'http://localhost:8080', // Set the correct API URL here
  });

  const [demands, setDemands] = useState<Demand[]>([]);

  useEffect(() => {
    const fetchDemands = async () => {
      try {
        const response = await api.get('/demand', {
          params: {
            project_id: 1, // Adjust the project ID parameter as needed
          },
        });
        const result: Demand[] = response.data;
        setDemands(result);
      } catch (error) {
        console.error('Error fetching demands:', error);
      }
    };
  
    fetchDemands();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  

  const deleteDemand = async (id: number) => {
    try {
      await api.delete(`/demand/${id}`);
      setDemands((prevDemands) => prevDemands.filter((demand) => demand.id !== id));
    } catch (error) {
      console.error('Error deleting demand:', error);
    }
  };

  const createDemand = async (newDemand: Demand) => {
    try {
      const response = await api.post('/demand', newDemand);
      const createdDemand: Demand = response.data;
      setDemands((prevDemands) => [...prevDemands, createdDemand]);
    } catch (error) {
      console.error('Error creating demand:', error);
    }
  };

  const updateDemand = async (updatedDemand: Demand) => {
    try {
      const response = await api.put(`/demand/${updatedDemand.id}`, updatedDemand);
      const modifiedDemand: Demand = response.data;
      setDemands((prevDemands) =>
        prevDemands.map((demand) => (demand.id === modifiedDemand.id ? modifiedDemand : demand))
      );
    } catch (error) {
      console.error('Error updating demand:', error);
    }
  };

  return (
    <DemandContext.Provider value={{ demands, deleteDemand, createDemand, updateDemand }}>
      {props.children}
    </DemandContext.Provider>
  );
};

export default DemandContextProvider;
