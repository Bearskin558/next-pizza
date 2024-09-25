import { Blob } from "buffer"

class HttpClient {
	private baseUrl: string
	constructor(baseUrl: string) {
		this.baseUrl = baseUrl
	}

	private async request<T>(
		endpoint: string,
		method: RequestInit["method"],
		config?: RequestInit,
		body?: Record<string, any> | string,
	) {
		let url = `${this.baseUrl}/${endpoint}`

		const response = await fetch(url, {
			method,
			...config,
			...(body && { body: JSON.stringify(body) }),
		})
		return {
			success: response.ok,
			status: response.status,
			statusText: response.statusText,
			data: (await response.json()) as T,
		}
	}

	get<T>(url: string, config?: RequestInit) {
		// console.warn(`GET ${url}`)
		return this.request<T>(url, "GET", config)
	}

	post<T>(url: string, config?: RequestInit, body: Record<string, any> | string = {}) {
		// console.warn(`POST ${url}`)
		return this.request<T>(url, "POST", config, body)
	}

	patch<T>(url: string, config?: RequestInit, body: Record<string, any> | string = {}) {
		// console.warn(`PATCH ${url}`)
		return this.request<T>(url, "PATCH", config, body)
	}

	delete<T>(url: string, config?: RequestInit, body: Record<string, any> | string = {}) {
		// console.warn(`DELETE ${url}`)
		return this.request<T>(url, "DELETE", config)
	}
}

export const api = new HttpClient(process.env.NEXT_API_URL || "http://localhost:3000/api")
