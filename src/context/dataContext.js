import { createContext, useState, useEffect } from 'react';


const DataContext = createContext({});

export const DataProvider = ({ children }) => {
    const [loggedIn, setloggedIn] = useState(false)
    
    
    
    return (
        <DataContext.Provider value={{
            loggedIn, setloggedIn
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;