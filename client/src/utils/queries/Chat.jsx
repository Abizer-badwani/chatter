import { useMutation, useQuery, useQueryClient } from "react-query"
import { getChats } from '../apis/Chats'
import { UseContext } from "../../context/Context"

const GetChatQuery = () => {
    const { setList } = UseContext()

    return useQuery('get-chats', getChats, {
        retry: false,
        onSuccess: (data) => {
            setList(data.chats)
        }
    })
}

const GetChatMutate = () => {
    const queryClient = useQueryClient()
    return useMutation(() => {
        queryClient.invalidateQueries('get-chats')
    })
}


export { GetChatQuery, GetChatMutate }