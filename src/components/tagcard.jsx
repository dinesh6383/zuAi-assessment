import Image from "next/image";

export default function TagCard(props) {
  return (
    <div className="bg-white border rounded-xl w-max h-[20px] p-3 flex justify-center items-center">
      <div className="w-[13px] h-[16px] relative">
        <Image
          src={props.img}
          alt={props.title}
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
      <p className="font-semibold text-[11px] text-[#5B6170] ml-2">
        {props.title}
      </p>
    </div>
  );
}
