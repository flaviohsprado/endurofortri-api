import { IsOptionalNumber } from "@/common/decorators/validators/isOptionalNumber.decorator"

export class SplitsMetricDTO {
   @IsOptionalNumber()
   public distance: number

   @IsOptionalNumber()
   public elapsed_time: number

   @IsOptionalNumber()
   public elevation_difference: number

   @IsOptionalNumber()
   public moving_time: number

   @IsOptionalNumber()
   public split: number

   @IsOptionalNumber()
   public average_speed: number

   @IsOptionalNumber()
   public pace_zone: number

   constructor(data: SplitsMetricDTO) {
      this.distance = data.distance
      this.elapsed_time = data.elapsed_time
      this.elevation_difference = data.elevation_difference
      this.moving_time = data.moving_time
      this.split = data.split
      this.average_speed = data.average_speed
      this.pace_zone = data.pace_zone
   }
}
