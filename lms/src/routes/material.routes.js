import express from "express";
import MaterialController from "../controllers/material.controller.js";
import MaterialRepository from "../repositories/material.repository.js";
import MaterialService from "../services/material.service.js";

const router = express.Router();

const materialRepository = new MaterialRepository();
const materialService = new MaterialService(materialRepository);
const materialController = new MaterialController(materialService);

router.get(
  "/materialsForCourse/:courseId",
  materialController.getAllMaterials.bind(materialController)
);
router.get("/:id", materialController.getMaterialById.bind(materialController));
router.post("/", materialController.createMaterial.bind(materialController));
router.put("/:id", materialController.updateMaterial.bind(materialController));

router.get(
  "/:id/user_material",
  materialController.getUserMaterialByMaterialId.bind(materialController)
);

router.put(
  "/:id/progress",
  materialController.updateMaterialProgress.bind(materialController)
);
router.delete(
  "/:id",
  materialController.deleteMaterial.bind(materialController)
);

export default router;
