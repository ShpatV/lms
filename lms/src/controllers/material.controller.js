import HttpResponse from "../utils/http.response.js";

/**
 * @swagger
 * tags:
 *   name: Materials
 *   description: API endpoints for managing Materials.
 */
export default class MaterialController {
  constructor(materialService) {
    this.materialService = materialService;
  }

  /**
   * @swagger
   * /api/courses/{courseId}/materials:
   *   get:
   *     summary: Get all Materials for a specific course
   *     tags: [Materials]
   *     parameters:
   *       - in: path
   *         name: courseId
   *         schema:
   *           type: integer
   *         required: true
   *         description: ID of the course
   *     responses:
   *       200:
   *         description: OK
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: "#/components/schemas/Material"
   *       500:
   *         description: Internal Server Error
   *       404:
   *         description: Not Found
   */
  async getAllMaterials(req, res) {
    try {
      const courseId = req.params.courseId;
      const materials = await this.materialService.getAllMaterials(courseId);
      console.log(materials);
      return HttpResponse.sendSuccess(res, materials);
    } catch (error) {
      console.error(error.message);
      HttpResponse.sendError(res, error);
    }
  }

  /**
   * @swagger
   * /api/materials/{id}:
   *   get:
   *     summary: Get a specific material by ID
   *     tags: [Materials]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: integer
   *         required: true
   *         description: ID of the material
   *     responses:
   *       200:
   *         description: OK
   *         content:
   *           application/json:
   *             schema:
   *               $ref: "#/components/schemas/Material"
   *       500:
   *         description: Internal Server Error
   *       404:
   *         description: Not Found
   */
  async getMaterialById(req, res) {
    try {
      const materialId = req.params.id;
      if (!Number.isInteger(Number(materialId))) {
        return HttpResponse.sendBadRequest(
          res,
          "The Material ID should be a number."
        );
      }
      const material = await this.materialService.getMaterialById(materialId);
      if (material) {
        HttpResponse.sendSuccess(res, material);
      } else {
        HttpResponse.sendNotFound(res, "Material not found");
      }
    } catch (error) {
      console.error(error.message);
      HttpResponse.sendError(res, error);
    }
  }
  /**
   * @swagger
   * /api/materials/{id}/user_material:
   *   get:
   *     summary: Get user material by material ID
   *     tags: [Materials]
   *     parameters:
   *       - in: path
   *         name: id
   *         description: ID of the material
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: OK
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: "#/components/schemas/UserMaterial"
   *       404:
   *         description: Material not found
   *       500:
   *         description: Internal Server Error
   */
  async getUserMaterialByMaterialId(req, res) {
    try {
      const materialId = req.params.id;
      if (!Number.isInteger(Number(materialId))) {
        return HttpResponse.sendBadRequest(
          res,
          "The Material ID should be a number."
        );
      }
      const userMaterials =
        await this.materialService.getUserMaterialByMaterialId(materialId);
      HttpResponse.sendSuccess(res, userMaterials);
    } catch (error) {
      console.error(error.message);
      HttpResponse.sendError(res, error);
    }
  }

  /**
   * @swagger
   * /api/materials/{id}/progress:
   *   put:
   *     summary: Update the completion status of a material for a specific user
   *     tags: [Materials]
   *     parameters:
   *       - in: path
   *         name: id
   *         description: ID of the material
   *         required: true
   *         schema:
   *           type: integer
   *       - in: body
   *         name: progress
   *         description: Progress data
   *         required: true
   *         schema:
   *           $ref: "#/components/schemas/MaterialProgress"
   *     responses:
   *       200:
   *         description: OK
   *         content:
   *           application/json:
   *             schema:
   *               $ref: "#/components/schemas/MaterialProgress"
   *       404:
   *         description: Material not found
   *       400:
   *         description: Bad request
   */
  async updateMaterialProgress(req, res) {
    try {
      const material_Id = req.params.id;
      const user_id = req.body.user_id;
      const is_completed = req.body.is_completed;

      console.log(material_Id);
      console.log(user_id);
      console.log(is_completed);
      console.log("CTLSKDBJJKASBDKJABSJK");
      if (!Number.isInteger(Number(material_Id))) {
        return HttpResponse.sendBadRequest(
          res,
          "The Material ID should be a number."
        );
      }

      const updatedMaterial = await this.materialService.updateMaterialProgress(
        material_Id,
        user_id,
        is_completed
      );

      return HttpResponse.sendSuccess(res, updatedMaterial);
    } catch (error) {
      console.error(error.message);
      HttpResponse.sendError(res, error);
    }
  }

  /**
   * @swagger
   * /api/materials:
   *   post:
   *     summary: Create a new Material
   *     tags: [Materials]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: "#/components/schemas/Material"
   *     responses:
   *       201:
   *         description: Created
   *         content:
   *           application/json:
   *             schema:
   *               $ref: "#/components/schemas/Material"
   *       400:
   *         description: Bad request
   */
  async createMaterial(req, res) {
    try {
      const newMaterial = await this.materialService.createMaterial(req.body);
      HttpResponse.sendSuccess(res, newMaterial.rows[0], 201);
    } catch (error) {
      console.error(error.message);
      HttpResponse.sendError(res, error);
    }
  }

  /**
   * @swagger
   * /api/materials/{id}:
   *   put:
   *     summary: Update an existing material
   *     tags: [Materials]
   *     parameters:
   *       - in: path
   *         name: id
   *         description: ID of the material
   *         required: true
   *         schema:
   *           type: integer
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: "#/components/schemas/Material"
   *     responses:
   *       200:
   *         description: OK
   *         content:
   *           application/json:
   *             schema:
   *               $ref: "#/components/schemas/Material"
   *       404:
   *         description: Material not found
   *       400:
   *         description: Bad request
   */
  async updateMaterial(req, res) {
    try {
      const materialId = req.params.id;
      // const { course_id } = req.body;
      console.log("req", req);
      if (!Number.isInteger(Number(materialId))) {
        return HttpResponse.sendBadRequest(
          res,
          "The Material ID should be a number."
        );
      }
      const updatedMaterial = await this.materialService.updateMaterial(
        materialId,
        req.body
      );
      return HttpResponse.sendSuccess(res, updatedMaterial);
    } catch (error) {
      console.error(error.message);
      HttpResponse.sendError(res, error);
    }
  }

  /**
   * @swagger
   * /api/materials/{id}:
   *   delete:
   *     summary: Delete a Material by ID
   *     tags: [Materials]
   *     parameters:
   *       - in: path
   *         name: id
   *         description: ID of the Material
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       204:
   *         description: No content
   *       404:
   *         description: Material not found
   */
  async deleteMaterial(req, res) {
    try {
      const materialId = req.params.id;
      if (!Number.isInteger(Number(materialId))) {
        return HttpResponse.sendBadRequest(
          res,
          "The Material ID should be a number."
        );
      }
      const materialExists = await this.materialService.materialExists(
        materialId
      );
      if (!materialExists) {
        return HttpResponse.sendNotFound(
          res,
          `The Course with id ${materialId} does not exist.`
        );
      }

      await this.materialService.deleteMaterial(materialId);

      return res.status(200).json({
        status: 200,
        statusText: "OK",
        message: "Course deleted successfully",
      });
    } catch (error) {
      HttpResponse.sendError(res, error);
    }
  }
}
