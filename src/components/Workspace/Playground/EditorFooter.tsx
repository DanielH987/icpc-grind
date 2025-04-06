import React from 'react';

type EditorFooterProps = {
	handleRun: () => void;
	handleSubmit: () => void;
	isLoading?: boolean;
};

const EditorFooter: React.FC<EditorFooterProps> = ({ handleRun, handleSubmit, isLoading }) => {
	return (
		<div className='flex bg-dark-layer-1 absolute bottom-0 z-10 w-full'>
			<div className='mx-5 my-[10px] flex justify-between w-full'>
				<div className='ml-auto flex items-center space-x-4'>
					<button
						className='px-3 py-1.5 text-sm font-medium items-center whitespace-nowrap transition-all focus:outline-none inline-flex bg-dark-fill-3 hover:bg-dark-fill-2 text-dark-label-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed'
						onClick={handleRun}
						disabled={isLoading}
					>
						{isLoading ? 'Running...' : 'Run'}
					</button>
					<button
						className='px-3 py-1.5 font-medium items-center transition-all focus:outline-none inline-flex text-sm text-white bg-dark-green-s hover:bg-green-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed'
						onClick={handleSubmit}
						disabled={isLoading}
					>
						{isLoading ? 'Submitting...' : 'Submit'}
					</button>
				</div>
			</div>
		</div>
	);
};

export default EditorFooter;
