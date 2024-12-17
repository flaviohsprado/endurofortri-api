import { IsOptionalBoolean } from "@/common/decorators/validators/isOptionalBoolean.decorator"
import { IsOptionalNumber } from "@/common/decorators/validators/isOptionalNumber.decorator"
import { IsOptionalObject } from "@/common/decorators/validators/isOptionalObject.decorator"
import { PrimaryDTO } from "./primary.dto"

export class PhotoDTO {
   @IsOptionalObject({ type: PrimaryDTO })
   public primary: PrimaryDTO

   @IsOptionalBoolean()
   public use_primary_photo: boolean

   @IsOptionalNumber()
   public count: number
}