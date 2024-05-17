import OpenAI from 'openai';

interface Options {
  prompt: string;
}

export const prosConsDicusserUseCase = async (
  openai: OpenAI,
  { prompt }: Options,
) => {
  const response = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: `
        Se te dará una pregunta y tu tarea es dar una respuesta con pros y contras.
        La respuesta debe de ser en formato markdown.
        Los pros y contras deben de estar en una lista.
              `,
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    model: 'gpt-3.5-turbo-1106',
    max_tokens: 500,
    temperature: 0.8,
  });

  //   console.log(completion.choices[0].message)

  return response.choices[0].message;
  // return completion.choices[0]
};
