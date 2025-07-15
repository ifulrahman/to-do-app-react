import API from "./axios";

// Checklist API
export const getAllChecklists = async () => {
  const response = await API.get("/checklist");
  return response.data;
};

export const createChecklist = async (name) => {
  const response = await API.post("/checklist", { name });
  return response.data;
};

export const deleteChecklist = async (id) => {
  const response = await API.delete(`/checklist/${id}`);
  return response.data;
};

// Checklist Item API
export const getChecklistItems = async (checklistId) => {
  const response = await API.get(`/checklist/${checklistId}/item`);
  return response.data;
};

export const createChecklistItem = async (checklistId, itemName) => {
  const response = await API.post(`/checklist/${checklistId}/item`, {
    itemName,
  });
  return response.data;
};

export const updateChecklistItemStatus = async (checklistId, itemId) => {
  const response = await API.put(`/checklist/${checklistId}/item/${itemId}`);
  return response.data;
};

export const deleteChecklistItem = async (checklistId, itemId) => {
  const response = await API.delete(`/checklist/${checklistId}/item/${itemId}`);
  return response.data;
};

export const renameChecklistItem = async (checklistId, itemId, itemName) => {
  const response = await API.put(
    `/checklist/${checklistId}/item/rename/${itemId}`,
    { itemName }
  );
  return response.data;
};
