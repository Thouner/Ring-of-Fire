export class Game {
  public players: string[] = [];
  public stack: string[] = [];
  public playedCards: string[] = [];
  public currentPlayer: number = 0;
  public avatar: any = []
  public pickCardAniamtion = false;
  public currentCard: string = '';


  constructor() {
    for (let i = 1; i < 52; i++) {
      this.stack.push('card (' + i + ')');
    }
    shuffle(this.stack);
  }


  /**
   * convert the variable to a json
   *
   * @returns - json with all variables
   */
  public toJson() {
    return {
      players: this.players,
      stack: this.stack,
      playedCards: this.playedCards,
      currentPlayer: this.currentPlayer,
      avatar: this.avatar,
      pickCardAniamtion: this.pickCardAniamtion,
      currentCard: this.currentCard,
    };
  }
}


/**
 * shuffle an array
 *
 * @param array - the array to be shuffled
 * @returns - mixed arrays
 */
function shuffle(array) {
  let currentIndex = array.length, randomIndex;
  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}
