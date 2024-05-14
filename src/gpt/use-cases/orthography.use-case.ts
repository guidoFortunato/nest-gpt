


import OpenAI from "openai";

interface Options{
    prompt: string;
}

export const orthographyCheckUseCase = async(openai: OpenAI, { prompt }: Options)=>{

    const completion = await openai.chat.completions.create({
        messages: [
            { 
                role: "system", 
                content: `
                    Te serán proveídos textos en español con posibles errores ortograficos y gramaticales.
                    Las palabras usadas deben de existir en el diccionario de la Real Academia Española.
                    Debes responder en formato JSON.
                    Tu tarea es corregirlos y retornar información soluciones.
                    También debes de dar un porcentaje de acierto por el usuario.

                    Si no hay errpres, debes de retornar un mensaje de felicitaciones.

                    Ejemplo de salida:
                    {
                        userScore: number,
                        errors: string[], // ['error -> solución']
                        message: string, // Usa emojis y texto para felicitar al uusario
                    }
                `
            },
            { 
                role: "user", 
                content: prompt
            },
        ],
        model: "gpt-4o-2024-05-13",
        temperature: 0.3,
        response_format: {
            type: "json_object",
        },
        max_tokens: 150
      });

    //   console.log(completion.choices[0].message)

    const jsonResp = JSON.parse(completion.choices[0].message.content)
    
    return jsonResp
    // return completion.choices[0]


    


  
}