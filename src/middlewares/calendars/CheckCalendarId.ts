import {Middleware, PathParams} from "@tsed/common";
import {Required} from "@tsed/schema";
import {NotFound} from "@tsed/exceptions";
import {CalendarsService} from "../../services/calendars/CalendarsService";

@Middleware()
export class CheckCalendarIdMiddleware {
    constructor(private calendarService: CalendarsService) {

    }

    async use(@Required() @PathParams("calendarId") calendarId: string) {

        try {
            await this.calendarService.find(calendarId);
        } catch (er) {
            throw new NotFound("CalendarDTO not found");
        }

    }
}
