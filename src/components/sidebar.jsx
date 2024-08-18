import clsx from "clsx";
import Image from "next/image";

const navData = [
  { id: 1, icon: "/assets/home.svg", alter: "home", isActive: true },
  { id: 2, icon: "/assets/notes.svg", alter: "notes", isActive: false },
  { id: 3, icon: "/assets/question.svg", alter: "question", isActive: false },
  { id: 4, icon: "/assets/exam.svg", alter: "exam", isActive: false },
];

export default function SideBar() {
  return (
    <nav className="w-[68px] p-[8px] h-[100vh] fixed">
      <div className="w-[52px] rounded-2xl h-[100%] bg-[#F8FAFC] text-center p-[8px] flex flex-col justify-start items-center">
        <div className="w-[34px] h-[14px] relative">
          <Image
            src="/assets/logo.svg"
            alt="logo-svg"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="text-right text-black w-[34px]">
          <p className="font-thin text-[10px]">beta</p>
        </div>
        <div className="w-[36px]">
          {navData.map((data) => {
            return (
              <div
                key={data.id}
                className={clsx(
                  "mt-3 p-1 rounded-full w-[36px] h-[36px] relative",
                  {
                    " bg-[#6947BF]": data.isActive === true,
                  }
                )}
              >
                <Image
                  color="white"
                  alt={data.alter}
                  src={data.icon}
                  // width={1000}
                  // height={760}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
            );
          })}
        </div>
        <div className="w-[36px] h-[36px] relative mt-auto">
          <Image
            alt="boy-image"
            className="mt-auto"
            src="/assets/boy.svg"
            style={{ objectFit: "cover" }}
            fill
          />
        </div>
      </div>
    </nav>
  );
}
