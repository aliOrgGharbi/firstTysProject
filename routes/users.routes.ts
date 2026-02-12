import { Router } from "express";
import { patchUser, findAll, createUser, findById, updateUser, deleteUser, User } from "../service/user.service";
import { validateUserInput, validateUserId } from "../validators/users.validators";

const router = Router();

router.get("/", (req, res) => {
    findAll()
        .then((result) => res.status(200).json(result))
        .catch((err) => {
            res.status(500).send("Error fetching users");
        });
});
router.get("/:id", validateUserId, (req, res) => {
    const id = req.params.id as string;

    findById(id)
        .then((user) => {
            if (!user) return res.status(404).send("User not found");
            res.status(200).json(user);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send("Invalid ID format or Server Error");
        });
});
router.post("/", validateUserInput, (req, res) => {
    const userData: User = req.body;
    createUser(userData)
        .then((savedUser) => res.status(201).json(savedUser))
        .catch((err) => {
            console.error(err);
            res.status(500).send("Error saving user");
        });
});
router.put("/:id", validateUserId,validateUserInput, (req, res) => {
    const id = req.params.id as string;

    updateUser(id, req.body)
        .then((updatedUser) => {
            if (!updatedUser) return res.status(404).send("User not found");
            res.status(200).json(updatedUser);
        })
        .catch((err) => {
            res.status(500).send("Error updating user");
        });
});
router.patch("/:id", validateUserId, (req, res) => {
    const id = req.params.id as string;
    const dataToUpdate: Partial<User> = req.body;

    patchUser(id, dataToUpdate)
        .then((updatedUser) => {
            if (!updatedUser) return res.status(404).send("User not found");
            res.status(200).json(updatedUser);
        })
        .catch((err) => {
            res.status(500).send("Error patching user");
        });
});
router.delete("/:id", validateUserId, (req, res) => {
    const id = req.params.id as string;

    deleteUser(id)
        .then((deletedUser) => {
            if (!deletedUser) return res.status(404).send("User not found");
            res.status(200).send("User deleted successfully");
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send("Error deleting user");
        });
});

export default router;