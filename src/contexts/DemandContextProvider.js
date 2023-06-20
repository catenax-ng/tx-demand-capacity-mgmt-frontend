import { createContext, useEffect, useState, useCallback } from 'react';
import axios from 'axios';

export const DemandContext = createContext();

const DemandContextProvider = (props) => {
    const api = axios.create({
        baseURL: 'http://localhost:8080', // Set the new port here
    });

    const [demands, setDemands] = useState([]);

    const fetchData = useCallback(async () => {
        try {
            const response = await api.get('/demand', {
                params: {
                    project_id: 1,
                },
            });
            const result = response.data;
            setDemands(result);
        } catch (error) {
            // Handle the error
        }
    }, [api]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    useEffect(() => {
        demands.sort((a, b) => (a.name < b.name ? -1 : 1));
    }, [demands]);

    const deleteDemand = async (id) => {
        try {
            await api.delete('/demand/' + id);
            setDemands((prevDemands) => prevDemands.filter((demand) => demand.id !== id));
        } catch (error) {
            // Handle the error
        }
    };

    const createDemand = async (newDemand) => {
        try {
            const response = await api.post('/demand', newDemand);
            const createdDemand = response.data;
            setDemands((prevDemands) => [...prevDemands, createdDemand]);
        } catch (error) {
            // Handle the error
        }
    };

    const updateDemand = async (updatedDemand) => {
        try {
            console.log(updatedDemand);
            const response = await api.put(`/demand/${updatedDemand.id}`, updatedDemand);

            const modifiedDemand = response.data;
            setDemands((prevDemands) =>
                prevDemands.map((demand) => (demand.id === modifiedDemand.id ? modifiedDemand : demand))
            );
        } catch (error) {
            // Handle the error
        }
    };

    return (
        <DemandContext.Provider value={{ demands, deleteDemand, createDemand, updateDemand }}>
            {props.children}
        </DemandContext.Provider>
    );
};

export default DemandContextProvider;
