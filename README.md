# X Cleaner Scripts

中文 | [English](#english)

> ⚠️ 一旦运行脚本并完成删除/取关操作，无法通过本项目恢复到原状态。请务必先备份 X 数据和关注列表。

一组可以直接粘贴到浏览器 Console 里运行的 X/Twitter 辅助脚本，用来整理你自己的账号内容和关注列表。

目前包含：

- [`src/auto-clear-all.js`](src/auto-clear-all.js)：批量删除原创推文，并撤销转推
- [`src/auto-unfollow.js`](src/auto-unfollow.js)：批量取消关注

不需要安装依赖，不需要浏览器插件。打开 X 页面，按 `F12`，复制脚本到 `Console` 后运行即可。

## 重要风险提示

请先读完这一段再运行。

- 只用于你自己的 X/Twitter 账号。
- 这些脚本运行后会直接开始真实操作，没有试运行模式。
- 一旦使用并完成操作，无法通过本项目恢复到原状态。
- 删除推文后无法通过本脚本恢复。运行前请先备份你的 X 数据归档。
- 取消关注后，脚本不会保存被取消关注的账号名单；需要的话请提前手动备份关注列表。
- X 前端经常变化，按钮选择器可能失效。
- 批量操作可能触发平台限制、验证或临时风控。脚本里的延时只是降低 UI 操作失败概率，不能保证账号安全。
- 如果需要停止，直接刷新页面，或按 `F5`。

## 删除推文与撤销转推

1. 打开你自己的 X 个人主页。
2. 按 `F12`，进入 `Console`。
3. 复制 [`src/auto-clear-all.js`](src/auto-clear-all.js) 的全部内容。
4. 粘贴到 Console 后回车运行。
5. 脚本会优先撤销当前页面可见的转推；没有转推时，会继续查找并删除原创推文。
6. 当前可视区域处理完后，脚本会自动向下滚动加载更多内容。

停止方式：刷新页面，或按 `F5`。

## 批量取消关注

1. 打开你的 X 关注列表页面，例如个人主页里的 `Following` / `正在关注` 列表。
2. 按 `F12`，进入 `Console`。
3. 复制 [`src/auto-unfollow.js`](src/auto-unfollow.js) 的全部内容。
4. 粘贴到 Console 后回车运行。
5. 脚本会查找当前页面可见的 `正在关注` / `Following` 按钮，并逐个取消关注。
6. 当前可视区域处理完后，脚本会自动向下滚动加载更多关注账号。

停止方式：刷新页面，或按 `F5`。

## 使用前建议

1. 先下载 X 数据归档，备份推文、媒体和账号数据。
2. 取消关注前，如果你以后还想找回这些账号，请提前备份关注列表。
3. 第一次运行时建议盯着页面看，确认脚本点击的是你预期的按钮。
4. 账号较新或粉丝较少时，可以把脚本里的等待时间调长，例如从 `3000` 改成 `5000`。

## English

> ⚠️ Once these scripts run and complete delete/unfollow actions, this project cannot restore your account to its previous state. Back up your X data and following list first.

Browser-console scripts for cleaning up your own X/Twitter account. They help you remove your own posts, undo reposts, and unfollow accounts from pages already loaded in the X web UI.

Included scripts:

- [`src/auto-clear-all.js`](src/auto-clear-all.js): deletes original posts and undoes reposts
- [`src/auto-unfollow.js`](src/auto-unfollow.js): unfollows accounts from your following list

No install step, no browser extension. Open X in your browser, press `F12`, paste a script into the `Console`, and run it.

## Safety Notice

Read this before running.

- Use these scripts only on your own X/Twitter account.
- These scripts start real actions immediately. There is no dry-run mode.
- Once actions are completed, this project cannot restore your account to its previous state.
- Deleted posts cannot be restored by this script. Back up your X data archive first.
- The unfollow script does not save the accounts it unfollows. Back up your following list first if you need it.
- X changes its frontend often, so selectors can break.
- Bulk actions may trigger platform limits, verification, or temporary account restrictions. Delays only reduce UI failure risk; they do not guarantee account safety.
- To stop a running script, refresh the page or press `F5`.

## Clear Posts And Reposts

1. Open your own X profile page.
2. Press `F12` and open the `Console` tab.
3. Copy all content from [`src/auto-clear-all.js`](src/auto-clear-all.js).
4. Paste it into the Console and press Enter.
5. The script first undoes visible reposts. If no repost is found, it looks for original posts and deletes them.
6. When the current visible area is done, it scrolls down to load more content.

Stop by refreshing the page or pressing `F5`.

## Unfollow Accounts

1. Open your X following list.
2. Press `F12` and open the `Console` tab.
3. Copy all content from [`src/auto-unfollow.js`](src/auto-unfollow.js).
4. Paste it into the Console and press Enter.
5. The script finds visible `正在关注` / `Following` buttons and unfollows accounts one by one.
6. When the current visible area is done, it scrolls down to load more accounts.

Stop by refreshing the page or pressing `F5`.

## Before You Run

1. Download your X data archive first.
2. Back up your following list if you may need it later.
3. Watch the first run and make sure the script is clicking the expected buttons.
4. For newer or smaller accounts, consider increasing delays in the script, for example from `3000` to `5000`.
