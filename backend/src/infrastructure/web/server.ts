import { config } from "../config/env"
import express, { Request, Response } from "express"
import { PopulateUsers } from "../../application/use-cases/populate-users";
import { UserSourceFromApi } from "../user-repository/user-source";
import { UserTargetToN8N } from "../user-repository/user-target";

const app = express()
const port = config.PORT

const populateUsers = new PopulateUsers(
  new UserSourceFromApi(),
  new UserTargetToN8N(),
);

app.get("/users", async (_req: Request, res: Response) => {
  try {
    const result = await populateUsers.execute();
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, errorMessage: "Internal server error" });
  }
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
