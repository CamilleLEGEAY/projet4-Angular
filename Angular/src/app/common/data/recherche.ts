export class Recherche{

    siren: string;
    //n'est pas renseignée des tous les etablissements il faut parfois le recuperer dans l'unite legale
    denomination:  string;
    // format date : AAAA-MM-jj   
    date_creation: Date;
    //format naf detaille 96.02A
    activite_principale: string;
    //etablissement_siege: boolean; //ne peu être utilise causse : saisi par l'insee non uniforme
    code_postal: string;
    libelle_commune: string;
    
    /*
    value="1"> 0 à 9 salariés
    value="11"> 10 à 19 salariés
    value="12"> 20 à 49 salariés
    value="21"> 50 à 99 salariés
    value="22"> 100 à 199 salariés
    value="5"> 201 à 500 salariés
    value="6"> plus de 500 salariés*/
    effectifs: number;

    departement : string;

}