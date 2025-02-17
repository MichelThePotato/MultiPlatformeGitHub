export function EvenementReducer(evenements, action) {
  switch (action.type) {
    case 'init': {
      return [...action.evenements];
    }
    case 'added': {
      return [
        ...evenements,
        {
          id: action.evenement.id,
          nom: action.evenement.nom,
          descr: action.evenement.descr,
          addresse: action.evenement.addresse,
          debut: action.evenement.debut,
          fin: action.evenement.fin,
        },
      ];
    }
    case 'deleted': {
      return evenements.filter(t => t.id !== action.id);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}
