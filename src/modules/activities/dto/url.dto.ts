import { IsRequiredString } from "@/common/decorators/validators/isRequiredString.decorator"

export class UrlDTO {
   @IsRequiredString()
   public "100": string

   @IsRequiredString()
   public "600": string

   constructor(data: UrlDTO) {
      this["100"] = data["100"]
      this["600"] = data["600"]
   }
}
