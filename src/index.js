const prompt = require('prompt-sync')()
const {
    ajouterApprenant,
    enregistrerResultat,
    calculerProgression,
    rechercherApprenant,
    filtrerParNiveau,
    trierParProgression,
    afficherTableauDeBord,
    afficherListDesApprenants,
    consulterUnApprenant,
    trierParOrderAlphabetique
} = require("./progression.js");
function next(){
    prompt("Cliquez sur Entrez pour continuer....");
    //console.clear();
}
function afficherMenu(){
    console.clear();
    console.log(`
    SAS PROGRESS CONSOLE
    1. Afficher le tableau de bord
    2. Afficher la liste des apprenants
    3. Ajouter un apprenant
    4. Consulter un apprenant par identifiant
    5. Ajouter ou modifier le résultat d'une journée
    6. Rechercher un apprenant par nom
    7. Filtrer les apprenants par niveau
    8. Trier les apprenants par progression décroissante
    9. Trier les apprenants par ordre alphabétique
    0. Quitter`)
    let choix = prompt("Votre Choix: ")
    return choix
}
let choix;
while(choix != 0){
    choix = afficherMenu();
    switch(choix){
    case '1':
        console.clear();
        afficherTableauDeBord();
        next();
        break;
    case '2':
        console.clear();
        afficherListDesApprenants();
        next();
        break;
    case '3':
        //this function has a huge error, registers name as undefined
        console.clear();
        ajouterApprenant();
        next();
        break;
    case '4':
        console.clear();
        consulterUnApprenant();
        next();
        break;
    case '5':
        console.clear();
        //for id 1 it doesnt work
        enregistrerResultat();
        next();
        break;
    case '6':
        //needs work to show info of the user (add consulter)
        console.clear()
        let cherche = prompt("Entrez nom: ")
        rechercherApprenant(cherche);
        next()
        break;
    case '7':
        console.clear();
        console.log(`Les niveau: 
    1. Solide
    2. En Progression
    3. A renforcer`)
        let niveau = prompt("niveau: ");
        let arrr = filtrerParNiveau(niveau);
        for(let i = 0; i<arrr.length; i++){
            console.log(arrr[i].nomComplet)
        }
        next()
        break;
    case '8':
        console.clear();
        let arr = trierParProgression();
        for(let i=0; i<arr.length; i++){
            console.log(`${arr[i][0].nomComplet}:\t\t${arr[i][1]}`)
        }
        next();
        break;
    case '9':
        console.clear()
        let tab = trierParOrderAlphabetique();
        for(let i = 0; i<tab.length; i++){
            console.log(tab[i].nomComplet)
        }
        next()
        break;
    case '0':
        console.clear()
        console.log("Au revoir!");
        break;
    default: 
        console.clear();
        console.log("choix entre 1 et 9, 0 pour quitter")
        next();
        break;
    }
}
