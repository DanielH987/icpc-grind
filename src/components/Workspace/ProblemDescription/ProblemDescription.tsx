import { fireStore } from "@/firebase/firebase";
import { DBProblem, Problem } from "@/utils/types/problem";
import { doc, getDoc } from "firebase/firestore";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { BsCheck2Circle } from "react-icons/bs";
import { TiStarOutline } from "react-icons/ti";

type ProblemDescriptionProps = {
	problem: Problem
};

const ProblemDescription: React.FC<ProblemDescriptionProps> = ({ problem }) => {

	const { currentproblem, loading, problemDifficultyClass } = useGetCurrentProblem(problem.id);

	return (
		<div className='bg-dark-layer-1'>
			{/* TAB */}
			<div className='flex h-11 w-full items-center pt-2 bg-dark-layer-2 text-white overflow-x-hidden'>
				<div className={"bg-dark-layer-1 rounded-t-[5px] px-5 py-[10px] text-xs cursor-pointer"}>
					Description
				</div>
			</div>

			<div className='flex px-0 py-4 h-[calc(100vh-94px)] overflow-y-auto'>
				<div className='px-5'>
					{/* Problem heading */}
					<div className='w-full'>
						<div className='flex space-x-4'>
							<div className='flex-1 mr-2 text-lg text-white font-medium'>{problem.title}</div>
						</div>
						{!loading && currentproblem && (
							<div className='flex items-center mt-3'>
								<div
									className={`${problemDifficultyClass} inline-block rounded-[21px] bg-opacity-[.15] px-2.5 py-1 text-xs font-medium capitalize `}
								>
									{currentproblem.difficulty}
								</div>
								<div className='rounded p-[3px] ml-4 text-lg transition-colors duration-200 text-green-s text-dark-green-s'>
									<BsCheck2Circle />
								</div>
								<div className='flex items-center cursor-pointer hover:bg-dark-fill-3 space-x-1 rounded p-[3px]  ml-4 text-lg transition-colors duration-200 text-dark-gray-6'>
									<AiFillLike />
									<span className='text-xs'>{currentproblem.likes}</span>
								</div>
								<div className='flex items-center cursor-pointer hover:bg-dark-fill-3 space-x-1 rounded p-[3px]  ml-4 text-lg transition-colors duration-200 text-green-s text-dark-gray-6'>
									<AiFillDislike />
									<span className='text-xs'>{currentproblem.dislikes}</span>
								</div>
								<div className='cursor-pointer hover:bg-dark-fill-3  rounded p-[3px]  ml-4 text-xl transition-colors duration-200 text-green-s text-dark-gray-6 '>
									<TiStarOutline />
								</div>
							</div>
						)}

						{/* Problem Statement(paragraphs) */}
						<div className='text-white text-sm'>
							<div
								dangerouslySetInnerHTML={{
									__html: problem.problemStatement,
								}}
							/>
						</div>

						{/* Examples */}
						<div className='mt-4'>
							{problem.examples.map((example, index) => (
								<div key={example.id}>
									<p className='text-white font-medium'>Example {index + 1}:</p>
									{example.img && (
										<Image src={example.img} alt="Example image" className="mt-3" width={400} height={200} />
									)}
									<div className='example-card'>
										<pre>
											<strong className="text-white">Input: </strong> {example.inputText}
											<br />
											<strong>Output: </strong> {example.outputText}
											<br />
											{example.explanation && (
												<>
													<strong>Explanation: </strong> {example.explanation}
												</>
											)}
										</pre>
									</div>
								</div>
							))}
						</div>

						{/* Constraints */}
						<div className='my-5 pb-4'>
							<div className='text-white text-sm font-medium'>Constraints:</div>
							<ul className='text-white ml-5 list-disc'>
								<div
									dangerouslySetInnerHTML={{
										__html: problem.constraints,
									}}
								/>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default ProblemDescription;

function useGetCurrentProblem(problemId: string) {

	const [currentproblem, setCurrentProblem] = useState<DBProblem | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [problemDifficultyClass, setProblemDifficultyClass] = useState<string>("");

	useEffect(() => {
		const getCurrentProblem = async () => {
			setLoading(true);

			const docRef = doc(fireStore, "problems", problemId);
			const docSnap = await getDoc(docRef);

			if (docSnap.exists()) {
				const problem = docSnap.data();
				setCurrentProblem({ id: docSnap.id, ...problem } as DBProblem);
				setProblemDifficultyClass(
					problem.difficulty === "Easy" ? "bg-olive text-olive" : problem.difficulty === "Medium" ? "bg-dark-yellow text-dark-yellow" : "bg-dark-pink text-dark-pink"
				);
			}
			setLoading(false);
		};

		getCurrentProblem();
	}, [problemId]);

	return { currentproblem, loading, problemDifficultyClass };
}