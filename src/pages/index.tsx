import Topbar from "@/components/Topbar/Topbar";
import ProblemsTable from "@/components/ProblemsTable/ProblemsTable";
import { useState } from "react";
import useHasMounted from "@/hooks/useHasMounted";
// import { doc, setDoc } from "firebase/firestore";
// import { fireStore } from "@/firebase/firebase";

export default function Home() {
  // const [inputs, setInputs] = useState({
  //   id: "",
  //   title: "",
  //   difficulty: "",
  //   category: "",
  //   order: 0,
  //   videoId: "",
  //   link: "",
  //   likes: 0,
  //   dislikes: 0,
  //   year: 0,
  // });

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setInputs({
  //     ...inputs,
  //     [name]: value,
  //   });
  // }

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const newProblem = {
  //     ...inputs,
  //     order: Number(inputs.order),
  //     year: Number(inputs.year),
  //   }
  //   await setDoc(doc(fireStore, "problems", inputs.id), newProblem);
  //   alert("Problem added to DB");
  // };

  const [loadingProblems, setLoadingProblems] = useState(true);
  const hasMounted = useHasMounted();

  if (!hasMounted) return null;

  return (
    <>
      <main className="bg-dark-layer-2 min-h-screen">
        <Topbar />

        <h1
          className='text-2xl text-center text-gray-500 dark:text-gray-400 font-medium
					uppercase mt-10 mb-5'
        >
          &ldquo; Train. Solve. Compete. &rdquo;
        </h1>
        <div className='relative overflow-x-auto mx-auto px-6 pb-10'>
          <table className='text-sm text-left text-gray-500 dark:text-gray-400 sm:w-7/12 w-full max-w-[1200px] mx-auto'>
            <ProblemsTable setLoadingProblems={setLoadingProblems} />
          </table>
          {loadingProblems && (
            <div className="max-w-[1200px] mx-auto sm:w-7/12 w-full animate-pulse">
              {[...Array(10)].map((_, idx) => (
                <LoadingSkeleton key={idx} />
              ))}
            </div>
          )}
        </div>

        {/* Temp Form */}
        {/* <form className="p-6 flex flex-col max-w-sm gap-3" onSubmit={handleSubmit}>
          <input type="text" onChange={handleInputChange} placeholder="problem id" name="id" />
          <input type="text" onChange={handleInputChange} placeholder="title" name="title" />
          <input type="text" onChange={handleInputChange} placeholder="difficulty" name="difficulty" />
          <input type="text" onChange={handleInputChange} placeholder="category" name="category" />
          <input type="text" onChange={handleInputChange} placeholder="order" name="order" />
          <input type="text" onChange={handleInputChange} placeholder="videoId?" name="videoId" />
          <input type="text" onChange={handleInputChange} placeholder="year" name="year" />
          <input type="text" onChange={handleInputChange} placeholder="link?" name="link" />
          <button className="bg-white">Save to DB</button>
        </form> */}
      </main>
    </>
  );
}

const LoadingSkeleton = () => {
  return (
    <div className='flex items-center space-x-12 mt-4 px-6'>
      <div className='w-6 h-6 shrink-0 rounded-full bg-dark-layer-1'></div>
      <div className='h-4 sm:w-52  w-32  rounded-full bg-dark-layer-1'></div>
      <div className='h-4 sm:w-52  w-32 rounded-full bg-dark-layer-1'></div>
      <div className='h-4 sm:w-52 w-32 rounded-full bg-dark-layer-1'></div>
      <div className='h-4 sm:w-52 w-32 rounded-full bg-dark-layer-1'></div>
      <span className='sr-only'>Loading...</span>
    </div>
  );
};