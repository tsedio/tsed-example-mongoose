import { Middleware, PathParams } from "@tsed/common";
import { NotFound } from "@tsed/exceptions";
import { CalendarsService } from "../../services/calendars/CalendarsService";
import { Required } from "@tsed/schema";

@Middleware()
export class CheckCalendarIdMiddleware {
  constructor(private calendarService: CalendarsService) {}

  async use(@Required() @PathParams("calendarId") calendarId: string) {
    try {
      await this.calendarService.find(calendarId);
    } catch {
      throw new NotFound("CalendarDTO not found");
    }
  }
}
