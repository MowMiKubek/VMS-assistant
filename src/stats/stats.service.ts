import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { CarEvent } from 'src/events/entities/event.entity';
import { History } from 'src/vehicle/entities/history.entity';
import { Refuel } from 'src/refuel/entities/refuel.entity';
import { Ticket } from 'src/tickets/entities/ticket.entity';
import { Cost } from 'src/costs/entities/cost.entity';

@Injectable()
export class StatsService {
    constructor(
        @InjectRepository(CarEvent) private eventRepository: Repository<CarEvent>,
        @InjectRepository(History) private historyRepository: Repository<History>,
        @InjectRepository(Refuel) private refuelRepository: Repository<Refuel>,
        @InjectRepository(Ticket) private ticketRepository: Repository<Ticket>,
        @InjectRepository(Cost) private costsRepository: Repository<Cost>,
        ) {}

    async getEventsStats(startDate: string, endDate: string, id_pojazdu?: number): Promise<any> {
        const queryMonthly = this.eventRepository.createQueryBuilder()
            .select([
                "EXTRACT(YEAR FROM data) as rok",
                "EXTRACT(MONTH FROM data) as miesiac",
                "COUNT(*) as ilosc_wydarzen",
                "SUM(koszt) as suma_kosztow",
        ]);
        const queryYearly = this.eventRepository.createQueryBuilder()
            .select([
                "EXTRACT(YEAR FROM data) as rok",
                "COUNT(*) as ilosc_wydarzen",
                "SUM(koszt) as suma_kosztow",
        ]);

        if(id_pojazdu) {
            queryMonthly.where("id_pojazdu = :id_pojazdu", { id_pojazdu });
            queryYearly.where("id_pojazdu = :id_pojazdu", { id_pojazdu });
        }

        this.chainDateBounds(queryMonthly, startDate, endDate, "data");
        this.chainDateBounds(queryYearly, startDate, endDate, "data");

        queryMonthly.groupBy("rok")
            .addGroupBy("miesiac")
            .orderBy("rok")
            .addOrderBy("miesiac");
           

        queryYearly.groupBy("rok")
            .orderBy("rok");

        const [resultMonthly, resultYearly] = await Promise.all([queryMonthly.execute(), queryYearly.execute()]);
        
        return {
            monthly: resultMonthly,
            yearly: resultYearly,
        };
    }

    async getRefuelStats(startDate: string, endDate: string, id_pojazdu?: number): Promise<any> {
        const queryMonthly = this.refuelRepository.createQueryBuilder()
            .select([
                "EXTRACT(YEAR FROM data) as rok",
                "EXTRACT(MONTH FROM data) as miesiac",
                "COUNT(*) as ilosc_tankowan",
                "SUM(ilosc_paliwa) as suma_litrow",
                "SUM(cena) as suma_kosztow",
        ]);

        const queryYearly = this.refuelRepository.createQueryBuilder()
            .select([
                "EXTRACT(YEAR FROM data) as rok",
                "COUNT(*) as ilosc_tankowan",
                "SUM(ilosc_paliwa) as suma_litrow",
                "SUM(cena) as suma_kosztow",
        ]);

        if(id_pojazdu) {
            queryMonthly.where("id_pojazdu = :id_pojazdu", { id_pojazdu });
            queryYearly.where("id_pojazdu = :id_pojazdu", { id_pojazdu });
        }

        this.chainDateBounds(queryMonthly, startDate, endDate, "data");
        this.chainDateBounds(queryYearly, startDate, endDate, "data");

        queryMonthly.groupBy("rok")
            .addGroupBy("miesiac")
            .orderBy("rok")
            .addOrderBy("miesiac");
           

        queryYearly.groupBy("rok")
            .orderBy("rok");

        const [resultMonthly, resultYearly] = await Promise.all([queryMonthly.execute(), queryYearly.execute()]);

        return {
            monthly: resultMonthly,
            yearly: resultYearly,
        };
    }

    async getVehicleAssignments(): Promise<any> {
        const query = this.historyRepository.createQueryBuilder("historia")
            .select(["historia.poczatek", "historia.koniec"])
            .leftJoin("historia.pojazd", "pojazd")
            .leftJoin("historia.user", "user")
            .addSelect(["pojazd.marka", "pojazd.model", "pojazd.nr_rejestracyjny"])
            .addSelect(["user.imie", "user.nazwisko"]);

        const result = await query.getMany();
        return result;
    }

    async getTicketsStats(startDate: string, endDate: string, id_user?: number): Promise<any> {
        const queryMonthly = this.ticketRepository.createQueryBuilder()
            .select([
                "EXTRACT(YEAR FROM data_wystawienia) as rok",
                "EXTRACT(MONTH FROM data_wystawienia) as miesiac",
                "COUNT(*) as ilosc_mandatow",
                "SUM(cena) as suma_kosztow",
            ]);
        
        const queryYearly = this.ticketRepository.createQueryBuilder()
            .select([
                "EXTRACT(YEAR FROM data_wystawienia) as rok",
                "COUNT(*) as ilosc_mandatow",
                "SUM(cena) as suma_kosztow",
            ]);

        this.chainDateBounds(queryMonthly, startDate, endDate, "data_wystawienia");
        this.chainDateBounds(queryYearly, startDate, endDate, "data_wystawienia");
        
        if(id_user) {
            queryMonthly.where("id_user = :id_user", { id_user });
            queryYearly.where("id_user = :id_user", { id_user });
        }

        queryMonthly.groupBy("rok")
            .addGroupBy("miesiac")
            .orderBy("rok")
            .addOrderBy("miesiac");
           
        queryYearly.groupBy("rok")
            .orderBy("rok");
        
        const [resultMonthly, resultYearly] = await Promise.all([queryMonthly.execute(), queryYearly.execute()]);

        return {
            monthly: resultMonthly,
            yearly: resultYearly,
        };
    }

    async getCostsStats(startDate: string, endDate: string, id_user?: number): Promise<any> {
        const queryMonthly = this.costsRepository.createQueryBuilder()
            .select([
                "EXTRACT(YEAR FROM data) as rok",
                "EXTRACT(MONTH FROM data) as miesiac",
                "SUM(koszt) as suma_kosztow",
            ]);
        
        const queryYearly = this.costsRepository.createQueryBuilder()
            .select([
                "EXTRACT(YEAR FROM data) as rok",
                "SUM(koszt) as suma_kosztow",
            ]);

        this.chainDateBounds(queryMonthly, startDate, endDate, "data");
        this.chainDateBounds(queryYearly, startDate, endDate, "data");
        
        if(id_user) {
            queryMonthly.where("id_user = :id_user", { id_user });
            queryYearly.where("id_user = :id_user", { id_user });
        }

        queryMonthly.groupBy("rok")
            .addGroupBy("miesiac")
            .orderBy("rok")
            .addOrderBy("miesiac");
           
        queryYearly.groupBy("rok")
            .orderBy("rok");
        
        const [resultMonthly, resultYearly] = await Promise.all([queryMonthly.execute(), queryYearly.execute()]);

        return {
            monthly: resultMonthly,
            yearly: resultYearly,
        };
    }

    chainDateBounds(query: SelectQueryBuilder<any>, startDate: string, endDate: string, fieldName: string): SelectQueryBuilder<any> {
        if(startDate)
            query.where(`${fieldName} >= :startDate`, { startDate })
        if(endDate)
            query.andWhere(`${fieldName} <= :endDate`, { endDate })
        return query;
    }

}
