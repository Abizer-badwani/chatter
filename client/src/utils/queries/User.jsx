import { useMutation, useQuery, useQueryClient } from "react-query"
import { getProfile } from "../apis/User"

const ProfileQuery = (onSuccess) => useQuery('get-profile', getProfile, {retry: false, onSuccess})

const ProfileMutate = () => {
    const queryClient = useQueryClient()
    return useMutation(() => {
        queryClient.invalidateQueries('get-profile')
    })
}

export {ProfileQuery, ProfileMutate}