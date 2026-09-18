const apprenants = require("./data.js"); //to import the array from data file
const prompt = require('prompt-sync')(); //to enable input from the user
function ajouterApprenant(){
    let newApparenant = {} ;
    //maybe we can make a better id system.
    newApparenant.id = apprenants.length + 1;
    newApparenant.nomComplet = prompt("Entrez nom complet de l'apprenant: ");
    if(newApparenant.nomComplet == null){
        console.log("enter a valide name!")
        return 0;
    }
    newApparenant.nomComplet = normaliserNom(newApparenant.nomComplet);
    //do i have to use normaliserNom on the city too ? 
    newApparenant.ville = prompt("Entrez la ville de l'apprenant: ");
    //do i have to leave the resultats empty?
    newApparenant.resultats = [];
    apprenants.push(newApparenant);
    //fix grammar
    console.log(`${newApparenant.nomComplet} a ete ajoute!`);
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
    isfound = rechercherApprenant(idChercher);
    //i could try to simplify this part
    if(isfound != -1){
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
    //to update a result
    let updated = false;
    for(let i = 0; i<apprenants[index].resultats.length; i++){
        if(apprenants[index].resultats[i]){
            if(apprenants[index].resultats[i].jour == jour){
                apprenants[index].resultats[i] = {
                jour: jour, exercicesTermines: exercices, 
                totalExercices: totalProposer, challengeTermine: challenge
                }
                updated = true;
            }

        }
    }
    //to add a result
    if(!updated){
        apprenants[index].resultats.push({
            jour: jour, exercicesTermines: exercices, 
            totalExercices: totalProposer, challengeTermine: challenge
        })
    }
    console.log(`Résultat du jour ${jour} enregistré.`);
    //adding calculerProgression simplified this function way better.
    let prog = calculerProgression(idChercher);
    console.log(`${apprenants[index].nomComplet} : ${prog[2]} / ${prog[1]} exercices, progression ${prog[0]} %.`);
    console.log(`${apprenants[index].resultats.length} journées renseignées, ${prog[3]} challenges terminés. `);
    }
}
//returns a table [progress, total exercices, total finished, challenges finished]
function calculerProgression(id){
    //get the index in the array of the desired id
    const index = apprenants.findIndex(apprenant => apprenant.id == id)
    if(index == -1){
        console.log(`Apprenants pas trouve`)
        return 0;
    }
    let totalTerminer = 0;
    let totalExercices = 0;
    let challengeTerminer = 0;
    let prog = [];
    //countaing all totals
    for(let i = 0; i<apprenants[index].resultats.length; i++){
        totalTerminer += apprenants[index].resultats[i].exercicesTermines;
        totalExercices += apprenants[index].resultats[i].totalExercices;
        if(apprenants[index].resultats[i].challengeTermine){ 
            challengeTerminer++;
        } 
    }
    let progression = (totalTerminer/totalExercices)*100;
    if(isNaN(progression)){
        return "0";
    }
    //output
    prog = [progression, totalExercices, totalTerminer, challengeTerminer];
    //returning a whole array is way better so we can take whatever we need.
    return prog;
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
        valeur = valeur.toLowerCase();
        while(valeur != "oui" && valeur != "non"){
            console.log("repondre par oui ou non");
            valeur = prompt(question);
        }
        return valeur;
    }
    valeur = Number(valeur);
    while(valeur < min || valeur > max || isNaN(valeur)){
        console.log(`valeur invalide!, (entre ${min} et ${max})`);
        valeur = prompt(question);
        valeur=Number(valeur);
    }
    return valeur;
}
function rechercherApprenant(cherche){
    // i could try to make a loop?
    let test = Number(cherche)
    let isfound;
    //case cherche is a number(id);
    if(!Number.isNaN(test)){
        for(let i = 0; i<apprenants.length; i++){
            if(cherche == apprenants[i].id){
                isfound = true;
                //bug here, when i add result for a new added person the name appears undefined after search!
                console.log(`Apprenant trouve: ${apprenants[i].nomComplet}`);
                // const index = apprenants.findIndex(apprenant => apprenant.id == cherche)
                // return index;
                return i;
            }
        }
        if(!isfound){
            console.log("apprenant pas trouve");
            return -1;
        }
    }
    //case cherche is a string(name)
    else{
        cherche = normaliserNom(cherche)
        for(let i = 0; i<apprenants.length; i++){
            apprenants[i].nomComplet = normaliserNom(apprenants[i].nomComplet)
            if(apprenants[i].nomComplet.includes(cherche)){
                console.log(`apprenant trouve: ${apprenants[i].nomComplet}`);
                isfound = true;
                infoDapprenant(i, apprenants[i].id);
                //i can make it return the id's index, which would be a truthy value as well
                return i;
            }

        }
        if(!isfound){
            console.log("apprenant pas trouve.");
            return -1;
        }
    }
}
function filtrerParNiveau(niveau){
    //should try to make the output look better
    //let niveau = prompt("entrez niveau: ");
    let valeur;
    let arr = [];
    if(niveau == "1"){
        for(let i = 0; i<apprenants.length; i++){
            valeur = calculerProgression(apprenants[i].id);
            if(valeur[0] >= 80){
                arr.push(apprenants[i]);
            }
        }
    }
    else if(niveau == "2"){
        for(let i = 0; i<apprenants.length; i++){
            valeur = calculerProgression(apprenants[i].id);
            if(valeur[0] >= 50 && valeur[0] < 80){
                arr.push(apprenants[i]);
            }
        }
    }
    else if(niveau == "3"){
        for(let i = 0; i<apprenants.length; i++){
            valeur = calculerProgression(apprenants[i].id);
            if(valeur[0] < 50){
                arr.push(apprenants[i]);
            }
        }
    }
    else{
        console.log("niveau invalide! (solide, en progression, a renforcer");
    }
    return arr;
}
function trierParProgression(){
    let obj = {}
    //this puts each id with its progression in an object
    for(let i = 0; i<apprenants.length; i++){
        obj[apprenants[i].id] = calculerProgression(apprenants[i].id);
        obj[apprenants[i].id] = obj[apprenants[i].id][0]
    }
    let entries = Object.entries(obj);
    //sorting the ids and their progression by bubble sort
    for(let i = 0; i<entries.length; i++){
        let swapped = false;
        for(let j = 0; j<entries.length - i - 1; j++){
            if(entries[j][1] > entries[j+1][1]){
                [entries[j], entries[j+1]] = [entries[j+1], entries[j]];
                swapped = true;
            }
        }
        if(swapped === false){
            break;
        }
    }
    let sorted = [];
    for(let i = 0; i<entries.length; i++){
        let index = apprenants.findIndex(apprenant => apprenant.id == entries[i][0])
        sorted.push([apprenants[index], `progression: ${entries[i][1]}%`]);        
    }
    return sorted;
}
function afficherTableauDeBord(){
    //calculation de progression moyenne
    let progressionMoyenne = 0;
    let a;
    for(let i = 0; i<apprenants.length; i++){
        progressionMoyenne += calculerProgression(apprenants[i].id)[0]
    }
    progressionMoyenne /= apprenants.length
    let nbrSolides = filtrerParNiveau("1").length
    let nbrEnProg = filtrerParNiveau("2").length
    let nbrRenfroc = filtrerParNiveau("3").length
    console.log("====================TABLEAU DE BORD====================");
    console.log(`Apprenants: ${apprenants.length}`);
    console.log(`Progression Moyenne: ${progressionMoyenne}%`);
    console.log("---------------------LES NIVEAU------------------------")
    console.log(`Apprenants Solide: ${nbrSolides}`);
    console.log(`Apprenants en progression: ${nbrEnProg}`);
    console.log(`Apprenants a renforcer: ${nbrRenfroc}`);
    console.log("--------------------PROGRESSION--------------------");
    let sorted = trierParProgression();
    let order = 1;
    for(let i = sorted.length-1; i>=0; i--){
        console.log(`${order}. ${sorted[i][0].nomComplet}\t\t: ${sorted[i][1]}`)
        order++;
    }
    console.log("---------------Données manquantes---------------");
    for(let i = 0; i<apprenants.length; i++){
        let jourExist = [];
        let challengeExist = [];
        let challengeManq = [1, 2, 3, 4, 5, 6, 7];
        let jourManq = [1, 2, 3, 4, 5, 6, 7];
        for(let k =0; k<apprenants[i].resultats.length; k++){
            if(apprenants[i].resultats[k].challengeTermine){
                challengeExist.push(apprenants[i].resultats[k].jour);
            }
        }
        for(let j = 0; j<7; j++){
            if(apprenants[i].resultats[j]){
                jourExist.push(apprenants[i].resultats[j].jour)
            }
        }
        challengeManq = challengeManq.filter(x => !challengeExist.includes(x));
        jourManq = jourManq.filter(x => !jourExist.includes(x));
        jourManq = jourManq.join(", ")
        challengeManq = challengeManq.join(", ")
        console.log(`${apprenants[i].nomComplet} :`);
        console.log(`\t jours manquants: ${jourManq}`);
        console.log(`\t challenges manquants: ${challengeManq}`);
    }
}   
function trierParOrderAlphabetique(){
    let arr = [];
    arr = [...apprenants];
    arr.sort((a, b) => a.nomComplet.localeCompare(b.nomComplet));
    return arr;
}
function consulterUnApprenant(){
    let id;
    let isfound
    do{ //maybe i should add an option to give up and leave the program(press 0 for example)
        id = prompt("id de l'apprenant: ");
        isfound = rechercherApprenant(id);
        //we have this condition for index 0 since the value 0 is considered falsy in js
        if(isfound == 0){
            break;
        }
    }while(isfound == -1);
    infoDapprenant(isfound, id);
    // console.log(`ville: ${apprenants[isfound].ville}`);
    // let prog = calculerProgression(id)[0]
    // console.log(`progression: ${prog}%`);
    // let jourExist = [];
    // for(let i = 0; i<7; i++){
    //     if(apprenants[isfound].resultats[i]){
    //         jourExist.push(apprenants[isfound].resultats[i].jour)
    //     }
    // } 
    // jourExist = jourExist.join(", ")
    // console.log(`journées renseignées: ${jourExist}`);
    // for(let i = 0; i<apprenants[isfound].resultats.length; i++){
    //     console.log(`     jour: ${apprenants[isfound].resultats[i].jour}: `);
    //     console.log(`\tExercices: ${apprenants[isfound].resultats[i].exercicesTermines}/${apprenants[isfound].resultats[i].totalExercices}: `);
    //     if(apprenants[isfound].resultats[i].challengeTermine){
    //         console.log("\tChallenge: Terminé")
    //     }
    //     else{
    //         console.log("\tChallenge: Non Terminé");
    //     }
    // }
}
function afficherListDesApprenants(){
    console.log("====================LISTE DES APPRENANTS====================");
    console.log("  ID   Nom Complet              Ville           Progression")
    console.log("------------------------------------------------------------")
    for(let i = 0; i<apprenants.length; i++){
        let prog = calculerProgression(apprenants[i].id)[0];
        console.log(`  ${apprenants[i].id}\t${apprenants[i].nomComplet}\t\t${apprenants[i].ville}\t\t${prog}%`)
    }
    console.log("   ---------------------------------")
    console.log(`   => total d'apprenants: ${apprenants.length}`)
}
function infoDapprenant(index, id){
    console.log(`ville: ${apprenants[index].ville}`);
    let prog = calculerProgression(id)[0]
    console.log(`progression: ${prog}%`);
    let jourExist = [];
    for(let i = 0; i<7; i++){
        if(apprenants[index].resultats[i]){
            jourExist.push(apprenants[index].resultats[i].jour)
        }
    } 
    jourExist = jourExist.join(", ")
    console.log(`journées renseignées: ${jourExist}`);
    for(let i = 0; i<apprenants[index].resultats.length; i++){
        console.log(`     jour: ${apprenants[index].resultats[i].jour}: `);
        console.log(`\tExercices: ${apprenants[index].resultats[i].exercicesTermines}/${apprenants[index].resultats[i].totalExercices}: `);
        if(apprenants[index].resultats[i].challengeTermine){
            console.log("\tChallenge: Terminé")
        }
        else{
            console.log("\tChallenge: Non Terminé");
        }
    }
}
module.exports = {
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
};