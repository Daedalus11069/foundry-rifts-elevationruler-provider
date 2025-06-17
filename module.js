Hooks.once("ready", () => {
  const walk = {
    name: "Walk",
    color: Color.from(0x00ff00),
    multiplier: 1
  };
  const run = {
    name: "Dash",
    color: Color.from(0xff8000),
    multiplier: 2
  };
  const max = {
    name: "Maximum",
    color: Color.from(0xff0000),
    multiplier: Number.POSITIVE_INFINITY
  };

  CONFIG.elevationruler.SPEED.CATEGORIES.splice(
    0,
    CONFIG.elevationruler.SPEED.CATEGORIES.length,
    ...[walk, run, max]
  );

  CONFIG.elevationruler.MOVEMENT_TYPES.SWIM = 3; // Increment by 1 from the highest-valued movement type
  CONFIG.elevationruler.MOVEMENT_TYPES.ACROBATICS = 4;
  CONFIG.elevationruler.MOVEMENT_TYPES.TELEPORT = 5;

  // These labels are from Font Awesome
  CONFIG.elevationruler.SPEED.ATTRIBUTES.WALK =
    "actor.system.props.yards_per_action";
  CONFIG.elevationruler.SPEED.ATTRIBUTES.BURROW =
    "actor.system.props.yards_per_action";
  CONFIG.elevationruler.SPEED.ATTRIBUTES.FLY =
    "actor.system.props.yards_per_action";
  CONFIG.elevationruler.SPEED.ATTRIBUTES.SWIM =
    "actor.system.props.yards_per_action";
  CONFIG.elevationruler.SPEED.ATTRIBUTES.ACROBATICS =
    "actor.system.props.yards_per_action";
  CONFIG.elevationruler.SPEED.ATTRIBUTES.TELEPORT =
    "actor.system.props.yards_per_action";

  CONFIG.elevationruler.MOVEMENT_BUTTONS[
    CONFIG.elevationruler.MOVEMENT_TYPES.SWIM
  ] = "person-swimming";

  CONFIG.elevationruler.MOVEMENT_BUTTONS[
    CONFIG.elevationruler.MOVEMENT_TYPES.ACROBATICS
  ] = "person-running-fast";

  CONFIG.elevationruler.MOVEMENT_BUTTONS[
    CONFIG.elevationruler.MOVEMENT_TYPES.TELEPORT
  ] = "portal-enter";

  CONFIG.elevationruler.pathfindingCheckTerrains = true;

  CONFIG.elevationruler.SPEED.useFontAwesome = true;
  CONFIG.elevationruler.SPEED.terrainSymbol = "\uf071";

  /**
   * Given a token, retrieve its base speed.
   * @param {Token} token                   Token whose speed is required
   * @returns {number} Distance, in grid units
   */
  CONFIG.elevationruler.SPEED.tokenSpeed = function (token) {
    const speedAttribute =
      CONFIG.elevationruler.SPEED.ATTRIBUTES[token.movementType] ??
      CONFIG.elevationruler.SPEED.ATTRIBUTES.WALK;
    const speed = Number(foundry.utils.getProperty(token, speedAttribute));
    return speed;
  };
});

// Hooks.on("updateToken", async (token, changed, _options, _userId) => {
//   if (
//     typeof changed?.flags?.["rifts-csb-elevationruler-provider"] === "undefined"
//   ) {
//     if (
//       typeof token.flags.elevationruler.movementHistory.lastMoveDistance !==
//       "undefined"
//     ) {
//       const lastMoveDistance = token.getFlag(
//         "rifts-csb-elevationruler-provider",
//         "rep-last-move",
//         0
//       );
//       const start = { x: token.x, y: token.y, z: token.elevation };
//       const end = token.getFlag(
//         "rifts-csb-elevationruler-provider",
//         "rep-last-point",
//         start
//       );
//       console.log(token, changed);
//       if (false) {
//         console.log("executed undo");
//         let newDistance =
//           parseInt(token.actor.system.props.yards_per_action, 10) +
//           game.modules
//             .get("elevationruler")
//             .api.measure.MoveDistanceGridded.measure(start, end).distance;

//         if (newDistance > token.actor.system.props.attacks_max) {
//           newDistance = token.actor.system.props.attacks_max;
//         }
//         await token.actor.update({
//           "system.props.yards_per_action": `${newDistance}`
//         });
//       } else {
//         await token.setFlag(
//           "rifts-csb-elevationruler-provider",
//           "rep-last-point",
//           {
//             x: token.x,
//             y: token.y,
//             z: token.elevation
//           }
//         );
//         await token.setFlag(
//           "rifts-csb-elevationruler-provider",
//           "rep-last-move",
//           token.flags.elevationruler.movementHistory.lastMoveDistance
//         );
//         await token.actor.update({
//           "system.props.yards_per_action": `${
//             parseInt(token.actor.system.props.yards_per_action, 10) -
//             token.flags.elevationruler.movementHistory.lastMoveDistance
//           }`
//         });
//       }
//     }
//   }
// });
