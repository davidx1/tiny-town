"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export default function Page() {
  const { replace } = useRouter();

  const playDivRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (playDivRef.current) {
      playDivRef.current.focus();
    }
  }, []);

  const handleRestart = () => {
    window.sessionStorage.removeItem("tiny-town-inventory-store");
    window.sessionStorage.removeItem("tiny-town-plot-store");
    replace(`${process.env.myBasePath}/opening`);
  };

  return (
    <div className="relative w-full min-h-screen max-h-screen bg-slate-200 flex flex-col items-center justify-center">
      <div className=" bg-end-splash bg-cover bg-center px-60 pt-40 pb-80">
        <div className="flex flex-col items-center bg-gray-800/80 rounded-xl p-14 px-20 drop-shadow-xl ">
          <h1 className="text-2xl mb-4 text-white ">{"Congratulations!"}</h1>
          <p className="text-white ">
            {"You have reached the end of this experience."}
          </p>
          <p className="text-white ">
            {"You are now a true Paper Scissors Rock master"}
          </p>
          <p className="text-white ">
            {"https://github.com/davidx1/tiny-town"}
          </p>
          <button
            ref={playDivRef}
            onClick={handleRestart}
            className="mt-8 px-8 py-4 bg-blue-400 text-white"
          >
            Restart
          </button>
        </div>
      </div>
    </div>
  );
}
