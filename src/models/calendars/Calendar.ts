import { Model, ObjectID } from "@tsed/mongoose";
import { Required, Property } from "@tsed/schema";

@Model()
export class Calendar {
  @ObjectID("id")
  _id: string;

  @Required()
  name: string;

  @Property()
  owner: string;
}
