export class RechercheToSave{
    token: string;
    recherche: Recherche;
}

export class Recherche{

    siren: string;
    denomination:  string;
    // format date : AAAA-MM-jj   
    date_creation: string;
    //format naf detaille 96.02A
    activite_principale: string;
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
    nb_resultats: number;
}