//url-api
const HOST_API = "http://192.168.0.105:8081/api"
let uri = ""

export const useCrud = () => {

    const customFetch = async(options,cb)  => {
        const opts = {
            headers: {
                'Content-Type': 'application/json'
            },
            method: options.method,
        }

        if(options.query !== "GET") opts.body = JSON.stringify(options.payload)


        ;(options.param)
            ? uri = `${HOST_API}/${options.query}/${options.param}`
            : uri = `${HOST_API}/${options.query}`;


        try {
            const resp = await fetch(uri, opts)
            const data = await resp.json()

            cb(null, data)
        }
        catch(e) {
            cb("Something went wrong!",[])
        }
    }

    const get = (options, cb) => {
        options.method = "GET"
        return customFetch(options, cb)
    }
    const post = (options, cb) => {
        options.method = "POST"
        return customFetch(options, cb)
    }
    const remove = (options, cb) => {
        options.method = "DELETE"
        return customFetch(options,cb)
    }
    const udpate = (options, cb) => {
        options.method = "PUT"
        return customFetch(options,cb)
    }

    // const callApi = useCallback(() => customFetch(),[optionReq])

    return { get, post, remove, udpate }
}