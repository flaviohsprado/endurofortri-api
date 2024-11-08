import { GearType } from "@/enums/gear.enum";
import { CreateGearDTO, UpdateGearDTO } from "@/modules/gear/dto/gear.dto";
import { GearPresenter } from "@/modules/gear/dto/gear.presenter";
import { Gear } from "@/modules/gear/gear.entity";

export const gearEntityMock: Gear = {
   "id": "6140abca-f98f-4b15-abc0-d46bab55e66b",
   "athlete_id": "2077ccba-baa0-4672-8419-2cd86eccd9f5",
   "type": GearType.BIKE,
   "name": "Monark",
   "purchased": "yes",
   "notes": "N/A",
   "distance": 100,
   "time": 0,
   "activities": 0,
   "use_elapsed_time": false,
   "retired": "string",
   "component_ids": [
      "string"
   ],
   "component": true,
   "reminders": [],
   "activity_filters": [],
   "athlete": {
      "id": "2077ccba-baa0-4672-8419-2cd86eccd9f5",
      "name": "Test",
      "profile_medium": "N/A",
      "city": "São Paulo",
      "state": "SP",
      "country": "Brazil",
      "timezone": "East UTC-3",
      "sex": "male",
      "bio": "N/A",
      "website": "N/A",
      "email": "test@gmail.com"
   }
}

export const gearEntitiesMock: Gear[] = [gearEntityMock]

export const gearMock: GearPresenter = {
   "id": "6140abca-f98f-4b15-abc0-d46bab55e66b",
   "athlete_id": "2077ccba-baa0-4672-8419-2cd86eccd9f5",
   "type": GearType.BIKE,
   "name": "Monark",
   "purchased": "yes",
   "notes": "N/A",
   "distance": 100,
   "time": 0,
   "activities": 0,
   "use_elapsed_time": false,
   "retired": "string",
   "component_ids": [
      "string"
   ],
   "component": true,
   "reminders": [],
   "activity_filters": []
}

export const gearsMock: GearPresenter[] = [
   {
      "id": "6140abca-f98f-4b15-abc0-d46bab55e66b",
      "athlete_id": "2077ccba-baa0-4672-8419-2cd86eccd9f5",
      "type": GearType.BIKE,
      "name": "Monark",
      "purchased": "yes",
      "notes": "N/A",
      "distance": 100,
      "time": 0,
      "activities": 0,
      "use_elapsed_time": false,
      "retired": "string",
      "component_ids": [
         "string"
      ],
      "component": true,
      "reminders": [],
      "activity_filters": []
   }
]

export const createGearMock: CreateGearDTO = {
   "athlete_id": "2077ccba-baa0-4672-8419-2cd86eccd9f5",
   "type": GearType.BIKE,
   "name": "string",
   "purchased": "string",
   "notes": "string",
   "distance": 0,
   "time": 0,
   "activities": 0,
   "use_elapsed_time": false,
   "retired": "string",
   "component_ids": [
      "string"
   ],
   "component": false
}

export const updateGearMock: UpdateGearDTO = {
   "type": GearType.BIKE,
   "name": "Monark",
   "purchased": "yes",
   "notes": "N/A",
   "distance": 100,
   "component": true
}