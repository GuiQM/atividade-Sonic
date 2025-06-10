import { Router } from "express";
import { UserController } from "../controller/UserController"

const router: Router = Router();
const controller = new UserController()

router.post('/usuarios', controller.register);
router.get('/usuarios/:id', controller.getAll);
router.put('/usuarios/:id', controller.update);
router.delete('/usuarios/:id', controller.delete);

export default router;

