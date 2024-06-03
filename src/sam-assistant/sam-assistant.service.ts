import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import {
  checkCompleteStatusUseCase,
  createMessageUseCase,
  createRunUseCase,
  createThreadUseCase,
  getMessageListUseCase,
} from './use-cases';
import { QuestionDto } from './dtos/question.dto';

@Injectable()
export class SamAssistantService {
  private openAi = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  async createThread() {
    return await createThreadUseCase(this.openAi);
  }

  async userQuestion(questionDto: QuestionDto) {
    const { threadId, question } = questionDto;

    const message = await createMessageUseCase(this.openAi, {
      threadId,
      question,
    });

    const run = await createRunUseCase(this.openAi, { threadId });

    await checkCompleteStatusUseCase(this.openAi, {
      runId: run.id,
      threadId: threadId,
    });

    const messages = await getMessageListUseCase(this.openAi, { threadId });

    return messages.reverse();
  }
}
