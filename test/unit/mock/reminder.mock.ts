import { CreateReminderDTO, UpdateReminderDTO } from "@/modules/reminder/dto/reminder.dto";
import { ReminderPresenter } from "@/modules/reminder/dto/reminder.presenter";
import { Reminder } from "@/modules/reminder/reminder.entity";

export const reminderEntityMock: Reminder = {
   "id": "362506a8-0688-4ace-b60e-30295ceb20fe",
   "gear_id": "6140abca-f98f-4b15-abc0-d46bab55e66b",
   "name": "cooper",
   "distance": 5000,
   "time": 24,
   "activities": 0,
   "days": 13,
   "last_reset": new Date("1970-01-01T00:00:00.000Z"),
   "starting_distance": 0,
   "starting_time": 0,
   "starting_activities": 0,
   "snoozed_until": new Date("1970-01-01T00:00:00.000Z"),
   "percent_used": 0,
   "distance_used": 0,
   "time_used": 0,
   "activities_used": 0,
   "days_used": 0
}

export const reminderEntitiesMock: Reminder[] = [reminderEntityMock]

export const remindersMock: ReminderPresenter[] = [
   {
      "id": "362506a8-0688-4ace-b60e-30295ceb20fe",
      "gear_id": "6140abca-f98f-4b15-abc0-d46bab55e66b",
      "name": "cooper",
      "distance": 5000,
      "time": 24,
      "activities": 0,
      "days": 13,
      "last_reset": new Date("1970-01-01T00:00:00.000Z"),
      "starting_distance": 0,
      "starting_time": 0,
      "starting_activities": 0,
      "snoozed_until": new Date("1970-01-01T00:00:00.000Z"),
      "percent_used": 0,
      "distance_used": 0,
      "time_used": 0,
      "activities_used": 0,
      "days_used": 0
   }
]

export const reminderMock: ReminderPresenter = {
   "id": "362506a8-0688-4ace-b60e-30295ceb20fe",
   "gear_id": "6140abca-f98f-4b15-abc0-d46bab55e66b",
   "name": "cooper",
   "distance": 5000,
   "time": 24,
   "activities": 0,
   "days": 13,
   "last_reset": new Date("1970-01-01T00:00:00.000Z"),
   "starting_distance": 0,
   "starting_time": 0,
   "starting_activities": 0,
   "snoozed_until": new Date("1970-01-01T00:00:00.000Z"),
   "percent_used": 0,
   "distance_used": 0,
   "time_used": 0,
   "activities_used": 0,
   "days_used": 0
}

export const createReminderMock: CreateReminderDTO = {
   "name": "cooper",
   "distance": 5000,
   "time": 24,
   "activities": 0,
   "days": 13,
   "last_reset": new Date("1970-01-01T00:00:00.000Z"),
   "starting_distance": 0,
   "starting_time": 0,
   "starting_activities": 0,
   "snoozed_until": new Date("1970-01-01T00:00:00.000Z"),
   "percent_used": 0,
   "distance_used": 0,
   "time_used": 0,
   "activities_used": 0,
   "days_used": 0
}

export const updateReminderMock: UpdateReminderDTO = {
   "name": "cooper",
   "distance": 5000,
   "time": 24,
   "activities": 0,
   "days": 13,
}