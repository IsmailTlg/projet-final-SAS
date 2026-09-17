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
    //rechercher Apprenant returns a boolean value
    isfound = rechercherApprenant(idChercher);
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
    let prog = calculerProgression(idChercher);
    console.log(`${apprenants[index].nomComplet} : ${prog[2]} / ${prog[1]} exercices, progression ${prog[0]} %.`);
    console.log(`${apprenants[index].resultats.length} journées renseignées, ${prog[3]} challenges terminés. `);
    }
}
//returns a table [progress, total exercices, total finished, challenges finished]
function calculerProgression(id){
    //get the index in the array of the desired id
    const index = apprenants.findIndex(apprenant => apprenant.id == id)
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
//MUST FIX THE ENTRY HAS TO BE NUMBER IN CHOIX = FALSE!!!!!!!!
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
    while(valeur < min || valeur > max){
        console.log(`valeur invalide!, (entre ${min} et ${max})`);
        valeur = prompt(question);
    }
    valeur = Number(valeur);
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
                return true;
                break;
            }
        }
        if(!isfound){
            console.log("apprenant pas trouve");
            return false;
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
                return true;
            }
        }
        if(!isfound){
            console.log("apprenant pas trouve.");
            return false;
        }
    }
}
function filtrerParNiveau(){
    //should try to make the output look better
    let niveau = prompt("entrez niveau: ");
    let valeur;
    let arr = [];
    niveau = normaliserNom(niveau);
    if(niveau == "solide"){
        for(let i = 0; i<apprenants.length; i++){
            valeur = calculerProgression(apprenants[i].id);
            if(valeur[0] >= 80){
                arr.push(apprenants[i]);
            }
        }
    }
    else if(niveau == "en progression"){
        for(let i = 0; i<apprenants.length; i++){
            valeur = calculerProgression(apprenants[i].id);
            if(valeur[0] >= 50 && valeur[0] < 80){
                arr.push(apprenants[i]);
            }
        }
    }
    else if(niveau == "a renforcer"){
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
    console.log(entries)
    let sorted = [];
    for(let i = 0; i<entries.length; i++){
        let index = apprenants.findIndex(apprenant => apprenant.id == entries[i][0])
        console.log(index)
        sorted.push([apprenants[index], `le progression: ${entries[i][1]}`]);        
    }
    console.log(sorted)
}

trierParProgression()