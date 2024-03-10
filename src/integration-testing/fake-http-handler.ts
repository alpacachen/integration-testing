import { fakeResponse } from "./fake-response"

export const fakeHttpHandler = async (...args: Parameters<typeof fetch>) => {
    console.log(args[0])
    const res = {
        json: async () => {
            return { data: fakeResponse[args[0] as string] }
        },
    } as Awaited<ReturnType<typeof fetch>>
    return res
}