const baseUrl = ""

interface FetchOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'; // 请求方法
  headers?: Record<string, string>;           // 请求头
  body?: Record<string, any> | string;        // 请求参数
  mode?: string
}


async function request(url: string, options: FetchOptions = {}): Promise<any> {
  const { method = 'GET', headers = {}, body } = options;
  const fetchOptions: RequestInit = {
    method,
    headers,
    mode: 'cors',
    body: body && JSON.stringify(body),
  };
  try {
    const response = await fetch(url, fetchOptions);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(`请求 ${url} 失败:`, error);
    return Promise.reject(error);
  }
}

export async function GET(url: string, params?: Record<string, any>, options?: FetchOptions): Promise<any> {
  let defaultParams = {
    c: 'WallPaper',
    from: '360chrome',
  }
  const reqParams: any = params ? { ...defaultParams, ...params } : defaultParams
  const queryString = Object.keys(reqParams).map((key) => `${key}=${reqParams[key]}`).join('&');
  const fetchUrl = queryString ? `${url}?${queryString}` : url;
  return request(fetchUrl, { ...options, method: 'GET' });
}

export async function POST(url: string, data: Record<string, any> | string, options?: FetchOptions): Promise<any> {
  return request(url, { ...options, method: 'POST', body: data });
}