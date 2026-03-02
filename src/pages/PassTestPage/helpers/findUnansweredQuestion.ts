export const findUnansweredQuestion = (questions: string[], answeredQuestions: Record<string, number>) => {
  let unansweredQuestion = '';

  if (!Object.keys(answeredQuestions).length) {
    return questions[0];
  }

  for (const qId of questions) {
    if (answeredQuestions[qId] === undefined) {
      unansweredQuestion = qId;
      break;
    }
  }

  return unansweredQuestion;
}