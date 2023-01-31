import useAuth from "../hooks/useAuth"
import { authPrivateAxios } from "../api/axiosDefaults";

export default function useLogout() {
    const { setUser, setAccessToken, setCSRFToken } = useAuth()

    const logout = async () => {
        try {
            const response = await authPrivateAxios.get("auth/logout")

            setAccessToken(null)
            setCSRFToken(null)
            setUser({})

        } catch (error) {
            console.log(error)
        }
    }

    return logout
}