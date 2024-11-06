import { Module } from "@nestjs/common";
import { RouterModule } from "@nestjs/core";
import { AppModule } from "./app.module";

@Module({
   imports: [
      AppModule,
      RouterModule.register([
         {
            path: "/endurofortri/api",
            children: [
               {
                  path: "/v1",
                  module: AppModule
               }
            ]
         }
      ])
   ],
})
export class AppRouterModule { }