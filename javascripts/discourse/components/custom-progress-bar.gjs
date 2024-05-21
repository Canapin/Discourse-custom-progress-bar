import Component from "@glimmer/component";
import { htmlSafe } from "@ember/template";
import { tracked } from "@glimmer/tracking";

export default class CustomProgressBar extends Component {
  @tracked current_value = settings.current_value;
  @tracked max_value = settings.max_value;
  @tracked hide_when_full = settings.hide_when_full;

  get contentBefore() {
    return htmlSafe(settings.content_before);
  }

  get contentAfter() {
    return htmlSafe(settings.content_after);
  }

  get shouldShowProgressBar() {
    return !(this.hide_when_full && this.current_value >= this.max_value);
  }

  <template>
    {{#if this.shouldShowProgressBar}}
      <div class="custom-progress-bar">
        <div class="wrap">
          <div class="progress-bar-wrap">
            <div class="progress-bar-before">
              {{{this.contentBefore}}}
            </div>
            <div class="progress-bar-data">
              <div class="progress-bar-container">
                <div class="progress-bar"></div>
              </div>
              <div class="progress-status"></div>
            </div>
            <div class="progress-bar-after">
              {{{this.contentAfter}}}
            </div>
          </div>
        </div>
      </div>
    {{/if}}
  </template>
}
