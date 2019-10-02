import "reflect-metadata";
import { Transform } from "class-transformer";
import moment from "moment";

export class EventDate {
  id: string = "";

  @Transform(value => moment.unix(value.seconds), { toClassOnly: true })
  date: object = moment();

  name: string = "";
}
