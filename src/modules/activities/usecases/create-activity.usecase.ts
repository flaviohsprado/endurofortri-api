import { Injectable, Logger } from '@nestjs/common';
import { Activity } from '../activity.entity';
import { ActivityRepository } from '../activity.repository';

@Injectable()
export class CreateActivityUsecase {
  private logger: Logger;

  constructor(private readonly repository: ActivityRepository) {
    this.logger = new Logger(CreateActivityUsecase.name);
  }

  public async execute(activity: Partial<Activity>): Promise<Activity> {
    this.logger.log(`Creating activity ${activity.name}`);

    const createdActivity = await this.repository.create(activity);

    this.logger.log(`Activity created with ID ${createdActivity.id}`);

    return createdActivity;
  }
}
