import { createContext, useState } from "react";
const UserContext = createContext();


export function ContexProvider({children}){
    const [waddress,setAddress] = useState('');
   
    
    return(
        <UserContext.Provider value={{waddress,setAddress}} >
            {children}
        </UserContext.Provider>
    )
}
export default UserContext;