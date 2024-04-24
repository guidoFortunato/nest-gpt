import { Injectable } from '@nestjs/common';
import { orthographyCheckUseCase } from './use-cases';

@Injectable()
export class GptService {

    // Solo va a llamar casos de uso
    async orthographyCheck(){
        return await orthographyCheckUseCase();
    }


}
