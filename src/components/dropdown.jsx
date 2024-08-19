import Image from "next/image";
import clsx from "clsx";
import { v4 as uuidv4 } from "uuid";
import { bricolage } from "@/app/layout";
import { fileStore } from "@/store/file-store";

export default function DropDown(props) {
  const { updateInfo } = fileStore((state) => state);

  const handleSelection = (e) => {
    props.field === "coursework Type"
      ? e.target.innerText === "Tok Essay"
        ? updateInfo({ course_work: e.target.innerText, subject: null })
        : updateInfo({ course_work: e.target.innerText, subject: null })
      : updateInfo({ subject: e.target.innerText });
    props.toggle(props.field);
  };

  const handleSwitch = () => {
    props.toggle(props.field);
  };

  return (
    <div onClick={handleSwitch} className="relative">
      <div className="w-max gap-2 h-[36px] rounded-3xl border px-[8px] py-[16px] flex justify-around cursor-pointer items-center bg-[#FFFFFF] text-[#5B6170] ">
        <p className="text-[14px] font-semibold">
          {props?.type === null ? props.field : props?.type}
        </p>
        <div className="w-[16px] h-[16px] relative">
          <Image
            src="assets/down.svg"
            alt="down-svg"
            fill
            style={{ objectFit: "contain" }}
          />
        </div>
      </div>
      <div
        className={clsx(
          "absolute bg-[#FFFFFF] text-[#5B6170] border border-solid rounded-xl z-10 font-medium w-max top-10 p-2 transition-all ease-in-out delay-150",
          {
            " block": props.status === true,
            " hidden": props.status === false,
          }
        )}
      >
        {props?.options.map((data) => {
          const id = uuidv4();
          return (
            <p
              onClick={handleSelection}
              key={id}
              className={`${bricolage.className} my-1 hover:bg-slate-300 px-2 py-1 rounded-lg hover:text-black text-[15px] cursor-pointer`}
            >
              {data}
            </p>
          );
        })}
      </div>
    </div>
  );
}
