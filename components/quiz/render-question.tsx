"use client"
import React, {useState} from 'react';
import QuizCard from "@/components/quiz/quiz-card";

const RenderQuestion = ({questions}: any) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [onCompletedQuiz, setOnCompletedQuiz] = useState<boolean>(false);

    const handleAnswer = (selectedAnswerIndex: number): void => {
        const correctAnswerIndex = questions[currentQuestionIndex].answers.findIndex((answer: {
            is_correct: boolean;
        }) => answer.is_correct);

        if (selectedAnswerIndex === correctAnswerIndex) {
            setScore(score + 1);
        }

        const isLastQuestion = currentQuestionIndex === questions.length - 1;

        if (isLastQuestion) {
            setOnCompletedQuiz(true);
        }
    };
    const question = questions[currentQuestionIndex];

    return (
        <div className="space-y-3 w-full">
            {onCompletedQuiz && (
                <div className="text-2xl font-bold text-center">
                    You scored {score} out of {questions.length}!
                </div>
            )}
            {!onCompletedQuiz && (
                <QuizCard
                    question={question.question}
                    code={question.code}
                    explanation={question.explanation}
                    answers={question.answers}
                    handleAnswer={handleAnswer}
                    currentQuestionIndex={currentQuestionIndex}
                    nextQuestion={setCurrentQuestionIndex}
                />
            )}
        </div>
    );
};

export default RenderQuestion;