import { UniteLegaleEntrant } from './unite-legale-entrant';
import { EtablissementEntrant } from './etablissement-entrant';

export class Meta {
    total_results : number;
    per_page : number;
    total_pages : number;
    page : number;
}

export class ReponseApiUnitesLegales {
    unites_legales : Array<UniteLegaleEntrant>;
    meta : Meta;
}

export class ReponseApiEtablissements {
    etablissements : Array<EtablissementEntrant>;
    meta : Meta;
}