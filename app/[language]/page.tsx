import React, {Suspense} from 'react';
import {getQuestions} from "@/actions/getQuestions";
import RenderQuestion from "@/components/quiz/render-question";
import QuizSkeleton from "@/app/[language]/_components/quiz-skeleton";

const Page = async () => {
    const questions = await getQuestions()
    return (
        <section className="flex flex-1 flex-col items-center justify-center h-screen">
            <Suspense fallback={<QuizSkeleton/>}>
                <RenderQuestion questions={questions}/>
            </Suspense>
        </section>
    );
};

export default Page;