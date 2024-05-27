import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { service } from "@ember/service";
import { htmlSafe } from "@ember/template";
import { defaultHomepage } from "discourse/lib/utilities";

export default class ProgressBar extends Component {
  @service router;
  @service site;
  @tracked current_value = settings.current_value;
  @tracked max_value = settings.max_value;
  @tracked hide_when_full = settings.hide_when_full;

  get contentBefore() {
    return htmlSafe(settings.content_before);
  }

  get contentAfter() {
    return htmlSafe(settings.content_after);
  }

  get hideWhenFull() {
    return !(this.hide_when_full && this.current_value >= this.max_value);
  }

  get showOnMobile() {
    return !this.site.mobileView || settings.display_on_mobile;
  }

  get showOnRoute() {
    const path = this.router.currentURL;

    if (
      settings.display_on_homepage &&
      this.router.currentRouteName === `discovery.${defaultHomepage()}`
    ) {
      return true;
    }

    if (settings.url_must_contain.length) {
      const allowedPaths = settings.url_must_contain.split("|");
      return allowedPaths.some((allowedPath) => {
        if (allowedPath.slice(-1) === "*") {
          return path.indexOf(allowedPath.slice(0, -1)) === 0;
        }
        return path === allowedPath;
      });
    }
  }

  get shouldShow() {
    return this.showOnRoute && this.hideWhenFull && this.showOnMobile;
  }

  <template>
    {{#if this.shouldShow}}
      <div class="progress-bar__component">
        <div class="progress-bar__wrap">
          <div class="progress-bar__before">
            {{{this.contentBefore}}}
          </div>
          <div class="progress-bar__data">
            <div class="progress-bar__container">
              <div class="progress-bar__bar"></div>
            </div>
            <div class="progress-bar__status"></div>
          </div>
          <div class="progress-bar__after">
            {{{this.contentAfter}}}
          </div>
        </div>
      </div>
    {{/if}}
  </template>
}
