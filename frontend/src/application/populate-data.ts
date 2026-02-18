import axios from "axios";

export type User = {
  id: number
  nome: string
  email: string
  phone: string
}

export async function populateData(): Promise<void> {

  const apiUrl = process.env.API_URL;
  if (!apiUrl) {
    throw new Error("API_URL environment variable is not set");
  }

  try {
    const response = await axios.post<{ success: boolean; errorMessage?: string }>(`${apiUrl}/users`);
    if (!response.data.success) {
      throw new Error(response.data.errorMessage ?? "Unknown error");
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const statusText = error.response?.statusText ?? error.message ?? "Unknown error";
      throw new Error(`Failed to populate data: ${statusText}`);
    }
    if (error instanceof Error) {
      throw new Error(`Failed to populate data: ${error.message}`);
    }
    throw new Error("Failed to populate data: Unknown error");
  }
}
