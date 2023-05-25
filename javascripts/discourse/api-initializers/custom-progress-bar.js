import { apiInitializer } from "discourse/lib/api";
import DiscourseTemplateMap from "discourse-common/lib/discourse-template-map";

// Should be the same name as the file in /templates.
const TEMPLATE_NAME = "custom-progress-bar";

export default apiInitializer("0.11.1", (api, t) => {
  if (!settings.outlet_name.length) {
    return;
  }

  const { themeTemplates } = DiscourseTemplateMap;

  if (!themeTemplates.has(TEMPLATE_NAME)) {
    return;
  }

  // Insert dynamically a new connector based on the template.
  themeTemplates.set(
    `connectors/${settings.outlet_name}/${TEMPLATE_NAME}`,
    themeTemplates.get(TEMPLATE_NAME)
  );
});
