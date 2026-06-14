

const matchesData = {
  tournament: "Copa do Mundo FIFA 2026",
  hostCountries: ["Canadá", "México", "EUA"],
  year: 2026,

  groups: {
    A: { matches: [] },
    B: { matches: [] },
    C: { matches: [] },
    D: { matches: [] },
    E: { matches: [] },
    F: { matches: [] },
    G: { matches: [] },
    H: { matches: [] },
    I: { matches: [] },
    J: { matches: [] },
    K: { matches: [] },
    L: { matches: [] }
  },

   groupStageMatches: [
    // ==================== GRUPO A ====================
    { id: 1, group: "A", round: 1, timeA: "México", siglaA: "mx", timeB: "África do Sul", siglaB: "za", date: new Date("2026-06-11T16:00:00"), venue: "Cidade do México", encerrado: false },
    { id: 2, group: "A", round: 1, timeA: "Coreia do Sul", siglaA: "kr", timeB: "República Tcheca", siglaB: "cz", date: new Date("2026-06-12T00:00:00"), venue: "Guadalajara", encerrado: false },
    { id: 25, group: "A", round: 2, timeA: "República Tcheca", siglaA: "cz", timeB: "África do Sul", siglaB: "za", date: new Date("2026-06-18T13:00:00"), venue: "Atlanta", encerrado: false },
    { id: 28, group: "A", round: 2, timeA: "México", siglaA: "mx", timeB: "Coreia do Sul", siglaB: "kr", date: new Date("2026-06-19T01:00:00"), venue: "Guadalajara", encerrado: false },
    { id: 56, group: "A", round: 3, timeA: "República Tcheca", siglaA: "cz", timeB: "México", siglaB: "mx", date: new Date("2026-06-24T23:00:00"), venue: "Cidade do México", encerrado: false },
    { id: 57, group: "A", round: 3, timeA: "África do Sul", siglaA: "za", timeB: "Coreia do Sul", siglaB: "kr", date: new Date("2026-06-24T23:00:00"), venue: "Monterrey", encerrado: false },

    // ==================== GRUPO B ====================
    { id: 3, group: "B", round: 1, timeA: "Canadá", siglaA: "ca", timeB: "Bósnia", siglaB: "ba", date: new Date("2026-06-12T16:00:00"), venue: "Toronto", encerrado: false },
    { id: 5, group: "B", round: 1, timeA: "Qatar", siglaA: "qa", timeB: "Suíça", siglaB: "ch", date: new Date("2026-06-13T16:00:00"), venue: "São Francisco", encerrado: false },
    { id: 26, group: "B", round: 2, timeA: "Suíça", siglaA: "ch", timeB: "Bósnia", siglaB: "ba", date: new Date("2026-06-18T19:00:00"), venue: "Los Angeles", encerrado: false },
    { id: 27, group: "B", round: 2, timeA: "Canadá", siglaA: "ca", timeB: "Qatar", siglaB: "qa", date: new Date("2026-06-18T22:00:00"), venue: "Vancouver", encerrado: false },
    { id: 52, group: "B", round: 3, timeA: "Suíça", siglaA: "ch", timeB: "Canadá", siglaB: "ca", date: new Date("2026-06-24T16:00:00"), venue: "Vancouver", encerrado: false },
    { id: 53, group: "B", round: 3, timeA: "Bósnia", siglaA: "ba", timeB: "Qatar", siglaB: "qa", date: new Date("2026-06-24T16:00:00"), venue: "Seattle", encerrado: false },

    // ==================== GRUPO C ====================
    { id: 7, group: "C", round: 1, timeA: "Brasil", siglaA: "br", timeB: "Marrocos", siglaB: "ma", date: new Date("2026-06-13T19:00:00"), venue: "Nova York", encerrado: false },
    { id: 8, group: "C", round: 1, timeA: "Haiti", siglaA: "ht", timeB: "Escócia", siglaB: "gb-sct", date: new Date("2026-06-13T22:00:00"), venue: "Boston", encerrado: false },
    { id: 32, group: "C", round: 2, timeA: "Escócia", siglaA: "gb-sct", timeB: "Marrocos", siglaB: "ma", date: new Date("2026-06-19T19:00:00"), venue: "Boston", encerrado: false },
    { id: 33, group: "C", round: 2, timeA: "Brasil", siglaA: "br", timeB: "Haiti", siglaB: "ht", date: new Date("2026-06-19T22:00:00"), venue: "Filadélfia", encerrado: false },
    { id: 54, group: "C", round: 3, timeA: "Escócia", siglaA: "gb-sct", timeB: "Brasil", siglaB: "br", date: new Date("2026-06-24T19:00:00"), venue: "Miami", encerrado: false },
    { id: 55, group: "C", round: 3, timeA: "Marrocos", siglaA: "ma", timeB: "Haiti", siglaB: "ht", date: new Date("2026-06-24T19:00:00"), venue: "Atlanta", encerrado: false },

    // ==================== GRUPO D ====================
    { id: 4, group: "D", round: 1, timeA: "Estados Unidos", siglaA: "us", timeB: "Paraguai", siglaB: "py", date: new Date("2026-06-12T23:00:00"), venue: "Los Angeles", encerrado: false },
    { id: 6, group: "D", round: 1, timeA: "Austrália", siglaA: "au", timeB: "Turquia", siglaB: "tr", date: new Date("2026-06-13T02:00:00"), venue: "Vancouver", encerrado: false },
    { id: 30, group: "D", round: 2, timeA: "Turquia", siglaA: "tr", timeB: "Paraguai", siglaB: "py", date: new Date("2026-06-19T23:00:00"), venue: "São Francisco", encerrado: false },
    { id: 31, group: "D", round: 2, timeA: "Estados Unidos", siglaA: "us", timeB: "Austrália", siglaB: "au", date: new Date("2026-06-19T16:00:00"), venue: "Seattle", encerrado: false },
    { id: 62, group: "D", round: 3, timeA: "Turquia", siglaA: "tr", timeB: "Estados Unidos", siglaB: "us", date: new Date("2026-06-25T23:00:00"), venue: "Los Angeles", encerrado: false },
    { id: 63, group: "D", round: 3, timeA: "Paraguai", siglaA: "py", timeB: "Austrália", siglaB: "au", date: new Date("2026-06-25T23:00:00"), venue: "São Francisco", encerrado: false },

    // ==================== GRUPO E ====================
    { id: 10, group: "E", round: 1, timeA: "Alemanha", siglaA: "de", timeB: "Curaçao", siglaB: "cw", date: new Date("2026-06-14T14:00:00"), venue: "Houston", encerrado: false },
    { id: 12, group: "E", round: 1, timeA: "Costa do Marfim", siglaA: "ci", timeB: "Equador", siglaB: "ec", date: new Date("2026-06-14T20:00:00"), venue: "Filadélfia", encerrado: false },
    { id: 36, group: "E", round: 2, timeA: "Alemanha", siglaA: "de", timeB: "Costa do Marfim", siglaB: "ci", date: new Date("2026-06-20T17:00:00"), venue: "Toronto", encerrado: false },
    { id: 37, group: "E", round: 2, timeA: "Equador", siglaA: "ec", timeB: "Curaçao", siglaB: "cw", date: new Date("2026-06-20T21:00:00"), venue: "Kansas City", encerrado: false },
    { id: 58, group: "E", round: 3, timeA: "Curaçao", siglaA: "cw", timeB: "Costa do Marfim", siglaB: "ci", date: new Date("2026-06-25T17:00:00"), venue: "Filadélfia", encerrado: false },
    { id: 59, group: "E", round: 3, timeA: "Equador", siglaA: "ec", timeB: "Alemanha", siglaB: "de", date: new Date("2026-06-25T17:00:00"), venue: "Nova York", encerrado: false },

    // ==================== GRUPO F ====================
    { id: 11, group: "F", round: 1, timeA: "Holanda", siglaA: "nl", timeB: "Japão", siglaB: "jp", date: new Date("2026-06-14T17:00:00"), venue: "Dallas", encerrado: false },
    { id: 13, group: "F", round: 1, timeA: "Suécia", siglaA: "se", timeB: "Tunísia", siglaB: "tn", date: new Date("2026-06-14T23:00:00"), venue: "Monterrey", encerrado: false },
    { id: 34, group: "F", round: 2, timeA: "Holanda", siglaA: "nl", timeB: "Suécia", siglaB: "se", date: new Date("2026-06-20T14:00:00"), venue: "Houston", encerrado: false },
    { id: 40, group: "F", round: 2, timeA: "Tunísia", siglaA: "tn", timeB: "Japão", siglaB: "jp", date: new Date("2026-06-21T01:00:00"), venue: "Monterrey", encerrado: false },
    { id: 60, group: "F", round: 3, timeA: "Japão", siglaA: "jp", timeB: "Suécia", siglaB: "se", date: new Date("2026-06-25T20:00:00"), venue: "Dallas", encerrado: false },
    { id: 61, group: "F", round: 3, timeA: "Tunísia", siglaA: "tn", timeB: "Holanda", siglaB: "nl", date: new Date("2026-06-25T20:00:00"), venue: "Kansas City", encerrado: false },

    // ==================== GRUPO G ====================
    { id: 17, group: "G", round: 1, timeA: "Bélgica", siglaA: "be", timeB: "Egito", siglaB: "eg", date: new Date("2026-06-15T16:00:00"), venue: "Seattle", encerrado: false },
    { id: 18, group: "G", round: 1, timeA: "Irã", siglaA: "ir", timeB: "Nova Zelândia", siglaB: "nz", date: new Date("2026-06-15T22:00:00"), venue: "Los Angeles", encerrado: false },
    { id: 42, group: "G", round: 2, timeA: "Bélgica", siglaA: "be", timeB: "Irã", siglaB: "ir", date: new Date("2026-06-21T16:00:00"), venue: "Los Angeles", encerrado: false },
    { id: 45, group: "G", round: 2, timeA: "Nova Zelândia", siglaA: "nz", timeB: "Egito", siglaB: "eg", date: new Date("2026-06-21T22:00:00"), venue: "Vancouver", encerrado: false },
    { id: 68, group: "G", round: 3, timeA: "Egito", siglaA: "eg", timeB: "Irã", siglaB: "ir", date: new Date("2026-06-26T23:00:00"), venue: "Seattle", encerrado: false },
    { id: 69, group: "G", round: 3, timeA: "Nova Zelândia", siglaA: "nz", timeB: "Bélgica", siglaB: "be", date: new Date("2026-06-26T23:00:00"), venue: "Vancouver", encerrado: false },

    // ==================== GRUPO H ====================
    { id: 14, group: "H", round: 1, timeA: "Espanha", siglaA: "es", timeB: "Cabo Verde", siglaB: "cv", date: new Date("2026-06-15T13:00:00"), venue: "Atlanta", encerrado: false },
    { id: 16, group: "H", round: 1, timeA: "Arábia Saudita", siglaA: "sa", timeB: "Uruguai", siglaB: "uy", date: new Date("2026-06-15T19:00:00"), venue: "Miami", encerrado: false },
    { id: 41, group: "H", round: 2, timeA: "Espanha", siglaA: "es", timeB: "Arábia Saudita", siglaB: "sa", date: new Date("2026-06-21T13:00:00"), venue: "Atlanta", encerrado: false },
    { id: 43, group: "H", round: 2, timeA: "Uruguai", siglaA: "uy", timeB: "Cabo Verde", siglaB: "cv", date: new Date("2026-06-21T19:00:00"), venue: "Miami", encerrado: false },
    { id: 66, group: "H", round: 3, timeA: "Cabo Verde", siglaA: "cv", timeB: "Arábia Saudita", siglaB: "sa", date: new Date("2026-06-26T21:00:00"), venue: "Houston", encerrado: false },
    { id: 67, group: "H", round: 3, timeA: "Uruguai", siglaA: "uy", timeB: "Espanha", siglaB: "es", date: new Date("2026-06-26T21:00:00"), venue: "Guadalajara", encerrado: false },

    // ==================== GRUPO I ====================
    { id: 19, group: "I", round: 1, timeA: "França", siglaA: "fr", timeB: "Senegal", siglaB: "sn", date: new Date("2026-06-16T16:00:00"), venue: "Nova York", encerrado: false },
    { id: 20, group: "I", round: 1, timeA: "Iraque", siglaA: "iq", timeB: "Noruega", siglaB: "no", date: new Date("2026-06-16T19:00:00"), venue: "Boston", encerrado: false },
    { id: 47, group: "I", round: 2, timeA: "França", siglaA: "fr", timeB: "Iraque", siglaB: "iq", date: new Date("2026-06-22T18:00:00"), venue: "Filadélfia", encerrado: false },
    { id: 48, group: "I", round: 2, timeA: "Noruega", siglaA: "no", timeB: "Senegal", siglaB: "sn", date: new Date("2026-06-22T21:00:00"), venue: "Nova York", encerrado: false },
    { id: 64, group: "I", round: 3, timeA: "Noruega", siglaA: "no", timeB: "França", siglaB: "fr", date: new Date("2026-06-26T16:00:00"), venue: "Boston", encerrado: false },
    { id: 65, group: "I", round: 3, timeA: "Senegal", siglaA: "sn", timeB: "Iraque", siglaB: "iq", date: new Date("2026-06-26T16:00:00"), venue: "Toronto", encerrado: false },

    // ==================== GRUPO J ====================
    { id: 21, group: "J", round: 1, timeA: "Argentina", siglaA: "ar", timeB: "Argélia", siglaB: "dz", date: new Date("2026-06-16T22:00:00"), venue: "Kansas City", encerrado: false },
    { id: 22, group: "J", round: 1, timeA: "Áustria", siglaA: "at", timeB: "Jordânia", siglaB: "jo", date: new Date("2026-06-17T01:00:00"), venue: "São Francisco", encerrado: false },
    { id: 46, group: "J", round: 2, timeA: "Argentina", siglaA: "ar", timeB: "Áustria", siglaB: "at", date: new Date("2026-06-22T14:00:00"), venue: "Dallas", encerrado: false },
    { id: 49, group: "J", round: 2, timeA: "Jordânia", siglaA: "jo", timeB: "Argélia", siglaB: "dz", date: new Date("2026-06-23T00:00:00"), venue: "São Francisco", encerrado: false },
    { id: 72, group: "J", round: 3, timeA: "Argélia", siglaA: "dz", timeB: "Áustria", siglaB: "at", date: new Date("2026-06-27T23:00:00"), venue: "Kansas City", encerrado: false },
    { id: 71, group: "J", round: 3, timeA: "Jordânia", siglaA: "jo", timeB: "Argentina", siglaB: "ar", date: new Date("2026-06-27T23:00:00"), venue: "Dallas", encerrado: false },

    // ==================== GRUPO K ====================
    { id: 23, group: "K", round: 1, timeA: "Portugal", siglaA: "pt", timeB: "RD Congo", siglaB: "cd", date: new Date("2026-06-17T14:00:00"), venue: "Houston", encerrado: false },
    { id: 24, group: "K", round: 1, timeA: "Uzbequistão", siglaA: "uz", timeB: "Colômbia", siglaB: "co", date: new Date("2026-06-18T00:00:00"), venue: "Cidade do México", encerrado: false },
    { id: 50, group: "K", round: 2, timeA: "Portugal", siglaA: "pt", timeB: "Uzbequistão", siglaB: "uz", date: new Date("2026-06-23T14:00:00"), venue: "Houston", encerrado: false },
    { id: 51, group: "K", round: 2, timeA: "Colômbia", siglaA: "co", timeB: "RD Congo", siglaB: "cd", date: new Date("2026-06-24T00:00:00"), venue: "Guadalajara", encerrado: false },
    { id: 70, group: "K", round: 3, timeA: "Colômbia", siglaA: "co", timeB: "Portugal", siglaB: "pt", date: new Date("2026-06-27T20:30:00"), venue: "Miami", encerrado: false },
    { id: 71, group: "K", round: 3, timeA: "RD Congo", siglaA: "cd", timeB: "Uzbequistão", siglaB: "uz", date: new Date("2026-06-27T20:30:00"), venue: "Atlanta", encerrado: false },

    // ==================== GRUPO L ====================
    { id: 9, group: "L", round: 1, timeA: "Inglaterra", siglaA: "gb-eng", timeB: "Croácia", siglaB: "hr", date: new Date("2026-06-17T17:00:00"), venue: "Dallas", encerrado: false },
    { id: 15, group: "L", round: 1, timeA: "Gana", siglaA: "gh", timeB: "Panamá", siglaB: "pa", date: new Date("2026-06-17T20:00:00"), venue: "Toronto", encerrado: false },
    { id: 29, group: "L", round: 2, timeA: "Inglaterra", siglaA: "gb-eng", timeB: "Gana", siglaB: "gh", date: new Date("2026-06-23T17:00:00"), venue: "Boston", encerrado: false },
    { id: 35, group: "L", round: 2, timeA: "Panamá", siglaA: "pa", timeB: "Croácia", siglaB: "hr", date: new Date("2026-06-23T20:00:00"), venue: "Toronto", encerrado: false },
    { id: 44, group: "L", round: 3, timeA: "Panamá", siglaA: "pa", timeB: "Inglaterra", siglaB: "gb-eng", date: new Date("2026-06-27T18:00:00"), venue: "Nova York", encerrado: false },
    { id: 45, group: "L", round: 3, timeA: "Croácia", siglaA: "hr", timeB: "Gana", siglaB: "gh", date: new Date("2026-06-27T18:00:00"), venue: "Filadélfia", encerrado: false }
  ]
};

export default matchesData;