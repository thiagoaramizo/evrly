import axios from "axios";

export async function clearData(): Promise<{ success: boolean }> {
  const n8nUrl = process.env.N8N_URL;
  if (!n8nUrl) {
    throw new Error("N8N_URL environment variable is not set");
  }
  try {
    await axios.delete(`${n8nUrl}/webhook/users`);
    return { success: true }
  } catch {
    return { success: false }
  }
}
