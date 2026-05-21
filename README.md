# X Post Cleaner

Browser-console helper for cleaning your own X/Twitter profile timeline. It can:

- delete original posts that expose a `Delete` / `删除` menu item
- undo reposts that expose X's `unretweet` controls
- stop automatically after a configurable action limit
- run in `dryRun` mode first, so you can verify what it would touch

Use this only on your own account and understand that deleted posts cannot be restored.

## Usage

1. Open your own X profile page in a desktop browser.
2. Press `F12`, then open the `Console` tab.
3. Paste the content of [`src/auto-clear-all.js`](src/auto-clear-all.js).
4. Press Enter.
5. Confirm the dry-run logs look right.
6. Change `dryRun: true` to `dryRun: false` and run it again.

## Stop

Refresh the page, or run this in the console:

```js
window.__xPostCleanerStop = true;
```

## Configuration

Edit the `config` block near the top of the script:

```js
const config = {
  dryRun: true,
  maxActions: 30,
  actionDelayMs: 1800,
  menuDelayMs: 900,
  scrollDelayMs: 2200,
  scrollStepPx: 1000,
  maxEmptyScrolls: 8,
};
```

Recommended first real run:

```js
dryRun: false,
maxActions: 5,
```

If that works, increase `maxActions` gradually.

## Notes

X changes its frontend often, so selectors may need updates over time. This script uses currently common `data-testid` selectors and menu text matching.
