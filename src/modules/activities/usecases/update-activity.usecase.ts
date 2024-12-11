import { Injectable, Logger } from '@nestjs/common';
import { Activity } from '../activity.entity';
import { ActivityRepository } from '../activity.repository';

@Injectable()
export class UpdateActivityUsecase {
  private logger: Logger;

  constructor(private readonly repository: ActivityRepository) {
    this.logger = new Logger(UpdateActivityUsecase.name);
  }

  public async execute(
    id: string,
    activity: Partial<Activity>,
  ): Promise<Activity> {
    this.logger.log(`Updating activity ${id}`);

    const updatedActivity = await this.repository.update(id, activity);

    this.logger.log(`Activity ${id} updated successfully`);

    return updatedActivity;
  }
}
