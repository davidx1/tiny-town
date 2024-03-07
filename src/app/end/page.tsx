export default function page() {
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
        </div>
      </div>
    </div>
  );
}
