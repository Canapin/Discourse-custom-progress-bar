import { apiInitializer } from "discourse/lib/api";
import { withPluginApi } from "discourse/lib/plugin-api";
import ProgressBar from "../components/progress-bar";

export default apiInitializer("1.14.0", (api) => {
  if (!settings.outlet_name.length) {
    return;
  }

  const body = document.querySelector('body');
  if (settings.outlet_name != '') {
    body.classList.add(settings.outlet_name+'-progress-bar');
  }
  api.renderInOutlet(settings.outlet_name, ProgressBar);
});
