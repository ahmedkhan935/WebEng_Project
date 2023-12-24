import React, { createContext, useState } from 'react';

export const ClassroomContext = createContext();

// Create a context provider
export const ClassroomProvider = ({ children }) => {
    const [classroomAnnouncements, setClassroomAnnouncements] = useState([]);

    return (
        <ClassroomContext.Provider value={{ classroomAnnouncements, setClassroomAnnouncements }}>
            {children}
        </ClassroomContext.Provider>
    );
};