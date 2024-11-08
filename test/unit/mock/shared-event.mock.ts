import { Category, Type, Visibility } from "@/enums/sharedEvent.enum";
import { CreateSharedEventDTO, UpdateSharedEventDTO } from "@/modules/shared-event/dto/sharedEvent.dto";
import { SharedEventPresenter } from "@/modules/shared-event/dto/sharedEvent.presenter";
import { SharedEvent } from "@/modules/shared-event/shared-event.entity";
import { athleteMock } from "./athlete.mock";

export const sharedEventEntityMock: SharedEvent = {
   "id": "63a0cefd-db0b-452d-949a-1891161b2e8a",
   "external_id": "swimming",
   "athlete_id": "string",
   "category": Category.RACE,
   "types": [
      Type.Swim
   ],
   "name": "string",
   "start_date_local": "string",
   "visibility": Visibility.PUBLIC,
   "chat_id": 0,
   "description": "string",
   "website": "string",
   "closing_date_local": "string",
   "location": "string",
   "address": "string",
   "country": "string",
   "region": "string",
   "lat": 0,
   "lon": 0,
   "route_file": "string",
   "polyline": "string",
   "usage_count": 0,
   "athleteId": "2077ccba-baa0-4672-8419-2cd86eccd9f5",
   "athlete": athleteMock
}

export const sharedEventsEntityMock: SharedEvent[] = [sharedEventEntityMock]

export const createSharedEventMock: CreateSharedEventDTO = {
   "external_id": "swimming",
   "athlete_id": "string",
   "category": Category.RACE,
   "types": [
      Type.Swim
   ],
   "name": "string",
   "start_date_local": "string",
   "visibility": Visibility.PUBLIC,
   "chat_id": 0,
   "description": "string",
   "website": "string",
   "closing_date_local": "string",
   "location": "string",
   "address": "string",
   "country": "string",
   "region": "string",
   "lat": 0,
   "lon": 0,
   "route_file": "string",
   "polyline": "string",
   "usage_count": 0,
   "athleteId": "2077ccba-baa0-4672-8419-2cd86eccd9f5"
}

export const updateSharedEventMock: UpdateSharedEventDTO = {
   "external_id": "Shared Event",
   "athlete_id": "string",
   "category": Category.RACE,
   "types": [
      Type.Ride
   ],
   "name": "string",
   "start_date_local": "string",
   "visibility": Visibility.PUBLIC,
   "chat_id": 0,
   "description": "string",
   "website": "string",
   "closing_date_local": "string",
   "location": "string",
   "address": "string",
   "country": "string",
   "region": "string",
   "lat": 0,
   "lon": 0,
   "route_file": "string",
   "polyline": "string",
   "usage_count": 0,
   "athleteId": "d0ab7fb1-99c0-4059-b3bb-0bd46cda74df"
}

export const sharedEventMock: SharedEventPresenter = {
   "external_id": "swimming",
   "athlete_id": "string",
   "category": Category.RACE,
   "types": [
      Type.Swim
   ],
   "name": "string",
   "start_date_local": "string",
   "visibility": Visibility.PUBLIC,
   "chat_id": 0,
   "description": "string",
   "website": "string",
   "closing_date_local": "string",
   "location": "string",
   "address": "string",
   "country": "string",
   "region": "string",
   "lat": 0,
   "lon": 0,
   "route_file": "string",
   "polyline": "string",
   "usage_count": 0,
   "id": "63a0cefd-db0b-452d-949a-1891161b2e8a",
   "athlete": athleteMock
}

export const sharedEventsMock: SharedEventPresenter[] = [sharedEventMock]