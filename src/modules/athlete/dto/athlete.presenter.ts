import { ApiProperty } from "@nestjs/swagger"

export class AthletePresenter {
   @ApiProperty()
   public id: string
   @ApiProperty()
   public name: string
   @ApiProperty()
   public profile_medium: string
   @ApiProperty()
   public city: string
   @ApiProperty()
   public state: string
   @ApiProperty()
   public country: string
   @ApiProperty()
   public timezone: string
   @ApiProperty()
   public sex: string
   @ApiProperty()
   public bio: string
   @ApiProperty()
   public website: string
   @ApiProperty()
   public email: string

   constructor(props: AthletePresenter) {
      Object.assign(this, props)
   }
}