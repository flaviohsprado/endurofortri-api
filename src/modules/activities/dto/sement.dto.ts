import { IsOptionalArray } from "@/common/decorators/validators/isOptionalArray.decorator"
import { IsRequiredBoolean } from "@/common/decorators/validators/isRequiredBoolean.decorator"
import { IsRequiredNumber } from "@/common/decorators/validators/isRequiredNumber.decorator"
import { IsRequiredString } from "@/common/decorators/validators/isRequiredString.decorator"

export class SegmentDTO {
   @IsRequiredNumber()
   public id: number

   @IsRequiredNumber()
   public resource_state: number

   @IsRequiredString()
   public name: string

   @IsRequiredString()
   public activity_type: string

   @IsRequiredNumber()
   public distance: number

   @IsRequiredNumber()
   public average_grade: number

   @IsRequiredNumber()
   public maximum_grade: number

   @IsRequiredNumber()
   public elevation_high: number

   @IsRequiredNumber()
   public elevation_low: number

   @IsOptionalArray({ type: Array<number> })
   public start_latlng: number[]

   @IsOptionalArray({ type: Array<number> })
   public end_latlng: number[]

   @IsRequiredNumber()
   public climb_category: number

   @IsRequiredString()
   public city: string

   @IsRequiredString()
   public state: string

   @IsRequiredString()
   public country: string

   @IsRequiredBoolean()
   public private: boolean

   @IsRequiredBoolean()
   public hazardous: boolean

   @IsRequiredBoolean()
   public starred: boolean

   constructor(data: SegmentDTO) {
      this.id = data.id
      this.resource_state = data.resource_state
      this.name = data.name
      this.activity_type = data.activity_type
      this.distance = data.distance
      this.average_grade = data.average_grade
      this.maximum_grade = data.maximum_grade
      this.elevation_high = data.elevation_high
      this.elevation_low = data.elevation_low
      this.start_latlng = data.start_latlng
      this.end_latlng = data.end_latlng
      this.climb_category = data.climb_category
      this.city = data.city
      this.state = data.state
      this.country = data.country
      this.private = data.private
      this.hazardous = data.hazardous
      this.starred = data.starred
   }
}
