import {useState} from 'react';

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
          debut: action.evenement.debut,
          fin: action.evenement.fin,
        },
      ];
    }
    case 'changed': {
      return evenements.map(t => {
        if (t.id === action.evenement.id) {
          return action.evenement;
        } else {
          return t;
        }
      });
    }
    case 'deleted': {
      return evenements.filter(t => t.id !== action.id);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}
