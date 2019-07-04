export interface Analytics {
    init();
    pageview(path: string);
    event(category: string, action: string, label?: string, value?: number, params?: object);
}
