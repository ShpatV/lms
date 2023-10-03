class MaterialRepository {
  async getMaterialsForCourse(courseId) {
    try {
      console.log("REPOSITORY GET" + courseId);
      const response = await fetch(
        `http://localhost:5000/api/materials/materialsForCourse/${courseId}`
      );
      const materials = await response.json();

      return materials;
    } catch (error) {
      console.error(error.message);
    }
  }
  async createMaterial(newMaterial) {
    try {
      const response = await fetch("http://localhost:5000/api/materials", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMaterial),
      });
      const data = await response.json();

      if (!data.success) {
        console.error("Error creating material:", data.message);
        throw new Error(data.message);
      }
      console.log("Material created successfully:", data.data.title);
      return data;
    } catch (error) {
      console.error("Error creating material:", error);
      throw error;
    }
  }
  async DeleteMaterialRepository(material_id) {
    const api = `http://localhost:5000/api/materials/${material_id}`;
    const requestOption = {
      method: "DELETE",
    };

    const response = await fetch(api, requestOption);
    return response;
  }
  async getMaterialById(materialId) {
    try {
      const response = await fetch(
        `http://localhost:5000/api/materials/${materialId}`
      );
      const material = await response.json();
      console.log("success " + material.success);

      return material;
    } catch (error) {
      console.error(error.message);
    }
  }

  async updateMaterial(materialId, updatedMaterial) {
    try {
      const response = await fetch(
        `http://localhost:5000/api/materials/${materialId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedMaterial),
        }
      );

      const result = await response.json();
      console.log("success " + result.success);

      return result;
    } catch (error) {
      console.error(error.message);
    }
  }
}

export default MaterialRepository;
