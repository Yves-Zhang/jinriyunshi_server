import axios, { AxiosResponse } from 'axios';

export interface Response<T = any> {
    data: T
    message: string | null
    code: number
}

export interface HttpOption {
    url: string
    data?: any
    method?: string
    headers?: any
    responseType?: 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream',
    validate?: boolean
}

const service: any = axios.create({
    // baseURL: process.env.HTTP_BASE_URL,
})

service.interceptors.response.use(
    (response: AxiosResponse<any>) => {
        if (response.status === 200) return response
        throw new Error(response.status.toString())
    },
    (error: any) => {
        return Promise.reject(error);
    }
);

function http<T = any>({ url, data, method, headers, validate }: HttpOption) {
    method = method || 'GET'
    const params = Object.assign(typeof data === 'function' ? data() : data ?? {}, {})
    const CustomHeaders = { ...headers }

    return method === 'GET'
        ? service.get(url, { params }).then(successHandler<T>(validate), failHandler)
        : service[method.toLocaleLowerCase()](url, params, { headers: { ...CustomHeaders } }).then(successHandler<T>(validate), failHandler)
}

function successHandler<T>(validate: boolean | undefined) {
    return (res: AxiosResponse<Response<T>>) => {
        if (!validate) return res.data
        if (res.data.code === 0) return res.data

        return Promise.reject(res.data)
    }
}

function failHandler(error: Response<Error>) {
    throw new Error(error?.message || 'Error')
}

export function get<T = any>({ url, data, method = 'GET', validate = true }: HttpOption): Promise<Response<T>> {
    return http<T>({ url, method, data, validate })
}

export function post<T = any>({ url, data, method = 'POST', headers }: HttpOption): Promise<Response<T>> {
    return http<T>({ url, method, data, headers })
}

export default post
