/**
 * X Post Cleaner
 *
 * Paste this file into the browser console on your own X/Twitter profile page.
 * It can remove your original posts and undo reposts currently loaded in the UI.
 *
 * Stop command:
 *   window.__xPostCleanerStop = true
 *
 * Back up your X data before running this for real. Deleted posts cannot be
 * restored by this script.
 */
(async function autoClearAll() {
  const config = {
    dryRun: true,
    maxActions: 30,
    actionDelayMs: 1800,
    menuDelayMs: 900,
    scrollDelayMs: 2200,
    scrollStepPx: 1000,
    maxEmptyScrolls: 8,
  };

  const state = {
    deletedPosts: 0,
    undoneReposts: 0,
    skippedItems: 0,
    emptyScrolls: 0,
  };
  const seenDryRunReposts = new WeakSet();
  const seenDryRunCarets = new WeakSet();
  const skippedReposts = new WeakSet();
  const skippedCarets = new WeakSet();

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const log = (...args) => console.log("[x-post-cleaner]", ...args);

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

  const findMenuItemByText = (needles) => {
    const menuItems = Array.from(document.querySelectorAll('[role="menuitem"]'));
    return menuItems.find((item) => {
      const text = item.innerText || item.textContent || "";
      return needles.some((needle) => text.includes(needle));
    });
  };

  const reachedLimit = () => {
    const totalActions = state.deletedPosts + state.undoneReposts;
    return totalActions >= config.maxActions;
  };

  const undoFirstRepost = async () => {
    const repostButton = Array.from(
      document.querySelectorAll('[data-testid="unretweet"]'),
    ).find((button) => (
      !seenDryRunReposts.has(button) &&
      !skippedReposts.has(button)
    ));
    if (!repostButton) return false;

    if (config.dryRun) {
      seenDryRunReposts.add(repostButton);
      state.undoneReposts += 1;
      log(`dry run: would undo repost #${state.undoneReposts}`);
      repostButton.scrollIntoView({ block: "center", inline: "center" });
      await sleep(config.actionDelayMs);
      return true;
    }

    await clickElement(repostButton);
    await sleep(config.menuDelayMs);

    const confirmButton = document.querySelector('[data-testid="unretweetConfirm"]');
    if (!confirmButton) {
      skippedReposts.add(repostButton);
      state.skippedItems += 1;
      clickOutside();
      log("skipped repost: confirm button was not found");
      await sleep(config.actionDelayMs);
      return true;
    }

    await clickElement(confirmButton);
    state.undoneReposts += 1;
    log(`undone reposts: ${state.undoneReposts}`);
    await sleep(config.actionDelayMs);
    return true;
  };

  const deleteFirstOriginalPost = async () => {
    const carets = Array.from(
      document.querySelectorAll('[data-testid="caret"]'),
    ).filter((button) => (
      !seenDryRunCarets.has(button) &&
      !skippedCarets.has(button)
    ));
    if (carets.length === 0) return false;

    await clickElement(carets[0]);
    await sleep(config.menuDelayMs);

    const deleteButton = findMenuItemByText(["Delete", "删除"]);
    if (!deleteButton) {
      skippedCarets.add(carets[0]);
      state.skippedItems += 1;
      clickOutside();
      log("skipped item: delete menu item was not found");
      await sleep(config.actionDelayMs);
      return true;
    }

    if (config.dryRun) {
      seenDryRunCarets.add(carets[0]);
      state.deletedPosts += 1;
      log(`dry run: would delete original post #${state.deletedPosts}`);
      clickOutside();
      await sleep(config.actionDelayMs);
      return true;
    }

    await clickElement(deleteButton);
    await sleep(config.menuDelayMs);

    const confirmButton = document.querySelector(
      '[data-testid="confirmationSheetConfirm"]',
    );
    if (!confirmButton) {
      skippedCarets.add(carets[0]);
      state.skippedItems += 1;
      clickOutside();
      log("skipped post: delete confirmation button was not found");
      await sleep(config.actionDelayMs);
      return true;
    }

    await clickElement(confirmButton);
    state.deletedPosts += 1;
    log(`deleted original posts: ${state.deletedPosts}`);
    await sleep(config.actionDelayMs);
    return true;
  };

  log("started. Refresh the page or run `window.__xPostCleanerStop = true` to stop.");
  log("config:", config);

  while (!window.__xPostCleanerStop && !reachedLimit()) {
    const handledRepost = await undoFirstRepost();
    if (handledRepost) {
      state.emptyScrolls = 0;
      continue;
    }

    const handledPost = await deleteFirstOriginalPost();
    if (handledPost) {
      state.emptyScrolls = 0;
      continue;
    }

    state.emptyScrolls += 1;
    if (state.emptyScrolls > config.maxEmptyScrolls) {
      log("stopped: no more matching items were found after repeated scrolling.");
      break;
    }

    log(`scrolling for more items (${state.emptyScrolls}/${config.maxEmptyScrolls})`);
    window.scrollBy(0, config.scrollStepPx);
    await sleep(config.scrollDelayMs);
  }

  log("finished:", state);
})();
