import React from 'react';
import {Skeleton} from "@/components/ui/skeleton"

const QuizSkeleton = () => {
    return (
        <div className="flex flex-col space-y-3 items-center h-screen justify-center">
            <Skeleton className="h-[425px] w-[750px] rounded-xl"/>
            <div className="space-y-2 w-[750px]">
                <Skeleton className="h-12 w-full"/>
                <Skeleton className="h-12 w-full"/>
                <Skeleton className="h-12 w-full"/>
                <Skeleton className="h-12 w-full"/>
            </div>
        </div>
    );
};

export default QuizSkeleton;