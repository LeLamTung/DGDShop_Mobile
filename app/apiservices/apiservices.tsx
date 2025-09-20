// Định nghĩa kiểu dữ liệu cho response
interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  status: number;
}

// API Service class
class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  // GET request
  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseUrl}${endpoint}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      return {
        data: response.ok ? (data as T) : null,
        error: response.ok ? null : data.message || "GET request failed",
        status: response.status,
      };
    } catch (error) {
      return {
        data: null,
        error: error instanceof Error ? error.message : "Unknown error",
        status: 500,
      };
    }
  }

  // POST request
  async post<T>(endpoint: string, data?: unknown): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseUrl}${endpoint}`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      let dataResponse: any = null;
   
      try {
        dataResponse = await response.json();
      } catch {
        // trường hợp backend trả string, không parse được JSON
        dataResponse = { message: await response.text() };
      }
      return {
        data: response.ok ? dataResponse : null,
        error: response.ok
          ? null
          : dataResponse.message || "POST request failed",
        status: response.status,
      };
    } catch (error) {
      return {
        data: null,
        error: error instanceof Error ? error.message : "Lỗi server",
        status: 500,
      };
    }
  }
}

// Khởi tạo instance của ApiService
const apiService = new ApiService(
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://localhost:44367/api"
 // process.env.NEXT_PUBLIC_API_BASE_URL || "https://localhost:7186/api"
);

export default apiService;
