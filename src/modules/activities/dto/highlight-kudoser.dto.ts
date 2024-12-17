import { IsRequiredBoolean } from "@/common/decorators/validators/isRequiredBoolean.decorator"
import { IsRequiredString } from "@/common/decorators/validators/isRequiredString.decorator"

export class HighlightedKudoserDTO {
   @IsRequiredString()
   public destination_url: string

   @IsRequiredString()
   public display_name: string

   @IsRequiredString()
   public avatar_url: string

   @IsRequiredBoolean()
   public show_name: boolean

   constructor(data: HighlightedKudoserDTO) {
      this.destination_url = data.destination_url
      this.display_name = data.display_name
      this.avatar_url = data.avatar_url
      this.show_name = data.show_name
   }
}
