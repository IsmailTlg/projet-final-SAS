const apprenants = require("./data.js"); //to import the array from data file
const prompt = require('prompt-sync')(); //to enable input from the user
function ajouterApprenant(){
    //develop the UI in console!
    //new bug, null can be added(if u ctrl + c in input or press enter)
    let newApparenant = {} ;
    //maybe we can make a better id system.
    newApparenant.id = apprenants.length + 1;
    newApparenant.nomComplete = prompt("Entrez nom complet de l'apprenant: ");
    newApparenant.nomComplete = normaliserNom(newApparenant.nomComplete);
    //do i have to use normaliserNom on the city too ? 
    newApparenant.ville = prompt("Entrez la ville de l'apprenant: ");
    //do i have to leave the resultats empty?
    newApparenant.resultats = [];
    apprenants.push(newApparenant);
    //fix grammar
    console.log(`${newApparenant.nomComplete} a ete ajoute!`);
    //needs error handling in case we have a bad entry!
}
function enregistrerResultat(){
    //declaring the variables we'll need in the function
    let idChercher = prompt("Identifiant de l'apprenant: ");
    let isfound = false;
    let exercices;
    let totalProposer;
    let challenge; 
    let jour;
    //searching if the learner exists
    for(let i = 0; i<apprenants.length; i++){
        if(idChercher == apprenants[i].id){
            isfound = true;
            console.log(`Apprenant trouve: ${apprenants[i].nomComplet}`);
            break;
        }
    }
    //i could try to simplify this part
    if(isfound){
        //validerResultat really simplified this part of code, can i make it work with challenges too ?
        jour = validerResultat("jour (1 à 7): ", 1, 7);
        totalProposer = validerResultat("Total d'exercices proposés :", 0, 20);
        exercices = validerResultat("Exercices terminés :", 0, totalProposer);
        //could work on challenge here to make a loop
        challenge = validerResultat("Challenge terminé (oui/non) :", 1, 1, true);
        if(challenge == "oui"){
                challenge = true;
            }
        else if(challenge == "non"){
                challenge = false;
        }
    //could make a loop here too to enter a new learner's id
    //data treatement to output.
    
    const index = apprenants.findIndex(apprenant => apprenant.id == idChercher)
    apprenants[index].resultats.push({
        jour: jour, exercicesTermines: exercices, 
        totalExercices: totalProposer, challengeTermine: challenge
    })
    console.log(`Résultat du jour ${jour} enregistré.`);
    //adding calculerProgression simplified this function way better.
    calculerProgression(idChercher);
    }
    else {
        console.log("Apprenant pas trouve.");
        return 0;
    }
}
function calculerProgression(id){
    //get the index in the array of the desired id
    const index = apprenants.findIndex(apprenant => apprenant.id == id)
    let totalTerminer = 0;
    let totalExercices = 0;
    let challengeTerminer = 0;
    //countaing all totals
    for(let i = 0; i<apprenants[index].resultats.length; i++){
        totalTerminer += apprenants[index].resultats[i].exercicesTermines;
        totalExercices += apprenants[index].resultats[i].totalExercices;
        if(apprenants[index].resultats[i].challengeTermine){ 
            challengeTerminer++;
        } 
    }
    let progression = (totalTerminer/totalExercices)*100;
    //output
    console.log(`${apprenants[index].nomComplet} : ${totalTerminer} / ${totalExercices} exercices, progression ${progression} %.`);
    console.log(`${apprenants[index].resultats.length} journées renseignées, ${challengeTerminer} challenges terminés. `);
}
function normaliserNom(nom){
    nom = nom.trim();
    nom = nom.toLowerCase();
    //this regex replaces multiple spaces with one.
    nom = nom.replace(/\s+/g, " ");
    return nom;
}
function validerResultat(question, min = 1, max = 1, choix = false){
    let valeur = prompt(question);
    if(choix){
        while(valeur != "oui" && valeur != "non"){
            console.log("repondre par oui ou non");
            valeur = prompt(question);
        }
        return valeur;
    }
    while(valeur < min || valeur > max){
        console.log(`valeur invalide!, (entre ${min} et ${max})`);
        valeur = prompt(question);
    }
    valeur = Number(valeur);
    return valeur;
}
enregistrerResultat()