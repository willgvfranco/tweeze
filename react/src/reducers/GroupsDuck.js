export const Types = {
  CREATE: 'group/CREATE',
  EDIT: 'group/EDIT',
  DELETE: 'group/DELETE'
};

export function createGroup() {
  // create group logic

  return {
    type: Types.CREATE
  };
}

export function editGroup() {
  // edit group logic

  return {
    type: Types.EDIT
  };
}

export function deleteGroup() {
  // delete group logic

  return {
    type: Types.DELETE
  };
}

const initialState = {
  '0': {
    id: 0,
    name: 'Grupo 01',
    pos: ['termo 1', 'termo grande texto largo quebra de linha', 'termo 3'],
    neg: ['termo grande texto largo', ' termo 2', 'termo 3']
  },
  '1': {
    id: 1,
    name: 'Grupo 02',
    pos: ['termo 1', 'termo 2', 'termo 3'],
    neg: ['termo 1', 'termo 2', 'termo 3']
  },
  '2': {
    id: 2,
    name: 'Grupo 03',
    pos: ['termo 1', 'termo 2', 'termo 3'],
    neg: ['termo 1', 'termo 2', 'termo 3']
  },
  '3': {
    id: 3,
    name: 'Grupo 04',
    pos: [
      'termo 1',
      'termo 2',
      'termo 3',
      'termo 3',
      'termo 3',
      'termo 3',
      'termo 3'
    ],
    neg: ['termo 1', 'termo 2', 'termo 3']
  },
  '4': {
    id: 4,
    name: 'Grupo 05',
    pos: ['termo 1', 'termo 2', 'termo 3'],
    neg: ['termo 1', 'termo 2', 'termo 3']
  },
  '5': {
    id: 5,
    name: 'Grupo 06',
    pos: ['termo 1', 'termo 2', 'termo 3'],
    neg: ['termo 1', 'termo 2', 'termo 3']
  },
  '6': {
    id: 6,
    name: 'Grupo 07',
    pos: ['termo 1', 'termo 2', 'termo 3'],
    neg: [
      'termo 1',
      'termo 2',
      'termo 3',
      'termo 3',
      'termo 3',
      'termo 3',
      'termo 3'
    ]
  }
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case Types.CREATE:
      return {
        ...state
      };
    case Types.EDIT:
      return {
        ...state
      };
    case Types.DELETE:
      return {
        ...state
      };
    default:
      return state;
  }
}
