# tic-tac-toe

responsive layout tic-tac-toe game

technologies used:

- HTML
- CSS
- JS (with a focus on module and factory design patterns)

learning notes:

- over-engineered the solution which made it take a long time to achieve things without constantly breaking the game code (also led to me getting lazy towards the end so the code has become messier than intended due to it taking longer than expected)
- playTurn() doesn't return whether the move is valid or not (this happens in play()) so unable to add error message when reselecting a taken grid square
- responsive layouts are easier if made mobile first

[live demo](https://jochuu.github.io/tic-tac-toe/)
