import { createContext, useState } from "react";
import axios from '../api/axios';

const USER_URL = '/lecturer/get';
const UserContext = createContext({});

export const UserProvider = ({ children }) => {
    const [ firstName, setFirstName] = useState('');
    const [ lastName, setLastName] = useState('');

    const getLecturer = async () => {
        try {
            const response = await axios.get(USER_URL, {
                withCredentials: true
            });
            const lecturer = response.data;
            setFirstName(lecturer.firstName);
            setLastName(lecturer.lastName);

        } catch (err) {
            console.error(err);
        }
    }

    getLecturer();

    return (
        <UserContext.Provider value={{ 
            firstName: [firstName, setFirstName],
            lastName: [lastName, setLastName],
        }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext;