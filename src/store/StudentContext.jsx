import React, { createContext, useState, useEffect } from "react";

export const StudentContext = createContext();


 const StudentProvider = ({children}) => {
    const [students,setStudents] = useState([]);

    useEffect(()=>{
        const storeStudents = localStorage.getItem("students");
        if(storeStudents){
          try{
            const parsed  = JSON.parse(storeStudents)
            if(Array.isArray(parsed)){
              setStudents(parsed);
            }else{
              setStudents([])
            }
          }catch(e){
            setStudents([]);
          }
            
        }
    },[]);

    useEffect(() => {
      
         localStorage.setItem("students", JSON.stringify(students));
      
    }, [students])
    
    const addStudent = (student)=>{
     
      setStudents((prev) => [...prev, { id: Date.now(), ...student }]);
    }

    const removeStudent = (id) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
  };
    const updateStudent = (id, updatedData) => {
      setStudents((prev) =>
        prev.map((s) => (s.id === id ? { ...s, ...updatedData } : s))
      );
    };

  return (
    <StudentContext.Provider value={{students,setStudents, addStudent, removeStudent, updateStudent}}>
      {children}
    </StudentContext.Provider>
  );
}
export default StudentProvider;