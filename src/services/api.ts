/**
 * Base HTTP Client & Interceptor for Beruang B2B API
 */

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://api.beruang.example.com/v1";

export class ApiError extends Error {
  status: number;
  data?: any;

  constructor(message: string, status: number, data?: any) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

export async function apiClient<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem("beruang_auth_token");

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let errorMessage = `HTTP Error ${response.status}: ${response.statusText}`;
    let errorData;
    try {
      errorData = await response.json();
      if (errorData?.message) {
        errorMessage = errorData.message;
      }
    } catch {
      // Body bukan JSON
    }
    throw new ApiError(errorMessage, response.status, errorData);
  }

  return response.json();
}
