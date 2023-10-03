/* eslint-disable no-useless-catch */

export default class MaterialService {
  constructor(materialRepository) {
    this.materialRepository = materialRepository;
  }
  async getAllMaterials(courseId) {
    try {
      return await this.materialRepository.getAllMaterials(courseId);
    } catch (error) {
      console.error(error.message);
      throw new Error("error retrieving materials.");
    }
  }
  async getMaterialById(materialId) {
    try {
      const result = await this.materialRepository.getMaterialById(materialId);
      return result || null;
    } catch (error) {
      console.error(error.message);
      throw new Error("error retrieving material.");
    }
  }

  async createMaterial(newMaterial) {
    try {
      const result = await this.materialRepository.createMaterial(newMaterial);
      return result;
    } catch (error) {
      console.error(error.message);
      throw new Error("Error creating material.");
    }
  }

  async materialExists(materialId) {
    try {
      const result = await this.materialRepository.materialExists(materialId);
      return result;
    } catch (error) {
      console.error(error.message);
      throw new Error("Error checking if course exits");
    }
  }

  async getUserMaterialByMaterialId(materialId) {
    try {
      return await this.materialRepository.getUserMaterialByMaterialId(
        materialId
      );
    } catch (error) {
      console.error(error.message);
      throw new Error("Error retrieving user material.");
    }
  }
  async updateMaterialProgress(materialId, userId, isCompleted) {
    try {
      console.log("QQQQQQQQQQQQQQQQ");
      console.log({ isCompleted, materialId, userId });
      return await this.materialRepository.updateMaterialProgress(
        materialId,
        userId,
        isCompleted
      );
    } catch (error) {
      console.error(error.message);
      throw new Error("Error updating material progress.");
    }
  }

  async updateMaterial(materialId, updatedMaterial) {
    try {
      const result = await this.materialRepository.updateMaterial(
        materialId,
        updatedMaterial
      );
      return result;
    } catch (error) {
      console.error(error.message);
      throw new Error("Error updating course.");
    }
  }
  async deleteMaterial(materialId) {
    try {
      return await this.materialRepository.deleteMaterial(materialId);
    } catch (error) {
      console.error(error.message);
      throw new Error("Error deleting course.");
    }
  }
}
