import apiClient from "@/lib/apiClient";
import { DoctorApplicationPayload } from "@/types";

export const applyAsDoctor = (payload: DoctorApplicationPayload) => {
  const formData = new FormData();
  formData.append("data", JSON.stringify(payload.data));
  if (payload.resume) {
    formData.append("resume", payload.resume);
  }

  for (const file of payload.additionalFiles) {
    formData.append("additionalFiles", file);
  }

  return apiClient("/doctors/apply-as-doctor", {
    method: "POST",
    body: formData,
  });
};
