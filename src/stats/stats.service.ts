import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CarEvent } from 'src/events/entities/event.entity';
import { History } from 'src/vehicle/entities/history.entity';
import { Refuel } from 'src/refuel/entities/refuel.entity';

@Injectable()
export class StatsService {
    constructor(
        @InjectRepository(CarEvent) private eventRepository: Repository<CarEvent>,
        @InjectRepository(History) private historyRepository: Repository<History>,
        @InjectRepository(Refuel) private refuelRepository: Repository<Refuel>,
        ) {}

    async getEventsStats(id_pojazdu?: number): Promise<any> {
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

    async getRefuelStats(id_pojazdu?: number): Promise<any> {
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
        const result = await this.historyRepository.createQueryBuilder("historia")
            .select(["historia.poczatek", "historia.koniec"])
            .leftJoin("historia.pojazd", "pojazd")
            .leftJoin("historia.user", "user")
            .addSelect(["pojazd.marka", "pojazd.model", "pojazd.nr_rejestracyjny"])
            .addSelect(["user.imie", "user.nazwisko"])
            .getMany();

        return result;
    }
}
