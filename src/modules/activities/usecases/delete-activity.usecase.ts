import { Injectable, Logger } from '@nestjs/common';
import { ActivityRepository } from '../activity.repository';
import { Activity } from '../entities/activity.entity';

@Injectable()
export class DeleteActivityUsecase {
  private logger: Logger;

  constructor(private readonly repository: ActivityRepository) {
    this.logger = new Logger(DeleteActivityUsecase.name);
  }

  public async execute(id: string): Promise<Activity> {
    this.logger.log(`Deleting activity ${id}`);

    const deletedActivity = await this.repository.delete(id);

    if (deletedActivity) {
      this.logger.log(`Activity ${id} deleted successfully`);
    } else {
      this.logger.warn(`Activity ${id} not found`);
    }

    return deletedActivity;
  }
}
