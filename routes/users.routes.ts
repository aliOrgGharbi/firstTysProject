import { Router } from "express";
import {
  patchUser,
  findAll,
  createUser,
  findById,
  updateUser,
  deleteUser,
  User,
} from "../service/user.service";
import {
  validateUserInput,
  validateUserId,
} from "../validators/users.validators";

import {
  mapToUserResponse,
  mapToUsersListResponse,
} from "./mappers/users.mappers";

const router = Router();

router.get("/", (req, res) => {
  findAll()
    .then((users) => res.status(200).json(mapToUsersListResponse(users)))
    .catch((err) => res.status(500).send("Error fetching users"));
});

router.get("/:id", validateUserId, (req, res) => {
  const id = req.params.id as string;
  findById(id)
    .then((user) => {
      if (!user) return res.status(404).send("User not found");
      res.status(200).json(mapToUserResponse(user));
    })
    .catch((err) => res.status(500).send("Server Error"));
});

router.post("/", validateUserInput, (req, res) => {
  const userData: User = req.body;
  createUser(userData)
    .then((savedUser) => res.status(201).json(mapToUserResponse(savedUser)))
    .catch((err) => res.status(500).send("Error saving user"));
});

router.put("/:id", validateUserId, validateUserInput, (req, res) => {
  const id = req.params.id as string;
  updateUser(id, req.body)
    .then((updatedUser) => {
      if (!updatedUser) return res.status(404).send("User not found");
      res.status(200).json(mapToUserResponse(updatedUser));
    })
    .catch((err) => res.status(500).send("Error updating user"));
});

router.patch("/:id", validateUserId, (req, res) => {
  const id = req.params.id as string;
  patchUser(id, req.body)
    .then((updatedUser) => {
      if (!updatedUser) return res.status(404).send("User not found");
      res.status(200).json(mapToUserResponse(updatedUser));
    })
    .catch((err) => res.status(500).send("Error patching user"));
});

router.delete("/:id", validateUserId, (req, res) => {
  const id = req.params.id as string;
  deleteUser(id)
    .then((deletedUser) => {
      if (!deletedUser) return res.status(404).send("User not found");
      res.status(200).send("User deleted successfully");
    })
    .catch((err) => res.status(500).send("Error deleting user"));
});

export default router;
