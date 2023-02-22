import useAuth from "../hooks/useAuth";
import useAuthPrivateAxios from "../hooks/useAuthPrivateAxios"

export default function useUser() {

    const { setUser } = useAuth()
    const authPrivate = useAuthPrivateAxios()

    async function getUser() {
        try {
            const { data } = await authPrivate.get('auth/user')

            setUser(data)
        } catch (error) {
            // console.log(error.response)
        }
    }

    return getUser
}