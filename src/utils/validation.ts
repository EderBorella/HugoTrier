// export function validateActionConsistency(): void {
//   // Assure that all actions listed in areas exist in allActions
//   // And that their areaId matches the area they are listed in
//   Object.values(allAreas).forEach((area) => {
//     area.availableActionIds.forEach((actionId) => {
//       const action = allActions[actionId];
//       if (!action) {
//         throw new Error(
//           `Action ${actionId} listed in ${area.id} but not defined`,
//         );
//       }
//       if (action.areaId !== area.id) {
//         throw new Error(
//           `Action ${actionId} has areaId ${action.areaId} but listed in ${area.id}`,
//         );
//       }
//     });
//   });
// }
