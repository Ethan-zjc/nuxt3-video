/** @format */

type FetchType = typeof $fetch;
export type FetchOptions = Parameters<FetchType>[1];

export const useClientRequest = <T = unknown>(
    url: string,
    opts?: FetchOptions
) => {
    const token = useToken();
    const runtimeConfig = useRuntimeConfig();

    const defaultOptions: FetchOptions = {
        baseURL: runtimeConfig.public.baseUrl,
        onRequest({ options }) {
            options.headers = (options.headers || {}) as {
                [key: string]: string;
            };
            if (token.value) {
                options.headers.Authorization = token.value;
            }
        },
        onResponse({ response }) {
            if (+response.status === 200 && +response._data.code !== 200) {
                ElMessage.error(response._data.msg);
            }
        },
        onResponseError({ response }) {
            ElMessage.error(
                isArray(response._data.msg)
                    ? response._data.msg[0]
                    : response._data.msg
            );
        },
    };

    return $fetch<T>(url, { ...defaultOptions, ...opts });
};
