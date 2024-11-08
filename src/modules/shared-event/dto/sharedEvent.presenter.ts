import { Category, Type, Visibility } from "@/enums/sharedEvent.enum"
import { AthletePresenter } from "@/modules/athlete/dto/athlete.presenter"
import { ApiProperty } from "@nestjs/swagger"

export class SharedEventPresenter {
   @ApiProperty()
   public id: string
   @ApiProperty()
   public external_id: string
   @ApiProperty()
   public athlete_id: string
   @ApiProperty()
   public category: Category
   @ApiProperty({ enum: Type, isArray: true })
   public types: Type[]
   @ApiProperty()
   public name: string
   @ApiProperty()
   public start_date_local: string
   @ApiProperty()
   public visibility: Visibility
   @ApiProperty()
   public chat_id: number
   @ApiProperty()
   public description: string
   @ApiProperty()
   public website: string
   @ApiProperty()
   public closing_date_local: string
   @ApiProperty()
   public location: string
   @ApiProperty()
   public address: string
   @ApiProperty()
   public country: string
   @ApiProperty()
   public region: string
   @ApiProperty()
   public lat: number
   @ApiProperty()
   public lon: number
   @ApiProperty()
   public route_file: string
   @ApiProperty()
   public polyline: string
   @ApiProperty()
   public usage_count: number
   @ApiProperty({ type: AthletePresenter })
   public athlete: AthletePresenter

   constructor(props: SharedEventPresenter) {
      this.id = props.id
      this.external_id = props.external_id
      this.athlete_id = props.athlete_id
      this.category = props.category
      this.types = props.types
      this.name = props.name
      this.start_date_local = props.start_date_local
      this.visibility = props.visibility
      this.chat_id = props.chat_id
      this.description = props.description
      this.website = props.website
      this.closing_date_local = props.closing_date_local
      this.location = props.location
      this.address = props.address
      this.country = props.country
      this.region = props.region
      this.lat = props.lat
      this.lon = props.lon
      this.route_file = props.route_file
      this.polyline = props.polyline
      this.usage_count = props.usage_count
      this.athlete = new AthletePresenter(props.athlete)
   }
}