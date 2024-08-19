"use client";

import React, { memo } from "react";
import dynamic from "next/dynamic";
import TagCard from "./tagcard";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";

const PdfDoc = dynamic(() => import("./pdfDoc"), {
  ssr: false,
});

const tags = [
  {
    image: "/assets/man.svg",
    title: "Physics HL",
  },
  {
    image: "/assets/clock.svg",
    title: "18 min read",
  },
  {
    image: "/assets/docs.svg",
    title: "2388 words",
  },
  {
    image: "/assets/star.svg",
    title: "5/7",
  },
  {
    image: "/assets/write.svg",
    title: "English",
  },
];

const CourseCard = memo((props) => {
  return (
    <Link href={`/coursework/${props?.data?.id}`}>
      <div className="w-[440px] h-[172px] rounded-xl p-1.5 border border-[#F4EAD8] cursor-pointer bg-gradient-to-r  from-[#FFFFFF] to-[#f8f6f2] flex gap-2">
        <div className="w-[120px] h-[160px] border border-[#EAF0F2] rounded-l-xl overflow-hidden flex justify-center items-center">
          <PdfDoc url={props?.data?.file_data} width={100} height={150} />
        </div>
        <div className="w-[254px] h-[138px]">
          <p className="font-bold text-[16px] text-[#3D404B]">
            {props.data.essay_title?.slice(0, 35)}
            ...
          </p>
          <p className="font-medium text-[11px] text-[#7A8196]">
            {`How does the temperature of a Copper pipe affect the time it takes a magnet to fall thought `.slice(
              0,
              77
            )}
            ...
          </p>
          <div className="w-[300px] h-[44px] p-[8px] gap-[4px] flex flex-wrap">
            {tags.map((data) => {
              const id = uuidv4();
              return <TagCard key={id} img={data.image} title={data.title} />;
            })}
          </div>
        </div>
      </div>
    </Link>
  );
});

CourseCard.displayName = "CourseCard";
export default CourseCard;
