import express, { Request, Response } from "express"

const app = express()
const port = process.env.PORT || 3000

app.get("/hello", (_req: Request, res: Response) => {
  res.json({
    message: "Hello Word"
  }
  )
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
