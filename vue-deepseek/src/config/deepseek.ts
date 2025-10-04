// deepseek配置文件
export const API_CONFIG = {
    baseURL: 'https://api.siliconflow.cn/v1',
    apiKey: 'sk-waztexnrgtmazrmgyofuwyigwmqaquswqpvqliqggafsreth',
    dangerouslyAllowBrowser: true,
}


//模型配置
export const MODEL_CONFIG = {
    temperature: 0.6,
    max_tokens: 8192,
    stream: true,
}

//本地存储键名配置
export const STORAGE_KEY = {
    sessionList: 'xueden_list',
    activeIndex: 'xueden_index'
}