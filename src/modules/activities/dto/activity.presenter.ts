import { FieldId, GearType } from "@/enums/gear.enum"
import { ApiProperty } from "@nestjs/swagger"

export class ActivityFilterPresenter {
   @ApiProperty()
   public id: string
   @ApiProperty()
   public field_id: FieldId
   @ApiProperty()
   public code: string
   @ApiProperty()
   public operator: string
   @ApiProperty()
   public value: object
}

export class GearPresenter {
   @ApiProperty()
   public id: string
   @ApiProperty()
   public athlete_id: string
   @ApiProperty({ enum: GearType })
   public type: GearType
   @ApiProperty()
   public name: string
   @ApiProperty()
   public purchased: string
   @ApiProperty()
   public notes: string
   @ApiProperty()
   public distance: number
   @ApiProperty()
   public time: number
   @ApiProperty()
   public activities: number
   @ApiProperty()
   public use_elapsed_time: boolean
   @ApiProperty()
   public retired: string
   @ApiProperty()
   public component_ids: string[]
   @ApiProperty()
   public component: boolean

   constructor(props: GearPresenter) {
      this.id = props.id
      this.athlete_id = props.athlete_id
      this.type = props.type
      this.name = props.name
      this.purchased = props.purchased
      this.notes = props.notes
      this.distance = props.distance
      this.time = props.time
      this.activities = props.activities
      this.use_elapsed_time = props.use_elapsed_time
      this.retired = props.retired
      this.component_ids = props.component_ids
      this.component = props.component
   }
}

