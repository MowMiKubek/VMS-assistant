import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import * as moment from "moment";

export type QueryDateRange = {
    startDate: string,
    endDate: string,
}

export const CustomDate = createParamDecorator(
    (data: never, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        const { start, end } = request.query;
        
        // console.log(start, end);

        const customFormat = "YYYY-MM-DDTHH:mm:ss.SSS[Z]";
        const startDate = moment(start, true);
        const endDate = moment(end, true);
        startDate.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
        endDate.set({ hour: 23, minute: 59, second: 59, millisecond: 999 });

        const result = {
            startDate: start !== undefined && startDate.isValid() ? startDate.format(customFormat) : null,
            endDate: end !== undefined && endDate.isValid() ? endDate.format(customFormat) : null,
        } as QueryDateRange;

        // console.log(result);
        return result;
    }
);