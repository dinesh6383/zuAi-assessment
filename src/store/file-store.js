"use client";

import { evaluateCourse } from "@/lib/evaluation";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const initialState = {
  id: null,
  file_data: null,
  file_name: null,
  course_work: null,
  subject: null,
  essay_title: null,
  evaluation_result: null,
};

export const fileStore = create(
  persist(
    (set, get) => ({
      all_uploads: [],
      uploadedInfo: initialState,

      updateInfo: (newData) =>
        set((state) => ({
          uploadedInfo: {
            ...state.uploadedInfo,
            ...newData,
          },
        })),

      addData: () => {
        set((state) => ({
          all_uploads: [...state.all_uploads, get().uploadedInfo],
        }));
      },

      evaluateData: () => {
        const result = evaluateCourse();
        get().updateInfo({ evaluation_result: result });
        get().addData();
      },

      fetchCourse: (data_id) => {
        const result = get().all_uploads.filter((data) => data.id === data_id);
        set((state) => ({
          uploadedInfo: result[0],
        }));
      },

      clearData: () => {
        set({
          uploadedInfo: initialState,
        });
      },
    }),
    {
      name: "courses",
    }
  )
);

/*
  file_url : 
  file_name : 
  file_size : 
  file_type : 
  course_work : 
  subject : 
  essay_title : 
*/
