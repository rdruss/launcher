
import { Injectable } from "@angular/core";
import { Gui, History, Input, Option, SubmittableInput, MetaData } from "./model";
import { ForgeService } from "./forge.service";

var adocIndex = require('../../assets/adoc.index');

@Injectable()
export class GuiService {
  private command = "launchpad-new-project";
  private gui: Gui;
  private missions: SubmittableInput;
  private loading: Promise<Gui>;
  private steps: string[] = ['Continuous Delivery', 'Missions', 'Runtime', 'Review'];

  constructor(private forgeService: ForgeService) {
    this.loading = forgeService.commandInfo(this.command).then(this.splitGui);
  }

  private splitGui = (gui:Gui): Gui => {
      this.gui = gui;
      gui.state.steps = this.steps;
      for (let index in this.gui.inputs) {
        let input = this.gui.inputs[index];
        if ((input as Input).valueType == "io.openshift.launchpad.catalog.Mission") {
          this.missions = input;
          this.gui.inputs.splice(+index, 1);
        }
      }
      return gui;
  }

  get 'Continuous Delivery'(): Gui {
    let gui = this.createGui();
    gui.state.canMoveToPreviousStep = false;
    gui.metadata = {intro: adocIndex["launchpad-launch-mission"]} as MetaData;
    gui.inputs = [{
      label: "Zip or Continuous Delivery", name: "zipOrCD", class: "UISelectOne", valueChoices:
        [{ id: "Continuous Delivery" }, { id: "Zip" }], value: "Continuous Delivery"
    } as Input];
    return gui;
  }

  get Missions(): Gui {
    let gui = this.createGui();
    gui.metadata = {intro: adocIndex["mission-intro"]} as MetaData;
    if (this.missions) {
      gui.inputs = [this.missions];
    } else {
      this.loading.then(_ => gui.inputs = [this.missions]);
    }
    return gui;
  }

  get Runtime(): Gui {
    let gui = this.createGui();

    if (this.gui) {
      gui.inputs = this.gui.inputs;
    } else {
      this.loading.then(_ => gui.inputs = this.gui.inputs);
    }
    
    return gui;
  }

  get Review(): Gui {
    let gui = this.createGui();
    gui.state.steps = null;
    gui.inputs = [];
    gui.results = [];

    return gui;
  }

  getGui(index: number): Gui {
    let page = this.steps[index];
    return this[page];
  }

  loadGui(index: number): Promise<Gui> {
    return this.loading.then(gui => {
      return this.getGui(index);
    });
  }

  validate(index: number, history: History): Promise<Gui> {
    const gui = history.currentGui();

    if (index == 2 || index == 1) {
      this.loading = this.forgeService.validate(this.command, history).then(gui => {
        this.splitGui(gui);
        return this.getGui(index);
      });
      return this.loading;
    }
    
    return Promise.resolve(gui);
  }

  createGui(): Gui {
    let gui = new Gui();
    gui.metadata = new MetaData();
    gui.state.steps = this.steps;
    gui.state.canMoveToNextStep = true;
    gui.state.canMoveToPreviousStep = true;

    return gui;
  }
}