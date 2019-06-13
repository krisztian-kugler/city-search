import { MarkerPipe } from "./marker.pipe";

describe("MarkerPipe", () => {
  let markerPipe: MarkerPipe;

  beforeEach(() => {
    markerPipe = new MarkerPipe(null, null);
  });

  it("should mark the search string bold in the city name", () => {
    const toBeMarked: string = markerPipe.mark("dummy", "dum");
    const output: string = `<span style="font-weight: bold">dum</span>my`;

    expect(toBeMarked).toEqual(output);
  });
});
