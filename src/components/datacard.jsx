"use client";
import Image from "next/image";
import DropDown from "./dropdown";
import { useRef, useState } from "react";
import { fileStore } from "../store/file-store";
import Link from "next/link";
import PdfDoc from "./pdfDoc";
import { convertToBase64 } from "@/lib/converToBase64";
import { v4 as uuidv4 } from "uuid";
import { validateData } from "@/lib/validator";

export default function DataCard() {
  const fileRef = useRef(null);
  const [courseOpen, setCourseOpen] = useState(false);
  const [subjectOpen, setSubjectOpen] = useState(false);
  const { uploadedInfo, updateInfo, evaluateData } = fileStore(
    (state) => state
  );
  const { file_data } = uploadedInfo;

  const allFilled = validateData(uploadedInfo);

  const handleFileChange = () => {
    fileRef.current.click();
  };

  const btoMbConversion = (bytes) => {
    let mb = bytes / (1024 * 1024);
    return mb;
  };

  const handleSelectedFile = async (e) => {
    const selected_file = e.target?.files[0];
    const size_in_mb = btoMbConversion(selected_file.size);
    if (size_in_mb <= 25 && selected_file.type === "application/pdf") {
      updateInfo({ id: uuidv4() });
      updateInfo({ file_name: selected_file.name });

      const base_string = convertToBase64(selected_file);
      base_string
        .then((data) => {
          updateInfo({ file_data: data });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("Something went wrong");
    }
  };

  const handleToggler = (type) => {
    type === "coursework Type"
      ? setCourseOpen(!courseOpen)
      : setSubjectOpen(!subjectOpen);
  };

  const handleEvaluation = () => {
    evaluateData();
  };

  return (
    <div className="w-[740px] h-[516px] mt-5 rounded-3xl bg-[#FCFBFD] p-[20px] border border-[#D6DFE4]">
      <div className="w-[700px] h-[240px] border-[3px] border-dashed border-[#CEC4EB] rounded-2xl flex justify-center items-center">
        {file_data === null ? (
          <div className="w-[173px] h-[150px]  flex flex-col gap-2 justify-center items-center">
            <div className="w-[30px] h-[38px] relative">
              <Image
                src="/assets/upload.svg"
                alt="upload-svg"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
            <div>
              <p className="text-[#7A8196] font-semibold text-[14px]">
                Drag and drop a PDF
              </p>
              <p className="text-[#7A8196] font-normal text-[12px] text-center">
                *Limit 25 MB per file.
              </p>
            </div>
            <input
              className="hidden"
              ref={fileRef}
              type="file"
              onChange={handleSelectedFile}
              accept=".pdf"
            ></input>
            <button
              onClick={handleFileChange}
              type="file"
              className="w-[173px] h-[36px] border border-[#CEC4EB] text-[15px] font-extrabold text-[#6947BF] rounded-3xl px-[12px] py-[8px]"
            >
              Upload your file
            </button>
          </div>
        ) : (
          <div className="flex flex-col justify-around items-center relative">
            <div className="w-[180px] h-[180px] overflow-hidden border border-solid flex justify-center items-center">
              {file_data && (
                <PdfDoc url={uploadedInfo.file_data} width={180} height={180} />
              )}
            </div>
            <p className="font-semibold mt-1 text-[15px] text-[#7A8196]">
              {uploadedInfo.file_name}
            </p>
            <div
              onClick={() => updateInfo({ file_data: null })}
              className="absolute top-[-4px] right-[-3px] bg-white border border-solid text-[#7A8196] p-1 cursor-pointer rounded-full"
            >
              <Image src="assets/cross.svg" alt="cancel" fill />
            </div>
          </div>
        )}
      </div>

      <div className="mt-3">
        <p className="font-medium text-[15px] text-[#7A8196]">
          {uploadedInfo.course_work !== "Tok Essay" &&
          uploadedInfo.course_work !== null
            ? "Select your course & subjects*"
            : "Select your coursework type"}
        </p>
        <div className="flex gap-2 my-2">
          <DropDown
            field="coursework Type"
            type={uploadedInfo.course_work}
            options={["Tok Essay", "Extended Essay", "Internal assessment"]}
            status={courseOpen}
            toggle={handleToggler}
          />
          {uploadedInfo.course_work !== "Tok Essay" &&
            uploadedInfo.course_work !== null && (
              <DropDown
                field="Subject"
                type={uploadedInfo.subject}
                options={[
                  "Business Management",
                  "Economics",
                  "Language and Literature",
                ]}
                status={subjectOpen}
                toggle={handleToggler}
              />
            )}
        </div>
        <p className="font-medium text-[15px] text-[#7A8196] my-2">
          Enter your essay title*(Required)
        </p>
        <input
          onChange={(e) => updateInfo({ essay_title: e.target.value })}
          className="w-[330px] h-[40px] border px-3 my-2 text-black outline-none rounded-[20px] border-[#FF4800] text-[16px] font-normal"
          placeholder="how nation works...."
        ></input>
        {allFilled === true ? (
          <Link
            onLoadedMetadata={() => console.log("Meta data loaded...")}
            href={`/coursework/${uploadedInfo.id}`}
            onClick={handleEvaluation}
            className="w-[245px] h-[40px] rounded-3xl my-2 px-[8px] flex justify-center items-center font-bold text-[18px] text-white bg-[#6947BF]"
          >
            <div className="w-[24px] h-[24px] relative rounded-full p-1 bg-white">
              <Image
                src="/assets/glow.svg"
                alt="glow-svg"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
            <p className="ml-2">Evaluate your Score</p>
          </Link>
        ) : (
          <button className="w-[245px] h-[40px] rounded-3xl my-2 px-[8px] flex justify-center items-center font-bold text-[18px] text-white bg-[#ADB8C9]">
            <div className="w-[24px] h-[24px] relative rounded-full p-1 bg-white">
              <Image
                src="/assets/glow.svg"
                alt="glow-svg"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
            <p className="ml-2">Evaluate your Score</p>
          </button>
        )}
      </div>
    </div>
  );
}
