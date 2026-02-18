import { clearData } from "@/src/application/clear-data"

export async function POST() {
  return Response.json(await clearData())

}