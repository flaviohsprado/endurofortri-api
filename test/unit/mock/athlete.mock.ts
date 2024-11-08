import { Athlete } from "@/modules/athlete/athlete.entity"
import { CreateAthleteDTO, UpdateAthleteDTO } from "@/modules/athlete/dto/athlete.dto"
import { AthletePresenter } from "@/modules/athlete/dto/athlete.presenter"

export const createAthleteMock: CreateAthleteDTO = {
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

export const updateAthleteMock: UpdateAthleteDTO = {
   "name": "Test Test",
}

export const createdAthleteMock: Athlete = {
   "id": "1",
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

export const athleteMock: AthletePresenter = {
   "id": "1",
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