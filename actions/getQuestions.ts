"use server"
import {createClient} from "@/utils/supabase/server";
import {QueryData} from "@supabase/supabase-js";

export const getQuestions = async () => {
    const supabase = createClient();

    const getRandomQuestions = supabase
        .from('random_questions')
        .select(`
            question,
            code,
            explanation,
            uuid,
            answers(option, is_correct)`)
        .limit(10)

    type RandomQuestions = QueryData<typeof getRandomQuestions>

    const {data, error} = await getRandomQuestions

    if (error) console.error('Error fetching questions:', error.message);

    if (!data) return []

    const questions: RandomQuestions = data
    return questions
}