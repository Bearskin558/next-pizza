class HttpClient {
	private baseUrl: string
	constructor(baseUrl: string) {
		this.baseUrl = baseUrl
	}

	private async request<T>(endpoint: string, method: RequestInit["method"], nextConfig?: NextFetchRequestConfig) {
		let url = `${this.baseUrl}/${endpoint}`
		const config = { method, next: nextConfig }
		const response = await fetch(url, config)
		return {
			success: response.ok,
			status: response.status,
			statusText: response.statusText,
			data: (await response.json()) as T,
		}
	}

	get<T>(url: string, nextConfig?: NextFetchRequestConfig) {
		console.warn(`GET ${url}`)
		return this.request<T>(url, "GET", nextConfig)
	}
}

export const api = new HttpClient(process.env.NEXT_API_URL || "http://localhost:3000/api")
