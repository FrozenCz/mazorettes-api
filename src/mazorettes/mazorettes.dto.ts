import { IsInt, IsString } from 'class-validator';

export class ResultValidation {
  @IsInt()
  ordNumber: number;

  @IsInt()
  choreography: number;

  @IsInt()
  difficulty: number;

  @IsInt()
  costumes: number;

  @IsInt()
  overall: number;

  @IsInt()
  facialExpression: number;

  @IsInt()
  music: number;

  @IsInt()
  faults: number;

  @IsInt()
  synchro: number;

  @IsInt()
  formationChange: number;

  @IsString()
  note: string;
}
