import 'reflect-metadata';
export interface RequestConfig {
    headers: object;
}
export declare class HttpService {
    private readonly http;
    get<T>(url: string, endpoint: string, config?: RequestConfig): Promise<T>;
    head<T>(url: string, endpoint: string, config?: RequestConfig): Promise<T>;
    post<T, R>(url: string, endpoint: string, data: T, config?: RequestConfig): Promise<R>;
    private handleError;
}
