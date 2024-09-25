import { Blob } from "buffer"

class HttpClient {
	private baseUrl: string
	constructor(baseUrl: string) {
		this.baseUrl = baseUrl
	}

	private async request<T>(
		endpoint: string,
		method: RequestInit["method"],
		nextConfig?: NextFetchRequestConfig,
		body?: Record<string, any> | string,
	) {
		let url = `${this.baseUrl}/${endpoint}`
		const config = { method, next: nextConfig }
		const response = await fetch(url, { ...config, ...(body && { body: JSON.stringify(body) }) })
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

	post<T>(url: string, nextConfig?: NextFetchRequestConfig, body: Record<string, any> | string = {}) {
		console.warn(`POST ${url}`)
		return this.request<T>(url, "POST", nextConfig, body)
	}

	delete<T>(url: string, nextConfig?: NextFetchRequestConfig, body: Record<string, any> | string = {}) {
		console.warn(`DELETE ${url}`)
		return this.request<T>(url, "DELETE", nextConfig)
	}
}

export const api = new HttpClient(process.env.NEXT_API_URL || "http://localhost:3000/api")
