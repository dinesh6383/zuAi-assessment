import ProgressBar from "@/components/progressBar";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";

export default function RemarkCard(props) {
  return (
    <div className="w-[100%] h-max bg-white rounded-3xl mb-2 px-[12px] py-[10px]">
      <div
        onClick={() => props.toggle(props.data.criteria)}
        className="flex justify-start items-center"
      >
        <ProgressBar
          lg={false}
          score={
            props.data.criteria == "A"
              ? props?.result?.criteria_a
              : props?.data?.criteria == "B"
              ? props?.result?.criteria_b
              : props?.result?.criteria_c
          }
        />
        <div className="w-max h-[58px] cursor-pointer ml-2 flex justify-center items-start flex-col">
          <p className="text-[12px] text-[#98A1BB]">
            Criteria {props.data.criteria}:
          </p>
          <p className="text-[15px] font-semibold text-[#3D404B] w-[232px]">
            {props.data.type}
          </p>
        </div>
        <div className="w-[9px] h-[5px] relative ml-auto">
          <Image
            className="ml-auto"
            src="/assets/down.svg"
            alt="down-arrow"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
      {props.state && (
        <div className="w-[500px] h-max border-t mt-2">
          <div className="mt-3">
            <p className="font-medium text-[14px] text-[#5B6170]">
              {props.data.content}
            </p>
          </div>
          <div className="mt-3">
            <p className="text-[#000000] font-[800]">Strengths</p>
            <div className="rounded-3xl p-[16px] border border-[#3CC28A] bg-teal-50 mt-3">
              {props.data.strength.map((data) => {
                const id = uuidv4();
                return (
                  <div
                    key={id}
                    className="flex justify-start items-center gap-3 mt-1"
                  >
                    <div className="w-[16px] h-[16px] relative">
                      <Image
                        src="/assets/tick.svg"
                        alt="tick"
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <p className="font-semibold text-[14px] text-[#3D404B]">
                      {data}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="mt-3">
            <p className="text-[#000000] font-[800]">Scope of Improvement</p>
            <div className="rounded-3xl p-[16px] border border-[#F9C94E]  mt-3">
              {props.data.improvement.map((data) => {
                const id = uuidv4();
                return (
                  <div
                    key={id}
                    className="flex justify-start items-center gap-2"
                  >
                    <div className="w-[16px] h-[16px] relative">
                      <Image
                        src="/assets/exlamation.svg"
                        alt="tick"
                        // width={16}
                        // height={16}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <p className="font-semibold text-[14px] text-[#3D404B]">
                      {data}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
