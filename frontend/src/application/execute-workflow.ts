import axios from "axios";
import { clearData } from "./clear-data";
import { populateData, type User } from "./populate-data";

export async function executeWorkflow(): Promise<User[]> {
  const n8nUrl = process.env.N8N_URL;
  if (!n8nUrl) {
    throw new Error("N8N_URL environment variable is not set");
  }
  await clearData();
  await populateData();
  
  // Get users from N8N, because the populateData is from API and the requirement is to get the users from N8N
  try {
    const response = await axios.get<{ users: User[] }>(`${n8nUrl}/webhook/users`);
    if (!response.data?.users) {
      return [];
    }
    return [...response.data.users];
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const statusText = error.response?.statusText ?? error.message ?? "Unknown error";
      throw new Error(`Failed to execute workflow: ${statusText}`);
    }
    if (error instanceof Error) {
      throw new Error(`Failed to execute workflow: ${error.message}`);
    }
    throw new Error("Failed to execute workflow: Unknown error");
  }
}
