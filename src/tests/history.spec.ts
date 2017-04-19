
import { History, Gui } from "../app/shared/model";

describe('History and deeplinking', () => {
  it('should build History based on param', () => {
    //given
    let gui = new Gui();
    gui.inputs = [{name: "input", value: "the-value"}];

    let pristineGui = new Gui();
    pristineGui.inputs = [{name: "input", value: ""}];

    //when
    let history = new History(btoa(JSON.stringify(gui)));

    history.apply(pristineGui);

    expect(history.get(0)).toBeDefined('no gui restored?');
    expect(history.get(0).inputs[0].value).toBe("the-value");
  });

  it('should ignore empty state', () => {
    //given
    let gui1 = new Gui();
    gui1.inputs = [{name: "input", value: "the-value"}];

    let gui2 = new Gui();
    gui2.inputs = [{name: "input", value: ""}];

    //when
    let history = new History("");
    history.apply(gui1);
    history.apply(gui2);

    expect(history.get(0)).toBeDefined('no gui restored?');
    expect(history.get(0).inputs[0].value).toBe("the-value");

    expect(history.get(1)).toBeDefined('no gui restored?');
    expect(history.get(1).inputs[0].value).toBe("");

    expect(history.toString()).toBe("eyJzdGF0ZSI6e30sInN0ZXBJbmRleCI6MSwiaW5wdXRzIjpbeyJuYW1lIjoiaW5wdXQiLCJ2YWx1ZSI6InRoZS12YWx1ZSJ9LHsibmFtZSI6ImlucHV0IiwidmFsdWUiOiIifV19");
  });

});