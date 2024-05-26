import { visit } from "@ember/test-helpers";
import { test } from "qunit";
import { acceptance } from "discourse/tests/helpers/qunit-helpers";

acceptance("Progress Bar - Routing", function () {
  test("progress bar is visible on the homepage", async function (assert) {
    settings.display_on_homepage = true;
    await visit("/");
    assert
      .dom(".progress-bar__component")
      .exists("shows the progress bar on the homepage");
  });

  test("progress bar is hidden from the homepage", async function (assert) {
    settings.display_on_homepage = false;
    await visit("/");
    assert
      .dom(".progress-bar__component")
      .doesNotExist("hides the progress bar on the homepage");
  });

  test("progress bar is visible on a set route", async function (assert) {
    settings.display_on_homepage = false;
    await visit("/c/1");
    assert
      .dom(".progress-bar__component")
      .exists("shows the progress bar on the /c/* route");
  });

  test("progress bar is not visible on other routes", async function (assert) {
    settings.display_on_homepage = false;
    await visit("/u");
    assert
      .dom(".progress-bar__component")
      .doesNotExist("does not show the progress bar on the /u route");
  });
});

acceptance("Progress Bar - Is full", function () {
  test("progress bar is hidden when full", async function (assert) {
    settings.display_on_homepage = true;
    settings.hide_when_full = true;

    settings.max_value = 100;
    settings.current_value = 100;
    await visit("/");
    assert
      .dom(".progress-bar__component")
      .doesNotExist("does not show the progress bar when full");

    settings.max_value = 100;
    settings.current_value = 101;
    await visit("/");
    assert
      .dom(".progress-bar__component")
      .doesNotExist("does not show the progress bar when more than full");
  });
});

acceptance("Progress Bar - Mobile view", function (needs) {
  needs.mobileView();
  test("progress bar is not visible on mobile", async function (assert) {
    settings.display_on_homepage = true;
    settings.display_on_mobile = false;
    await visit("/");
    assert
      .dom(".progress-bar__component")
      .doesNotExist("does not show the progress bar on mobile");
  });
});
