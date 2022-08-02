export class Game {
  public players: string[] = [];
  public stack: string[] = [];
  public playedCards: string[] = [];
  public currentPlayer: number = 0;
  public avatar = []
  public pickCardAniamtion = false;
  public currentCard: string = '';


  constructor() {
    for (let i = 1; i < 52; i++) {
      this.stack.push('card (' + i + ')');
    }
    shuffle(this.stack);
  }


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
