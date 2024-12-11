import { Athlete } from "@/modules/athlete/athlete.entity"
import { CreateAthleteDTO, UpdateAthleteDTO } from "@/modules/athlete/dto/athlete.dto"
import { AthletePresenter } from "@/modules/athlete/dto/athlete.presenter"

export const createAthleteMock: CreateAthleteDTO = {
   name: 'John Doe',
   email: 'john@example.com',
   password: 'hashedPassword',
}

export const updateAthleteMock: UpdateAthleteDTO = {
   "name": "Test Test",
}

export const athleteMock: Athlete = {
   "id": "1",
   "name": 'John Doe',
   "email": 'john@example.com',
   "password": 'hashedPassword',
   "profile_medium": "N/A",
   "city": "São Paulo",
   "state": "SP",
   "country": "Brazil",
   "timezone": "East UTC-3",
   "sex": "male",
   "bio": "N/A",
   "website": "N/A",
   "weight": 100,
   "height": 180,
   "strava_access_token": "123456",
}

export const createdAthleteMock: Athlete = {
   "id": "1",
   "name": 'John Doe',
   "email": 'john@example.com',
   "password": 'hashedPassword',
   "profile_medium": "N/A",
   "city": "São Paulo",
   "state": "SP",
   "country": "Brazil",
   "timezone": "East UTC-3",
   "sex": "male",
   "bio": "N/A",
   "website": "N/A",
   "weight": 100,
   "height": 180,
   "strava_access_token": "123456"
}

export const athletePresenterMock: AthletePresenter = {
   "id": "1",
   "name": 'John Doe',
   "email": 'john@example.com',
   "profile_medium": "N/A",
   "city": "São Paulo",
   "state": "SP",
   "country": "Brazil",
   "timezone": "East UTC-3",
   "sex": "male",
   "bio": "N/A",
   "website": "N/A",
   "weight": 100,
   "height": 180,
   "strava_access_token": "123456",
   "access_token": "access_token"
}
