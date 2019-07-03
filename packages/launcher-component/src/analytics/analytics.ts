export interface Analytics {
    init();
    pageview(path: string);
    event(name: string, action: string, label?: string, value?: number, params?: object);
}
