export type Example = {
	id: number;
	inputText: string;
	outputText: string;
	explanation?: string;
	img?: string;
};

// local problem data
export type Problem = {
	id: string;
	title: string;
	tests: Record<string, any>[];
	answers: number[];
	problemStatement: string;
	examples: Example[];
	constraints: string;
	order: number;
	starterCode: Record<Language, string>;
	starterFunctionName: string;
};

export type DBProblem = {
	id: string;
	title: string;
	category: string;
	difficulty: string;
	likes: number;
	dislikes: number;
	order: number;
	videoId?: string;
	link?: string;
};

export type Language = 'js' | 'python' | 'cpp';