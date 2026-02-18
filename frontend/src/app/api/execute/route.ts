import { executeWorkflow } from "@/src/application/execute-workflow"

export async function POST() {
  const users = await executeWorkflow()
  return Response.json(users)
}