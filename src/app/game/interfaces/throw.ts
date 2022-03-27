export interface ThrowResponse {
  result: Throw
}

export interface ThrowsResponse {
  throws: Throw[],
  winning_percentage: number
}

export interface Throw {
    black_dice: number,
    red_dice: number,
    id: number,
    player_id?: number,
    result: string,
    created_at: string,
    updated_at: string,
}

