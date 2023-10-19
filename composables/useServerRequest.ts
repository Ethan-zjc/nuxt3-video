import { useFetch, UseFetchOptions } from "#app";

export const useServerRequest = <T= unknown>(url: string, opts?: UseFetchOptions<T, unknown>) => {
  const token = useToken()
  const runtimeConfig = useRuntimeConfig()

  const defaultOptions: UseFetchOptions<unknown> = {
    baseURL: runtimeConfig.public.baseUrl,
    onRequest({ options }) {
      options.headers = (options.headers || {}) as { [key: string]: string }
      if (token.value) {
        options.headers.Authorization = token.value
      }
    },
    onResponse({ response }) {
      if (+response.status === 200 && +response._data.code !== 200) {
        process.client && ElMessage.error(response._data.msg)
      }
    },
    onResponseError({ response }) {
      process.client && ElMessage.error(isArray(response._data.msg) ? response._data.msg[0] : response._data.msg)
    },
  }

  return useFetch<T>( url, {...defaultOptions, ...opts} as any)
}