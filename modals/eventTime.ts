import "reflect-metadata";
import { Transform } from "class-transformer";
import moment from "moment";

export class EventTime {
  id: string = "";
  @Transform(value => moment.unix(value.seconds), { toClassOnly: true })
  from: object = moment();

  @Transform(value => moment.unix(value.seconds), { toClassOnly: true })
  to: object = moment();

  name: string = "";
}
