// import { createContext, useContext, useEffect, useMemo, useState } from "react";
// import useAxiosPrivate from "../hooks/useAxiosPrivate";

// export const CurrentUserContext = createContext();
// export const SetCurrentUserContext = createContext();

// export const useCurrentUser = () => useContext(CurrentUserContext);
// export const useSetCurrentUser = () => useContext(SetCurrentUserContext);

// export const CurrentUserProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = [];
//   const axiosPrivate = useAxiosPrivate();

//   const handleMount = async () => {
//     try {
//       //const { data } = await axiosPrivate.get("auth/user");
//       //setCurrentUser(data);
//     } catch (err) {
//       // console.log(err);
//     }
//   };

//   useEffect(() => {
//     handleMount();
//   }, []);

//   return (
//     <CurrentUserContext.Provider value={currentUser}>
//       <SetCurrentUserContext.Provider value={setCurrentUser}>
//         {children}
//       </SetCurrentUserContext.Provider>
//     </CurrentUserContext.Provider>
//   );
// };
