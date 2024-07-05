import React, {useEffect, useState} from 'react';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import CodeSnippet from '@/components/shared/code-snippet';
import {Button} from '@/components/ui/button';
import {cn} from '@/lib/utils';
import {Alert, AlertDescription, AlertTitle} from '@/components/ui/alert';

interface Answer {
    option: string;
    is_correct: boolean;
}

interface QuizCardProps {
    question: string;
    code?: string;
    explanation?: string;
    answers: Answer[];
    handleAnswer: (selectedAnswerIndex: number) => void;
}

const QuizCard = ({question, code, explanation, answers, handleAnswer}: QuizCardProps) => {
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
    const [showAnswers, setShowAnswers] = useState<boolean>(false);
    const [showExplanation, setShowExplanation] = useState<boolean>(false);

    useEffect(() => {
        resetQuiz();
    }, [question, code]);

    const resetQuiz = () => {
        setShowExplanation(false);
        setSelectedAnswerIndex(null);
        setShowAnswers(false);
    };

    const handleAnswerClick = (index: number) => {
        const selectedAnswer = answers[index];
        setSelectedAnswerIndex(index);
        setShowAnswers(true);
        handleAnswer(index);

        if (!selectedAnswer.is_correct) {
            setShowExplanation(true);
        }
    };

    const getButtonClass = (index: number, isCorrect: boolean) => {
        if (!showAnswers) return '';

        if (isCorrect) return 'bg-green-500';
        if (selectedAnswerIndex === index && !isCorrect) return 'bg-red-500';

        return '';
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-3xl text-center font-bold">{question}</CardTitle>
            </CardHeader>
            <CardContent>
                {code && <CodeSnippet language="javascript" code={code}/>}
                {showExplanation && (
                    <Alert className="bg-green-500/30 space-y-3">
                        <AlertTitle>Explanation:</AlertTitle>
                        <AlertDescription className="text-lg font-medium">
                            {explanation}
                        </AlertDescription>
                    </Alert>
                )}
            </CardContent>
            <CardFooter className="flex flex-1 flex-col justify-start items-center text-start gap-4 w-full">
                {answers.map((answer, index) => (
                    <Button
                        key={index}
                        onClick={() => handleAnswerClick(index)}
                        variant="default"
                        size="lg"
                        className={cn(getButtonClass(index, answer.is_correct), 'w-full')}
                        disabled={showAnswers}
                    >
                        {answer.option}
                    </Button>
                ))}
            </CardFooter>
        </Card>
    );
};

export default QuizCard;
