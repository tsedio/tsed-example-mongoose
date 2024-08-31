import { Inject, Service } from "@tsed/common";
import { $log } from "@tsed/logger";
import { MongooseModel } from "@tsed/mongoose";
import { Calendar } from "../../models/calendars/Calendar";

@Service()
export class CalendarsService {
  @Inject(Calendar)
  private Calendar: MongooseModel<Calendar>;

  $onInit() {
    this.reload();
  }

  async reload() {
    const calendars = await this.Calendar.find({});

    if (calendars.length === 0) {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const promises = require("../../../resources/calendars.json").map((calendar: never) => this.save(calendar));
      await Promise.all(promises);
    }
  }

  /**
   * Find a calendar by his ID.
   * @param id
   * @returns {undefined|Calendar}
   */
  async find(id: string): Promise<Calendar | null> {
    $log.debug("Search a calendar from ID", id);
    const calendar = await this.Calendar.findById(id).exec();

    $log.debug("Found", calendar);

    return calendar;
  }

  /**
   *
   * @param calendar
   * @returns {Promise<TResult|TResult2|Calendar>}
   */
  async save(calendar: Calendar): Promise<Calendar> {
    $log.debug({ message: "Validate calendar", calendar });

    // const m = new CModel(calendar);
    // console.log(m);
    // await m.update(calendar, {upsert: true});

    const model = new this.Calendar(calendar);
    $log.debug({ message: "Save calendar", calendar });
    await model.updateOne(calendar, { upsert: true });

    $log.debug({ message: "Calendar saved", model });

    return model;
  }

  /**
   *
   * @returns {Calendar[]}
   */
  async query(options = {}): Promise<Calendar[]> {
    return this.Calendar.find(options);
  }

  /**
   *
   * @param id
   * @returns {Promise<Calendar>}
   */
  async remove(id: string) {
    await this.Calendar.deleteOne({
      _id: id
    }).exec();
  }
}
