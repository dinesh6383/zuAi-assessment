"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import { fileStore } from "@/store/file-store";
import ProgressBar from "@/components/progressBar";
import { defaultData } from "@/lib/componentData";
import RemarkCard from "@/components/remarkCard";
import clsx from "clsx";

const PdfDoc = dynamic(() => import("@/components/pdfDoc"), {
  ssr: false,
});

export default function Coursework({ params }) {
  const [carda, setCarda] = useState(false);
  const [cardb, setCardb] = useState(false);
  const [cardc, setCardc] = useState(false);
  const { uploadedInfo, fetchCourse } = fileStore((state) => state);
  const { id } = params;

  useEffect(() => {
    if (uploadedInfo.file_data === null) {
      console.log("Course work page is incoming..");
      fetchCourse(id);
    }
  }, [id, fetchCourse, uploadedInfo.file_data]);

  const handleCard = (card) => {
    card === "A"
      ? setCarda(!carda)
      : card === "B"
      ? setCardb(!cardb)
      : setCardc(!cardc);
  };

  return (
    <div className="bg-[#E5ECF3] flex justify-start gap-5 items-center h-[100vh]">
      <div
        className={clsx(
          "h-[587px] border rounded-3xl border-slate-300 shadow-lg ml-32",
          {
            "w-[858px]": (carda || cardb || cardc) === false,
            "w-[758px]": (carda || cardb || cardc) === true,
          }
        )}
      >
        <div className="w-[100%] h-[50px] rounded-t-3xl flex justify-between items-center p-[12px]">
          <div className="w-max h-[26px] rounded-xl py-[4px] px-[12px] bg-white">
            <p className="text-[#3D404B] text-[14px] font-semibold">
              {uploadedInfo?.file_name}
            </p>
          </div>
          <div className="flex justify-between items-center w-[226px]">
            <div className="w-[14px] h-[14px] relative">
              <Image
                src="/assets/zoomout.svg"
                alt="zoom-out"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
            <p className="text-[#5B6170] font-semibold">60%</p>
            <div className="w-[14px] h-[14px] relative">
              <Image
                src="/assets/zoomin.svg"
                alt="zoom-out"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="w-[14px] h-[14px] relative">
              <Image
                src="/assets/frame.svg"
                alt="frame"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="flex justify-between items-center w-[89px] rounded-2xl bg-[#FCFBFD] py-[4px] px-[12px]">
              <div className="w-[8px] h-[8px] relative">
                <Image
                  src="/assets/shrink.svg"
                  alt="shrink"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <p className="text-[#5B6170] font-semibold text-[12px]">
                Collapse
              </p>
            </div>
          </div>
        </div>
        <div className="w-[100%] h-[537px] rounded-b-3xl bg-white flex justify-center items-center">
          <div
            style={{
              overflow: "auto",
              scrollbarWidth: "none",
            }}
            className="w-[600px] h-[520px] border border-solid overflow-y-scroll scrollbar-hide"
          >
            {uploadedInfo?.file_data !== null && (
              <PdfDoc url={uploadedInfo?.file_data} />
            )}
          </div>
        </div>
      </div>
      <div className="w-max h-[587px] flex flex-col justify-start items-start gap-1">
        <div className="w-[316px] h-[104px] rounded-3xl bg-white p-[12px] flex justify-between items-center mb-2">
          <div>
            <p className="font-medium text-[12px] text-[#3D404B]">
              Overall Score
            </p>
            <p className="font-extrabold text-[18px] text-[#3D404B]">
              Remark : <span className="text-[#3CC28A]">Excellent</span>
            </p>
            <p className="text-[12px] font-thin text-[#98A1BB]">
              {`Evaluated on ${uploadedInfo?.evaluation_result?.evaluation_date}`}
            </p>
          </div>
          <div>
            <ProgressBar
              lg={true}
              score={uploadedInfo?.evaluation_result?.over_all}
            />
          </div>
        </div>
        <div className="overflow-y-scroll scrollbar-hide">
          {defaultData?.map((data, idx) => {
            const id = uuidv4();
            return (
              <RemarkCard
                toggle={handleCard}
                key={id}
                data={data}
                result={uploadedInfo?.evaluation_result}
                state={idx === 0 ? carda : idx === 1 ? cardb : cardc}
              />
            );
          })}
        </div>
        <div className="w-[255px] h-[40px] rounded-3xl px-[16px] bg-white flex justify-between items-center">
          <p className="text-[#6947BF] font-bold text-[16px]">
            Check detail Evaluation
          </p>
          <div className="w-[11px] h-[5px] relative">
            <Image
              src="/assets/rightArrow.svg"
              alt="right-arrow"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
