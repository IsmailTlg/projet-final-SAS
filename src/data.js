const apprenants = [
    {
        id: 1,
        nomComplet: "Sara Dev",
        ville: "Nador",
        resultats: [
            { jour: 1, exercicesTermines: 18,
            totalExercices: 20, challengeTermine: true },
            { jour: 2, exercicesTermines: 14,
            totalExercices: 20, challengeTermine: false },
            { jour: 5, exercicesTermines: 14,
            totalExercices: 20, challengeTermine: true },
            { jour: 7, exercicesTermines: 14,
            totalExercices: 20, challengeTermine: false }
            
        ]
    },
    {
        id: 2,
        nomComplet: "Yassine Code",
        ville: "Oujda",
        resultats: [
            { jour: 1, exercicesTermines: 12,
            totalExercices: 20, challengeTermine: false},
            { jour: 2, exercicesTermines: 12,
            totalExercices: 20, challengeTermine: false},
            { jour: 3, exercicesTermines: 12,
            totalExercices: 20, challengeTermine: false},
            { jour: 4, exercicesTermines: 12,
            totalExercices: 20, challengeTermine: false},
            { jour: 6, exercicesTermines: 12,
            totalExercices: 20, challengeTermine: false},
        ]
    },
    {
        id: 3,
        nomComplet: "Ahmed Bilal",
        ville: "Oujda",
        resultats: [
            { jour: 1, exercicesTermines: 16,
            totalExercices: 20, challengeTermine: false}
        ]
    },
    {
        id: 4,
        nomComplet: "khalid tfahi",
        ville: "Oujda",
        resultats: [
            { jour: 1, exercicesTermines: 15,
            totalExercices: 20, challengeTermine: false}
        ]
    },
    {
        id: 5,
        nomComplet: "raed baynani",
        ville: "Oujda",
        resultats: [
            { jour: 1, exercicesTermines: 10,
            totalExercices: 20, challengeTermine: false}
        ]
    }
];
module.exports = apprenants;