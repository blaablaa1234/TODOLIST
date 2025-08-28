export interface MissionData {
  id: number;
  title: string;
  difficulty: number;
  completed: boolean;
}

export const missionItems: MissionData[] = [
  {
    id: 1,
    title: "An option to add fiels",
    difficulty: 3,
    completed: true,
  },
  {
    id: 2,
    title: "A connection to db",
    difficulty: 6,
    completed: false,
  },
  {
    id: 3,
    title: "Make it faster",
    difficulty: 8,
    completed: true,
  },
  {
    id: 4,
    title: "More solid",
    difficulty: 2,
    completed: true,
  },
  {
    id: 5,
    title: "add an option to use polyline",
    difficulty: 5,
    completed: false,
  },
  {
    id: 6,
    title: "Make more css",
    difficulty: 5,
    completed: false,
  },
];
