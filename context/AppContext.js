import {createContext, useContext, useState, useEffect} from "react";
import {getCurrentUser} from "../lib/appwrite";

const AppContext = createContext();

export const AppContextProvider = ({children}) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [user, setUser] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		getCurrentUser()
			.then((res) => {
				if (res) {
					setIsLoggedIn(true);
					setUser(res);
				} else {
					setIsLoggedIn(false);
					setUser(null);
				}
			})
			.catch((err) => {
				console.log(err);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, []);

	return (
		<AppContext.Provider
			value={{
				isLoading,
				setIsLoading,
				user,
				setUser,
				isLoggedIn,
				setIsLoggedIn,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export const useAppContext = () => useContext(AppContext);
