import { Injectable } from '@nestjs/common';
import { Assignee, Category, Result, SetResult } from './model';
import { ResultEntity } from './result.entity';

@Injectable()
export class MazorettesService {
  async setResults(result: SetResult): Promise<void> {
    let resultEntity = await ResultEntity.findOne({
      where: {
        ordNumber: result.ordNumber,
        refereeNumber: result.refereeNumber,
      },
    });
    if (!resultEntity) {
      resultEntity = new ResultEntity();
    }

    resultEntity.refereeNumber = result.refereeNumber;
    resultEntity.ordNumber = result.ordNumber;
    resultEntity.note = result.note;
    resultEntity.category = result.category;
    resultEntity.costumes = result.costumes;
    resultEntity.choreography = result.choreography;
    resultEntity.formationChange = result.formationChange;
    resultEntity.music = result.music;
    resultEntity.facialExpression = result.facialExpression;
    resultEntity.difficulty = result.difficulty;
    resultEntity.faults = result.faults;
    resultEntity.overall = result.overall;
    resultEntity.synchro = result.synchro;

    await resultEntity.save();
    return;
  }

  async getAssignees(): Promise<Assignee[]> {
    const results = await ResultEntity.find();

    const assignees: Map<number, Assignee> = new Map<number, Assignee>();

    results.forEach((result) => {
      const assignee: Assignee =
        assignees.get(result.ordNumber) ??
        this.createEmptyAssignee(result.ordNumber);
      const fuzedValues = this.fuzeValues(assignee, result);
      assignees.set(result.ordNumber, fuzedValues);
    });

    return Array.from(assignees.values());
  }

  private createEmptyAssignee(ordNumber: number): Assignee {
    return {
      ordNumber,
      category: {},
      choreography: {},
      difficulty: {},
      costumes: {},
      overall: {},
      facialExpression: {},
      music: {},
      faults: {},
      notes: {},
      synchro: {},
      formationChange: {},
      mainCategory: Category.solo,
    };
  }

  private fuzeValues(assignee: Assignee, result: ResultEntity): Assignee {
    assignee.category[result.refereeNumber] = result.category;
    assignee.notes[result.refereeNumber] = result.note;
    assignee.costumes[result.refereeNumber] = result.costumes;
    assignee.choreography[result.refereeNumber] = result.choreography;
    assignee.formationChange[result.refereeNumber] = result.formationChange;
    assignee.music[result.refereeNumber] = result.music;
    assignee.facialExpression[result.refereeNumber] = result.facialExpression;
    assignee.difficulty[result.refereeNumber] = result.difficulty;
    assignee.faults[result.refereeNumber] = result.faults;
    assignee.overall[result.refereeNumber] = result.overall;
    assignee.synchro[result.refereeNumber] = result.synchro;
    assignee.mainCategory = this.getMainCategory(assignee.category);
    return assignee;
  }

  private getMainCategory(cat: Result): Category {
    const cats = [];
    let prop: string;
    for (prop in cat) {
      cats.push(cat[prop]);
    }
    return this.mostRecentNumber(cats);
  }

  private mostRecentNumber(numbers: number[]): number | undefined {
    const founds: { [number: number]: number } = {};

    for (const number of numbers) {
      if (founds[number]) {
        founds[number]++;
      } else {
        founds[number] = 1;
      }
    }

    let recentNumber: number | undefined;
    let founded = 0;

    for (const number in founds) {
      if (founds[number] > founded) {
        founded = founds[number];
        recentNumber = +number;
      }
    }

    return recentNumber;
  }
}
