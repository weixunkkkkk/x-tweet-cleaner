/**
 * X Unfollow Cleaner
 *
 * Paste this file into the browser console on your own X/Twitter following page.
 * It can unfollow accounts currently loaded in the UI.
 *
 * Stop command:
 *   window.__xUnfollowCleanerStop = true
 */
(async function autoUnfollow() {
  const config = {
    dryRun: true,
    maxActions: 30,
    actionDelayMs: 3000,
    confirmDelayMs: 900,
    scrollDelayMs: 2200,
    scrollStepPx: 1000,
    maxEmptyScrolls: 8,
    followingTexts: ["Following", "正在关注"],
  };

  const state = {
    unfollowedAccounts: 0,
    skippedItems: 0,
    emptyScrolls: 0,
  };
  const seenDryRunButtons = new WeakSet();
  const skippedButtons = new WeakSet();

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const log = (...args) => console.log("[x-unfollow-cleaner]", ...args);

  const clickOutside = () => {
    document.body.dispatchEvent(
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window,
      }),
    );
  };

  const clickElement = async (element) => {
    element.scrollIntoView({ block: "center", inline: "center" });
    await sleep(250);
    element.click();
  };

  const getButtonText = (button) => (
    button.innerText ||
    button.textContent ||
    ""
  ).trim();

  const findFollowingButton = () => {
    const buttons = Array.from(
      document.querySelectorAll('button, div[role="button"]'),
    );

    return buttons.find((button) => {
      if (seenDryRunButtons.has(button) || skippedButtons.has(button)) return false;
      return config.followingTexts.includes(getButtonText(button));
    });
  };

  const unfollowFirstAccount = async () => {
    const followingButton = findFollowingButton();
    if (!followingButton) return false;

    if (config.dryRun) {
      seenDryRunButtons.add(followingButton);
      state.unfollowedAccounts += 1;
      log(`dry run: would unfollow account #${state.unfollowedAccounts}`);
      followingButton.scrollIntoView({ block: "center", inline: "center" });
      await sleep(config.actionDelayMs);
      return true;
    }

    await clickElement(followingButton);
    await sleep(config.confirmDelayMs);

    const confirmButton = document.querySelector(
      '[data-testid="confirmationSheetConfirm"]',
    );
    if (!confirmButton) {
      skippedButtons.add(followingButton);
      state.skippedItems += 1;
      clickOutside();
      log("skipped account: confirmation button was not found");
      await sleep(config.actionDelayMs);
      return true;
    }

    await clickElement(confirmButton);
    state.unfollowedAccounts += 1;
    log(`unfollowed accounts: ${state.unfollowedAccounts}`);
    await sleep(config.actionDelayMs);
    return true;
  };

  log("started. Refresh the page or run `window.__xUnfollowCleanerStop = true` to stop.");
  log("config:", config);

  while (
    !window.__xUnfollowCleanerStop &&
    state.unfollowedAccounts < config.maxActions
  ) {
    const handledAccount = await unfollowFirstAccount();
    if (handledAccount) {
      state.emptyScrolls = 0;
      continue;
    }

    state.emptyScrolls += 1;
    if (state.emptyScrolls > config.maxEmptyScrolls) {
      log("stopped: no more following buttons were found after repeated scrolling.");
      break;
    }

    log(`scrolling for more accounts (${state.emptyScrolls}/${config.maxEmptyScrolls})`);
    window.scrollBy(0, config.scrollStepPx);
    await sleep(config.scrollDelayMs);
  }

  log("finished:", state);
})();
