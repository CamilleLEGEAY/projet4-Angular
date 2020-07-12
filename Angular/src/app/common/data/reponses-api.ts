import { UniteLegaleEntrant } from './unite-legale-entrant';
import { EtablissementEntrant } from './etablissement-entrant';

export class Meta {
    total_results : number = 0;
    per_page : number = 0;
    total_pages : number = 0;
    page : number = 0;
}

export class ReponseApiUnitesLegales {
    unites_legales : Array<UniteLegaleEntrant> = new Array<UniteLegaleEntrant>();
    meta : Meta = new Meta();
}

export class ReponseApiEtablissements {
    etablissements : Array<EtablissementEntrant> = new Array<EtablissementEntrant>();
    meta : Meta = new Meta();
}