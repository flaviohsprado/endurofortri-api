import { IsOptionalNumber } from "@/common/decorators/validators/isOptionalNumber.decorator"
import { IsOptionalObject } from "@/common/decorators/validators/isOptionalObject.decorator"
import { IsOptionalString } from "@/common/decorators/validators/isOptionalString.decorator"
import { IsRequiredString } from "@/common/decorators/validators/isRequiredString.decorator"
import { UrlDTO } from "./url.dto"

export class PrimaryDTO {
   @IsRequiredString()
   public id: any

   @IsOptionalString()
   public unique_id: string

   @IsOptionalObject({ type: UrlDTO })
   public urls: UrlDTO

   @IsOptionalNumber()
   public source: number

   constructor(data: PrimaryDTO) {
      this.id = data.id
      this.unique_id = data.unique_id
      this.urls = data.urls
      this.source = data.source
   }
}
