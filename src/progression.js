const apprenants = require("./data.js"); //to import the array from data file
const prompt = require('prompt-sync')(); //to enable input from the user
function ajouterApprenant(){
    //develop the UI in console!
    let newApparenant = {} ;
    //maybe we can make a better id system.
    newApparenant.id = apprenants.length + 1;
    newApparenant.nomComplete = prompt("Entrez nom complet de l'apprenant: ");
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
        jour = prompt("jour (1 à 7): ");
        if(jour >= 1 && jour <= 7){
            exercices = prompt("Exercices terminés :");
            exercices = Number(exercices);
            totalProposer = prompt("Total d'exercices proposés :");
            totalProposer = Number(totalProposer);
            if(exercices >= 0 && exercices <= totalProposer){
                challenge = prompt("Challenge termine (oui/non): ");
                if(challenge == "oui"){
                    challenge = true;
                }
                else if(challenge == "non"){
                    challenge = false;
                }
                //maybe i can make a loop if the input was false?
                else{
                    console.log("reponse doit etre oui ou non!");
                    return 0;
                }
            }
            else{
                console.log("numero d'exercices doit etre positive, est depasse pas exercices propose!")
                return 0;
            }
        }
        else{
            console.log("jour doit etre compris entre 1 et 7");
            return 0;
        }
    }
    //could make a loop here too to enter a new learner's id
    else {
        console.log("Apprenant pas trouve.");
        return 0;
    }
    //data treatement to output.
    const index = apprenants.findIndex(apprenant => apprenant.id)
    apprenants[index].resultats.push({
        jour: jour, exercicesTermines: exercices, 
        totalExercices: totalProposer, challengeTermine: challenge
    })
    let totalTerminer = 0;
    let totalExercices = 0;
    let challengeTerminer = 0;
    for(let i = 0; i<apprenants[index].resultats.length; i++){
        totalTerminer += apprenants[index].resultats[i].exercicesTermines;
        totalExercices += apprenants[index].resultats[i].totalExercices;
        if(apprenants[index].resultats[i].challengeTermine){
            challengeTerminer++;
        }
    }
    let progression = (totalTerminer/totalExercices)*100;
    //last output.
    console.log(`Résultat du jour ${jour} enregistré.`);
    console.log(`Sara Dev : ${totalTerminer} / ${totalExercices} exercices, progression ${progression} %.`);
    console.log(`${apprenants[index].resultats.length} journées renseignées, ${challengeTerminer} challenges terminés. `);
}
enregistrerResultat();
