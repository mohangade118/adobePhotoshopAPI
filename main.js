const { entrypoints } = require("uxp");

  showAlert = () => {
    alert("This is an alert message");
  }

  entrypoints.setup({
    commands: {
      showAlert,
    },
    panels: {
      vanilla: {
        show(node ) {
        }
      }
    }
  });

function showLayerNames() {
    const app = require("photoshop").app;
    const allLayers = app.activeDocument.layers;
    const allLayerNames = allLayers.map(layer => layer.name);
    const sortedNames = allLayerNames.sort((a, b) => a < b ? -1 : a > b ? 1 : 0);
    document.getElementById("layers").innerHTML = `
      <ul>${
        sortedNames.map(name => `<li>${name}</li>`).join("")
      }</ul>`;
}

function playActions() {
  
  const app = require('photoshop').app;

  const myDoc = app.activeDocument;
  const height = myDoc.height;
  const width = myDoc.width;
  const resolution = myDoc.resolution;
  console.log(`Doc size is ${width} x ${height}. Resolution is ${resolution}`);

  // Get the list of the actions from the photoshop
  const allActionSets = app.actionTree;
  const firstActionSet = allActionSets[0];
  let actions = new Map(); // a JS Map allows easy "find by name" operations
  firstActionSet.actions.forEach((action) => { actions.set(action.name, action)});
  const myAction = actions.get("NewAction101");
  console.log("**********************");
  console.log(myAction.name);
  console.log("**********************");

  console.log("Play Photoshop.......");
  const action1 =  async function playMyAction(executionContext) {
      await myAction.play();
  }

  const start = async function(){
    await require('photoshop').core.executeAsModal(action1);
  }

  // Call the fuction to play action from the photoshop action list
  start();

}

document.getElementById("btnPopulate").addEventListener("click", showLayerNames);

document.getElementById("btnTest").addEventListener("click", playActions);
