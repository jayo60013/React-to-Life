export const GAME_OF_LIFE = [
  // When DEAD (state 0)
  {
    "transistions": {
      // If 5 DEAD and 3 ALIVE then ALIVE
      "53": 1,
    },
    // else dead
    "default": 0,
    "stateName": "Dead",
    "colour": "#fff",
  },
  // When ALIVE (state 1)
  {
    "transistions": {
      // if 6 DEAD and 2 ALIVE
      "62": 1,
      // or if 5 DEAD and 3 ALIVE
      "53": 1,
      // then alive
    },
    // else dead
    "default": 0,
    "stateName": "Alive",
    "colour": "#000",
  },
];

export const SEEDS = [
  {
    "transistions": {
      "62": 1,
    },
    "default": 0,
    "stateName": "Dead",
    "colour": "#fff",
  },
  {
    "transistions": {},
    "default": 0,
    "stateName": "Alive",
    "colour": "#000",
  },
];

export const BRAINS_BRAIN = [
  // off (Dead)
  {
    "transistions": {
      "026": 1,
      "125": 1,
      "224": 1,
      "323": 1,
      "422": 1,
      "521": 1,
      "620": 1,
    },
    "default": 0,
    "stateName": "Dead",
    "colour": "#000",
  },
  // on (Alive)
  {
    "transistions": {},
    "default": 2,
    "stateName": "Alive",
    "colour": "#FFF",
  },
  // Dying
  {
    "transistions": {},
    "default": 0,
    "stateName": "Dying",
    "colour": "#00F",
  },
];
