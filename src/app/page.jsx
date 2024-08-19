"use client";

import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import clsx from "clsx";
import CourseCard from "@/components/coursecard";
import { fileStore } from "@/store/file-store";
import DataCard from "../components/datacard";
import Image from "next/image";

const types = ["All", "IA Example", "EE Example", "Tok Example"];
const mapping = {
  "IA Example": "Internal assessment",
  "EE Example": "Extended Essay",
  "Tok Example": "Tok Essay",
};

export default function Home() {
  const [category, setCategory] = useState("All");
  const { all_uploads, clearData } = fileStore((state) => state);

  useEffect(() => {
    clearData();
  }, [clearData]);

  return (
    <div className="bg-[#E5ECF3] py-16 h-max">
      <div className="w-max flex justify-center items-center ml-0 xl:ml-20 md:pl-10 lg:pl-36 pl-4">
        <div className="flex flex-col justify-center items-start">
          <div className="font-extrabold text-lg lg:text-3xl md:text-2xl text-[#1E2026]">
            <p>Hey IB Folks ! Unsure about the quality of your</p>
            <p>
              answers? <span className="text-[#6947BF]">We get you.</span>
            </p>
          </div>
          <DataCard />
        </div>
        <div className="md:flex flex-col justify-center items-center hidden">
          <div className="w-[270px] h-[161px] relative">
            <Image src="assets/astronaut.svg" alt="astronaut" fill />
          </div>
          <div className="xl:w-[343px] lg:w-[293px] h-[448px] border rounded-3xl bg-white ml-2">
            <div className="w-[343px] h-[150px] px-[23px] lg:px-[10px] py-[14px]">
              <p className="font-extrabold xl:text-[30px] lg:text-[25px] text-[#6947BF]">
                Evaluate your Coursework with a single click
              </p>
            </div>
            <div className="xl:w-[343px] lg:w-[293px] h-[294px] relative">
              <Image
                src="assets/grade.svg"
                alt="grade"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </div>
      {all_uploads?.length > 0 && (
        <>
          <div className="mt-10 font-semibold text-[20px] text-[#5B6170] w-[450px] md:w-max ml-0 xl:ml-20 lg:pl-36 md:pl-10 pl-2">
            <p className="mb-3">My coursework</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {all_uploads?.map((data) => {
                return <CourseCard key={data.id} data={data} />;
              })}
            </div>
          </div>
          <div className="mt-10 font-semibold text-[20px] text-[#5B6170] w-[450px] md:w-max ml-0 xl:ml-20 lg:pl-36 md:pl-10 pl-2">
            <p className="mb-3">Explore coursework</p>
            <div className="w-max gap-2 h-[33px] px-[4px] mb-3 flex justify-start items-center">
              {types.map((data) => {
                const id = uuidv4();
                return (
                  <div
                    key={id}
                    onClick={() => setCategory(data)}
                    className={clsx(
                      "w-max h-[33px] py-[6px] px-[12px] flex justify-center items-center rounded-3xl cursor-pointer",
                      {
                        "bg-white text-[#6947BF] border": category === data,
                        "text-[#5B6170]": category !== data,
                      }
                    )}
                  >
                    <p className="font-semibold text-[12px] md:text-[16px]">
                      {data}
                    </p>
                  </div>
                );
              })}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {all_uploads.map((data) => {
                if (category === "All")
                  return <CourseCard key={data.id} data={data} />;
                if (mapping[category] === data.course_work)
                  return <CourseCard key={data.id} data={data} />;
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
