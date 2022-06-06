type Config<T> = Partial<{
  headers: { [key: string]: string };
  body: T;
}>;

export class ApiClientService {
  private readonly baseUrl = "http://localhost:8080";

  constructor() {
    this.request = this.request.bind(this);
  }

  async request<R, T = any>(
    method: string,
    endpoint: string,
    config: Config<T>
  ) {
    try {
      const response = await fetch(this.baseUrl.concat(endpoint), {
        method,
        headers: config.headers,
        body: config.body ? JSON.stringify(config.body) : undefined,
      });

      if (response.status === 200 || response.status === 201) {
        return [(await response.json()) as R, null] as const;
      }

      throw new Error("request failed");
    } catch (error) {
      return [null, error] as const;
    }
  }

  async get<R, T extends Record<string, string>>(endpoint: string, params?: T) {
    const newEndpoint = !params
      ? endpoint
      : endpoint.concat("?" + new URLSearchParams(params).toString());

    return this.request<R>("GET", newEndpoint, {});
  }

  async post<R, T>(endpoint: string, body: T) {
    return this.request<R, T>("POST", endpoint, {
      body,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

export const apiClientService = new ApiClientService();
