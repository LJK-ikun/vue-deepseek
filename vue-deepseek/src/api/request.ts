import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

const service = axios.create({

    //设置请求超时时间ms
    timeout: 120000,
    // 设置请求头信息
    headers: {
        //指定发送的数据类型
        'Content-Type': 'application/json;charset=UTF-8'
    }
})

// 设置请求拦截器
service.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        //在请求发送之前，添加请求头
        const token = config.params?.gptToken || config.data?.gptToken;
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`
        }
        //普通接口
        if (sessionStorage.getItem('tokne')) {
            const token = sessionStorage.getItem('token')
        }
        return config
    },
    (error: AxiosError) => {
        return Promise.reject(error)
    }
)

//相应拦截器
service.interceptors.response.use(
    (response: AxiosResponse) => {
        // 对响应数据做点什么
        return response.data
    },
    //处理响应错误的回调函数
    (error: AxiosError) => {
        if (error.response) {
            //检查请求状态码是否为0
            if (error.response.status === 0) {
                //这样写的理由是比较用户友好
                error.message = "网络错误,请稍后再试"
            }

            return Promise.reject(error)
        }
    }
)
export default service;