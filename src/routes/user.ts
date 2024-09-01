import { Router } from "express";
import { createUser, getUsers } from "../controllers/user";

const userRoutes = Router()

userRoutes.post('/', createUser)
userRoutes.get('/', getUsers)

export default userRoutes
