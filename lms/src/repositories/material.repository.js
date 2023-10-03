/* eslint-disable no-useless-catch */
import client from "../config/database.js";
import * as materialQueries from "../utils/queries/material.queries.js";

export default class MaterialRepository {
  async getAllMaterials(courseId) {
    try {
      const materials = await client.query(materialQueries.GET_ALL_MATERIALS, [
        courseId,
      ]);
      return materials.rows;
    } catch (error) {
      throw new Error("Error retrieving materials.");
    }
  }

  async getUserMaterialByMaterialId(materialId) {
    try {
      const result = await client.query(
        materialQueries.GET_USER_MATERIAL_BY_MATERIAL_ID,
        [materialId]
      );
      return result.rows;
    } catch (error) {
      throw new Error("Error retrieving user material.");
    }
  }

  async updateMaterialProgress(materialId, userId, isCompleted) {
    try {
      const result = await client.query(
        materialQueries.UPDATE_COMPLETION_STATUS,
        [isCompleted, materialId, userId]
      );
      console.log("sdddsdfsdfdsf");
      console.log({ isCompleted, materialId, userId });
      return result.rows[0]; // Return the updated row
    } catch (error) {
      throw new Error("Error updating material progress.");
    }
  }

  async getMaterialById(materialId) {
    try {
      const material = await client.query(materialQueries.GET_MATERIAL_BY_ID, [
        materialId,
      ]);
      return material.rows[0];
    } catch (error) {
      throw error;
    }
  }

  async createMaterial(newMaterial) {
    try {
      const { course_id, title, content, date_posted } = newMaterial;
      const result = await client.query(materialQueries.CREATE_MATERIAL, [
        course_id,
        title,
        content,
        date_posted,
      ]);
      return result;
    } catch (error) {
      console.error("Error creating material:", error.message);
      throw new Error("Error creating material.");
    }
  }

  async materialExists(materialId) {
    try {
      const result = await client.query(materialQueries.MATERIAL_EXISTS, [
        materialId,
      ]);
      return result.rows[0].exists;
    } catch (error) {
      throw new Error("Error checking material existence.");
    }
  }

  async updateMaterial(materialId, updatedMaterial) {
    try {
      const { courseId, title, content, datePosted } = updatedMaterial;

      const result = await client.query(materialQueries.UPDATE_MATERIAL, [
        courseId,
        title,
        content,
        datePosted,
        materialId,
      ]);
      return result.rows[0];
    } catch (error) {
      throw new Error("Error updating material.");
    }
  }

  async deleteMaterial(materialId) {
    try {
      await client.query(materialQueries.DELETE_MATERIAL, [materialId]);
    } catch (error) {
      throw new Error("Error deleting course.");
    }
  }
}
