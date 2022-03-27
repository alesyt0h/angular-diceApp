import { User } from '../../auth/interfaces/interfaces';

export interface Ranking {
  winning_percentage: number
}

export interface Loser {
  loser: User | null
}
export interface Winner {
  winner: User | null
}
