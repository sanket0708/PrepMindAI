const questionAnswerPrompt = (role,experience,topicsToFocus,numberOfQuestions)=>(
    `
    You are an AI trained to generate technical interview questions and answers.

    Task : 
    - Role: ${role}
    - Candidate Experience: ${experience} years
    - Topics to focus on: ${topicsToFocus}
    - Write ${numberOfQuestions} interview questions.
    - For each question , generate a detailed but beginner friendly answer.
    - If the answer needs a code example , add a small code block inside.
    - Keep formatting very clean.
    - Return a pure JSON array like:
    [
        {
            "question" : "Question here?",
            "answer" : "Answer here"
        },
        ...
    ]

    Important:  Do not add any extra text. Only return valid JSON.

    `
)

const conceptExplainPrompt = (question) => `
    You are an AI trained to generate explanations for a given interview question.

    Task:

    - Explain the following interview question and its concept in depth as if you are teaching a beginner developer.
    - Question : "${question}"
    - Keep formatting very clean.
    - After the explanation, provide a short and clear title that summarizes the concept for the article or page header.
    - If the explanation includes a code example, provide a small code block.
    - Return the result as a valid JSON object in the following format : 
    {
        "title" : "Short title here?",
        "explanation":"Explanation here."
    }

    Important : Do not add any extra text. Only return valid JSON.

`;

module.exports = {questionAnswerPrompt,conceptExplainPrompt}

