import { IsRequiredBoolean } from "@/common/decorators/validators/isRequiredBoolean.decorator"
import { IsRequiredNumber } from "@/common/decorators/validators/isRequiredNumber.decorator"
import { IsRequiredString } from "@/common/decorators/validators/isRequiredString.decorator"
import { GearType } from "@/enums/gear.enum"
import { CreateReminderDTO } from "@/modules/reminder/dto/reminder.dto"
import { ApiProperty } from "@nestjs/swagger"
import { IsArray, IsEnum, IsNotEmpty, IsObject } from "class-validator"

class CreateActivityFilterDTO {
   @IsRequiredString()
   public gear_id: string
   @IsRequiredString()
   public field_id: string
   @IsRequiredString()
   public code: string
   @IsRequiredString()
   public operator: string
   @IsObject()
   @ApiProperty({ required: true })
   public value: object
   @IsRequiredBoolean()
   public not: boolean
}

export class CreateGearDTO {
   @IsRequiredString()
   public athlete_id: string
   @IsEnum(GearType, { message: '$property must be a valid enum value' })
   public type: GearType
   @IsRequiredString()
   public name: string
   @IsRequiredString()
   public purchased: string
   @IsRequiredString()
   public notes: string
   @IsRequiredNumber()
   public distance: number
   @IsRequiredNumber()
   public time: number
   @IsRequiredNumber()
   public activities: number
   @IsRequiredBoolean()
   public use_elapsed_time: boolean
   @IsRequiredString()
   public retired: string
   @IsNotEmpty()
   @ApiProperty({ required: true, isArray: true })
   @IsArray({ message: '$property must be an array' })
   public component_ids: string[]
   @IsRequiredBoolean()
   public component: boolean
   @IsArray()
   @ApiProperty({ required: false, isArray: true })
   @IsObject({ each: true })
   public reminders?: CreateReminderDTO[]
   @IsArray()
   @ApiProperty({ required: false, isArray: true })
   @IsObject({ each: true })
   public activity_filters?: CreateActivityFilterDTO[]
}