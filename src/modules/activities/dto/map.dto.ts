import { IsOptionalNumber } from "@/common/decorators/validators/isOptionalNumber.decorator"
import { IsOptionalString } from "@/common/decorators/validators/isOptionalString.decorator"
import { IsRequiredString } from "@/common/decorators/validators/isRequiredString.decorator"

export class MapDTO {
   @IsRequiredString()
   public id: string

   @IsOptionalString()
   public polyline?: string

   @IsOptionalNumber()
   public resource_state: number

   @IsOptionalString()
   public summary_polyline: string

   constructor(props: MapDTO) {
      this.id = props.id
      this.polyline = props.polyline
      this.resource_state = props.resource_state
      this.summary_polyline = props.summary_polyline
   }
}
