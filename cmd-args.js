// Nothing crazy but simple way I'll do a DEV_MODE for debugging purposes.
// Building a game from one of my students projects called Zork so I threw this in there.
// Way better and more effective ways to do this but it serves its purpose.
// More rigorous checks and protection would be needed if dev'ed further or handed out to others.

// --- START DEV DEBUGGING ---
let DEV_MODE = false
if (process.argv.find((arg) => arg === '--dev_mode' || arg === '-d')) DEV_MODE = true
// ---- END DEV DEBUGGING ----

// Then do stuff like this. You'll find this is a lot of libs.
// Wrapped in an IFEE also to get the game going vs calling a fx.
// Common in games to have a do/while type of loop since games are loops, respectively.
// I've rarely you while loops across my career so this is a less likely thing you'll see in my code.
const game = (async function () {
  console.clear()
  console.log(prompts.intro)

  do {
    if (DEV_MODE) {
      console.log('\n------------ DEV MODE ------------')
      console.log(state)
      console.log('----------------------------------')
    }

    // Exit the game on win or replay
    // if (state.winGame) {
    //   await sendResponse(prompts.win)
    //   handleGameEnd()
    // }

    const playerInput = await promptPlayer()
    handlePlayerInput(playerInput)
  } while (!state.winGame)
})()
