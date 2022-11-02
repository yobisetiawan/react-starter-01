
import { atomsWithQuery } from "jotai-tanstack-query"
import { API } from "../configs/api"

export const [SampleCollectionAtom] = atomsWithQuery(() => ({
    queryKey: ['sample-collection'],
    staleTime: Infinity,
    queryFn: async () => {
        const res = await API.exampleSampleList({})
        return res.data?.data ?? [];
    },
}))
