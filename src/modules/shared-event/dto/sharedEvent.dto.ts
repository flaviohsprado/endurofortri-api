import { IsRequiredNumber } from "@/common/decorators/validators/isRequiredNumber.decorator"
import { IsRequiredString } from "@/common/decorators/validators/isRequiredString.decorator"
import { Category, Type, Visibility } from "@/enums/sharedEvent.enum"
import { ApiProperty } from "@nestjs/swagger"
import { IsArray, IsEnum, IsNotEmpty } from "class-validator"

export class CreateSharedEventDTO {
   @IsRequiredString()
   public external_id: string
   @IsRequiredString()
   public athlete_id: string
   @IsRequiredString(null, { enum: Category })
   public category: Category
   @IsArray()
   @IsEnum(Type, { each: true })
   @IsNotEmpty()
   @ApiProperty()
   public types: Type[]
   @IsRequiredString()
   public name: string
   @IsRequiredString()
   public start_date_local: string
   @IsRequiredString(null, { enum: Visibility })
   public visibility: Visibility
   @IsRequiredNumber()
   public chat_id: number
   @IsRequiredString()
   public description: string
   @IsRequiredString()
   public website: string
   @IsRequiredString()
   public closing_date_local: string
   @IsRequiredString()
   public location: string
   @IsRequiredString()
   public address: string
   @IsRequiredString()
   public country: string
   @IsRequiredString()
   public region: string
   @IsRequiredNumber()
   public lat: number
   @IsRequiredNumber()
   public lon: number
   @IsRequiredString()
   public route_file: string
   @IsRequiredString()
   public polyline: string
   @IsRequiredNumber()
   public usage_count: number
   @IsRequiredString()
   public athleteId: string

   constructor(props: CreateSharedEventDTO) {
      Object.assign(this, props)
   }
}

export class UpdateSharedEventDTO {
   @IsRequiredString()
   public external_id: string
   @IsRequiredString()
   public athlete_id: string
   @IsRequiredString(null, { enum: Category })
   public category: Category
   @IsArray()
   @IsEnum(Type, { each: true })
   @IsNotEmpty()
   @ApiProperty()
   public types: Type[]
   @IsRequiredString()
   public name: string
   @IsRequiredString()
   public start_date_local: string
   @IsRequiredString(null, { enum: Visibility })
   public visibility: Visibility
   @IsRequiredNumber()
   public chat_id: number
   @IsRequiredString()
   public description: string
   @IsRequiredString()
   public website: string
   @IsRequiredString()
   public closing_date_local: string
   @IsRequiredString()
   public location: string
   @IsRequiredString()
   public address: string
   @IsRequiredString()
   public country: string
   @IsRequiredString()
   public region: string
   @IsRequiredNumber()
   public lat: number
   @IsRequiredNumber()
   public lon: number
   @IsRequiredString()
   public route_file: string
   @IsRequiredString()
   public polyline: string
   @IsRequiredNumber()
   public usage_count: number
   @IsRequiredString()
   public athleteId: string

   constructor(props: UpdateSharedEventDTO) {
      Object.assign(this, props)
   }
}