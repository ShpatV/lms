import MaterialRepository from "../repository/MaterialRepository";
class MaterialService {
  constructor() {
    this.materialRepository = new MaterialRepository();
  }
  async getMaterialsForCourse(courseId) {
    try {
      const material = await this.materialRepository.getMaterialsForCourse(
        courseId
      );
      return material;
    } catch (error) {
      console.error(error + "error ne servis");
      throw error;
    }
  }
  async getMaterialById(materialId) {
    try {
      const material = await this.materialRepository.getMaterialById(materialId);
      return material;
    } catch (error) {
      console.error(error + "error in service");
      throw error;
    }
  }
  
  async updateMaterial(materialId, updatedMaterial) {
    try {
      const result = await this.materialRepository.updateMaterial(materialId, updatedMaterial);
      return result;
    } catch (error) {
      console.error(error + "error in service");
      throw error;
    }
  }

  async DeleteMaterialService(material_id) {
    try {
      const response = await this.materialRepository.DeleteMaterialRepository(
        material_id
      );

      if (response.ok) {
        const data = await response.text();
        return JSON.parse(data);
      } else {
        const errorData = await response.json();
        throw errorData;
      }
    } catch (error) {
      console.error("Error deleting material:", error);
      throw error;
    }
  }

  async createMaterial(newMaterial) {
    try {
      const response = await this.materialRepository.createMaterial(
        newMaterial
      );

      if (response) {
        console.log("Material added successfully", response);
        return response;
      } else {
        console.error("Error adding material: Empty response");
        throw new Error("Error adding material: Empty response");
      }
    } catch (error) {
      console.error("Error adding material:", error);
      throw error;
    }
  }
}
export default MaterialService;
