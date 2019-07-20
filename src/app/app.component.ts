import { Component } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "Random color Chess with Behavior Subject";
  bs: BehaviorSubject<number[]> = new BehaviorSubject([0, 0]);
  board = [[{ color: "blue" }, { color: "orange" }]];
  constructor() {
    console.log(this.bs);

    //browser event/method to trigger timer
    setInterval(() => {
      this.bs.next([
        Math.round(Math.random() * 10),
        Math.round(Math.random() * 10)
      ]);
    }, 100);

    this.bs.subscribe(x => {
      this.populateBoard(x);
    });
  }
  populateBoard(rowCol: number[]) {
    if (this.board.length <= rowCol[0] + 1) {
      for (let index = 0; index <= rowCol[0] + 1; index++) {
        if (!this.board[index]) {
          this.board[index] = [{ color: null }];
        }
      }
    }
    this.board[rowCol[0]][rowCol[1]] = { color: this.getColor() };
  }
  getColor() {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
  }
}
