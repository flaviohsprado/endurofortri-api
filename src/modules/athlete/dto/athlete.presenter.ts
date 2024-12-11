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
   @ApiProperty()
   public weight: number
   @ApiProperty()
   public height: number
   @ApiProperty()
   public access_token?: string
   @ApiProperty()
   public strava_access_token?: string

   constructor(props: AthletePresenter) {
      this.id = props.id
      this.name = props.name
      this.profile_medium = props.profile_medium
      this.city = props.city
      this.state = props.state
      this.country = props.country
      this.timezone = props.timezone
      this.sex = props.sex
      this.bio = props.bio
      this.website = props.website
      this.email = props.email
      this.weight = props.weight
      this.height = props.height
      this.access_token = props.access_token
      this.strava_access_token = props.strava_access_token
   }
}