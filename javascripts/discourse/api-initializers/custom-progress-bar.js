import { apiInitializer } from "discourse/lib/api";
import { withPluginApi } from "discourse/lib/plugin-api";
import CustomProgressBar from "../components/custom-progress-bar";

export default apiInitializer("0.11.1", (api) => {
  if (!settings.outlet_name.length) {
    return;
  }

  withPluginApi("1.14.0", (api) => {
    console.log("test");
    api.renderInOutlet(settings.outlet_name, CustomProgressBar);
  });
});
