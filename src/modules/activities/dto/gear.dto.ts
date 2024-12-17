import { IsRequiredBoolean } from "@/common/decorators/validators/isRequiredBoolean.decorator"
import { IsRequiredNumber } from "@/common/decorators/validators/isRequiredNumber.decorator"
import { IsRequiredString } from "@/common/decorators/validators/isRequiredString.decorator"

export class GearDTO {
   @IsRequiredString()
   public id: string

   @IsRequiredBoolean()
   public primary: boolean

   @IsRequiredString()
   public name: string

   @IsRequiredNumber()
   public resource_state: number

   @IsRequiredNumber()
   public distance: number
}