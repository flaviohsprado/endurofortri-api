import { IsOptionalBoolean } from "@/common/decorators/validators/isOptionalBoolean.decorator"
import { IsOptionalNumber } from "@/common/decorators/validators/isOptionalNumber.decorator"
import { IsOptionalString } from "@/common/decorators/validators/isOptionalString.decorator"
import { IsRequiredBoolean } from "@/common/decorators/validators/isRequiredBoolean.decorator"
import { IsRequiredNumber } from "@/common/decorators/validators/isRequiredNumber.decorator"
import { IsRequiredString } from "@/common/decorators/validators/isRequiredString.decorator"
import { FieldId, GearType } from "@/enums/gear.enum"
import { ApiProperty } from "@nestjs/swagger"
import { IsArray, IsEnum, IsNotEmpty, IsObject } from "class-validator"

export class CreateActivityFilterDTO {
   @IsRequiredString()
   public gear_id: string
   @ApiProperty({ required: true })
   @IsEnum(GearType, { message: '$property must be a valid enum value' })
   public field_id: FieldId
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
   @IsOptionalString()
   public athlete_id: string
   @IsRequiredString()
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

   constructor(partial: Partial<CreateGearDTO>) {
      Object.assign(this, partial)
   }
}

export class UpdateGearDTO {
   @IsOptionalString()
   public athlete_id?: string
   @IsEnum(GearType, { message: '$property must be a valid enum value' })
   public type?: GearType
   @IsOptionalString()
   public name?: string
   @IsOptionalString()
   public purchased?: string
   @IsOptionalString()
   public notes?: string
   @IsOptionalNumber()
   public distance?: number
   @IsOptionalNumber()
   public time?: number
   @IsOptionalNumber()
   public activities?: number
   @IsOptionalBoolean()
   public use_elapsed_time?: boolean
   @IsOptionalString()
   public retired?: string
   //@IsEmpty()   
   //@IsArray({ message: '$property must be an array' })
   @ApiProperty({ required: false, isArray: true })
   public component_ids?: string[]
   @IsOptionalBoolean()
   public component?: boolean

   constructor(partial: Partial<UpdateGearDTO>) {
      Object.assign(this, partial)
   }
}