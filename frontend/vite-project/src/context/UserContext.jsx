import React from "react";

//named export for this context (to be used via useContext elsewhere)
export const UserContext = React.createContext();

//the provider component wrapper for this context. uses its own state to keep track of the current username
//use it in a top level component such as App.jsx like <UserProvider>...</UserProvider>
//all child components in the ... above will receive the data values from line 13
export const UserProvider = (props) => {
    const [username, setUsername] = React.useState(''); //default username

    return (
        <UserContext.Provider value={{username, setUsername}}>
            {props.children}
        </UserContext.Provider>
    );
}