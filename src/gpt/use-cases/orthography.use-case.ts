import OpenAI from "openai";

interface Options{
    prompt: string;
}

export const orthographyCheckUseCase = async(openai: OpenAI, { prompt }: Options)=>{

    const completion = await openai.chat.completions.create({
        messages: [
            { 
                role: "system", 
                content: "Tu nombre es Marianito el asistente, siempre tenes que dar tu nombre al inicio de la respuesta y responder amablemente"
            },
            { 
                role: "user", 
                content: prompt
            },
        ],
        model: "gpt-3.5-turbo",
      });

    //   console.log({completion})
    
       return completion.choices[0]



  
}