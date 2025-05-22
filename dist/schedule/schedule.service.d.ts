import { InvestmentsService } from '../investments/investments.service';
export declare class ScheduleService {
    private readonly investmentsService;
    private readonly logger;
    constructor(investmentsService: InvestmentsService);
    calculateDailyProfits(): Promise<void>;
}
