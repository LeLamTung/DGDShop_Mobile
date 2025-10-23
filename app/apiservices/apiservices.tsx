import axios, { AxiosError, AxiosInstance } from "axios";

// Kiểu response chung
interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  status: number;
}

class ApiService {
  private client: AxiosInstance;

  constructor(baseUrl: string) {
    this.client = axios.create({
      baseURL: baseUrl,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  // GET
  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.get<T>(endpoint);
      return { data: response.data, error: null, status: response.status };
    } catch (err) {
      return this.handleError<T>(err);
    }
  }

  // POST
  async post<T>(endpoint: string, data?: unknown): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.post<T>(endpoint, data);
      return { data: response.data, error: null, status: response.status };
    } catch (err) {
      return this.handleError<T>(err);
    }
  }

  // PUT
  async put<T>(endpoint: string, data?: unknown): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.put<T>(endpoint, data);
      return { data: response.data, error: null, status: response.status };
    } catch (err) {
      return this.handleError<T>(err);
    }
  }

  // DELETE
  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.delete<T>(endpoint);
      return { data: response.data, error: null, status: response.status };
    } catch (err) {
      return this.handleError<T>(err);
    }
  }

  // Xử lý lỗi chung
  private handleError<T>(err: unknown): ApiResponse<T> {
    if (axios.isAxiosError(err)) {
      const axiosErr = err as AxiosError<any>;
      return {
        data: null,
        error: axiosErr.response?.data?.message || axiosErr.message,
        status: axiosErr.response?.status || 500,
      };
    }
    return { data: null, error: "Unknown error", status: 500 };
  }
}

// Khởi tạo instance
const apiService = new ApiService(
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://10.0.2.2:5000/api"
);

export default apiService;
