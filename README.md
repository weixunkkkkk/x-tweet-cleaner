# X Cleaner Scripts

中文 | [English](#english)

一组可以直接粘贴到浏览器 Console 里运行的 X/Twitter 辅助脚本，用来整理你自己的账号内容和关注列表。

目前包含：

- `src/auto-clear-all.js`：批量删除原创推文，并撤销转推
- `src/auto-unfollow.js`：批量取消关注

不需要安装依赖，不需要浏览器插件。打开 X 页面，按 `F12`，复制脚本到 `Console` 后运行即可。

## 重要风险提示

请先读完这一段再运行真实操作。

- 只用于你自己的 X/Twitter 账号。
- 删除推文后无法通过本脚本恢复。运行前请先备份你的 X 数据归档。
- 取消关注后，脚本不会保存被取消关注的账号名单；需要的话请提前手动备份关注列表。
- X 前端经常变化，按钮选择器可能失效。
- 批量操作可能触发平台限制、验证或临时风控。脚本的延时只是降低 UI 操作失败概率，不能保证账号安全。
- 默认 `dryRun: true`，只模拟识别，不会真的删除或取消关注。确认日志没问题后，再改成 `dryRun: false`。

## 使用前建议

1. 先下载 X 数据归档，备份推文、媒体和账号数据。
2. 先用 `dryRun: true` 跑一遍，确认识别数量正常。
3. 第一次真实运行时把 `maxActions` 设小一点，例如 `5`。
4. 运行过程中盯着页面看，发现异常立刻刷新页面停止。

## 删除推文与撤销转推

1. 打开你自己的 X 个人主页。
2. 按 `F12`，进入 `Console`。
3. 复制 [`src/auto-clear-all.js`](src/auto-clear-all.js) 的全部内容并粘贴运行。
4. 先查看 dry-run 日志。
5. 确认没问题后，把脚本顶部配置改成：

```js
dryRun: false,
maxActions: 5,
```

6. 再次运行。

停止命令：

```js
window.__xPostCleanerStop = true;
```

也可以直接刷新页面停止。

## 批量取消关注

1. 打开你的 X 关注列表页面，例如个人主页里的 `Following` / `正在关注` 列表。
2. 按 `F12`，进入 `Console`。
3. 复制 [`src/auto-unfollow.js`](src/auto-unfollow.js) 的全部内容并粘贴运行。
4. 先查看 dry-run 日志。
5. 确认没问题后，把脚本顶部配置改成：

```js
dryRun: false,
maxActions: 5,
```

6. 再次运行。

停止命令：

```js
window.__xUnfollowCleanerStop = true;
```

也可以直接刷新页面停止。

## 配置说明

两个脚本顶部都有 `config` 配置块：

```js
const config = {
  dryRun: true,
  maxActions: 30,
  actionDelayMs: 3000,
  scrollDelayMs: 2200,
  scrollStepPx: 1000,
  maxEmptyScrolls: 8,
};
```

- `dryRun`：是否试运行。建议先保持 `true`。
- `maxActions`：本次最多执行多少次真实操作或模拟操作。
- `actionDelayMs`：每次操作后的等待时间。
- `scrollDelayMs`：滚动加载后的等待时间。
- `scrollStepPx`：每次向下滚动距离。
- `maxEmptyScrolls`：连续多少次滚动都找不到目标按钮后停止。

## English

Browser-console scripts for cleaning up your own X/Twitter account. They help you remove your own posts, undo reposts, and unfollow accounts from pages already loaded in the X web UI.

Included scripts:

- `src/auto-clear-all.js`: deletes original posts and undoes reposts
- `src/auto-unfollow.js`: unfollows accounts from your following list

No install step, no browser extension. Open X in your browser, press `F12`, paste a script into the `Console`, and run it.

## Safety Notice

Read this before running real actions.

- Use these scripts only on your own X/Twitter account.
- Deleted posts cannot be restored by this script. Back up your X data archive first.
- The unfollow script does not save the accounts it unfollows. Back up your following list first if you need it.
- X changes its frontend often, so selectors can break.
- Bulk actions may trigger platform limits, verification, or temporary account restrictions. Delays only reduce UI failure risk; they do not guarantee account safety.
- Scripts default to `dryRun: true`, which only logs what would happen. Switch to `dryRun: false` only after the logs look correct.

## Clear Posts And Reposts

1. Open your own X profile page.
2. Press `F12` and open the `Console` tab.
3. Paste all content from [`src/auto-clear-all.js`](src/auto-clear-all.js).
4. Run it once in dry-run mode.
5. If the logs look correct, change the top config to:

```js
dryRun: false,
maxActions: 5,
```

6. Run it again.

Stop command:

```js
window.__xPostCleanerStop = true;
```

Refreshing the page also stops the script.

## Unfollow Accounts

1. Open your X following list.
2. Press `F12` and open the `Console` tab.
3. Paste all content from [`src/auto-unfollow.js`](src/auto-unfollow.js).
4. Run it once in dry-run mode.
5. If the logs look correct, change the top config to:

```js
dryRun: false,
maxActions: 5,
```

6. Run it again.

Stop command:

```js
window.__xUnfollowCleanerStop = true;
```

Refreshing the page also stops the script.

## Configuration

Each script has a `config` block near the top:

```js
const config = {
  dryRun: true,
  maxActions: 30,
  actionDelayMs: 3000,
  scrollDelayMs: 2200,
  scrollStepPx: 1000,
  maxEmptyScrolls: 8,
};
```

- `dryRun`: preview mode. Keep this as `true` first.
- `maxActions`: maximum number of actions in one run.
- `actionDelayMs`: delay after each action.
- `scrollDelayMs`: delay after scrolling.
- `scrollStepPx`: scroll distance per page step.
- `maxEmptyScrolls`: stop after this many scrolls without matching buttons.
