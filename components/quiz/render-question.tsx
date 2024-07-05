"use client"
import React, {useState} from 'react';
import QuizCard from "@/components/quiz/quiz-card";

const RenderQuestion = ({questions}: any) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);

    const handleAnswer = (selectedAnswerIndex: number): void => {
        const correctAnswerIndex = questions[currentQuestionIndex].answers.findIndex((answer: {
            is_correct: boolean;
        }) => answer.is_correct);

        if (selectedAnswerIndex === correctAnswerIndex) {
            setScore(score + 1);
        }

        const isLastQuestion = currentQuestionIndex === questions.length - 1;

        setTimeout(() => {
            if (isLastQuestion) {
                console.log(`Quiz completed! Your score is ${score} out of ${questions.length}`);
            } else {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
            }
        }, 5000);
    };
    const question = questions[currentQuestionIndex];

    return (
        <div className="space-y-3 w-full">
            <QuizCard
                question={question.question}
                code={question.code}
                explanation={question.explanation}
                answers={question.answers}
                handleAnswer={handleAnswer}
            />
        </div>
    );
};

export default RenderQuestion;