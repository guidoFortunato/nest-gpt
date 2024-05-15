import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { orthographyCheckUseCase, prosConsDicusserStreamUseCase, prosConsDicusserUseCase } from './use-cases';
import { ProsConsDiscusserDto, OrthographyDto } from './dtos';

@Injectable()
export class GptService {
  private openAi = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  // Solo va a llamar casos de uso
  async orthographyCheck(orthographyDto: OrthographyDto) {
    return await orthographyCheckUseCase(this.openAi, {
      prompt: orthographyDto.prompt,
    });
  }

  async prosConsDicusser({ prompt }: ProsConsDiscusserDto) {
    return await prosConsDicusserUseCase(this.openAi, { prompt });
  }

  async prosConsDicusserStream({ prompt }: ProsConsDiscusserDto) {
    return await prosConsDicusserStreamUseCase(this.openAi, { prompt });
  }
}
