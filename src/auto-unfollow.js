async function autoUnfollow() {
    console.log("%c🚀 开始批量取消关注，如需停止请直接刷新页面 (F5)...", "color: orange; font-size: 16px; font-weight: bold;");
    console.warn("⚠️ 风险提示：脚本会直接执行取消关注操作，且不会保存取关名单；一旦完成无法通过本脚本恢复原关注列表。请先备份关注列表。");
    
    let unfollowCount = 0;
    // 延时函数
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    while (true) {
        // 1. 查找当前页面上所有显示为“正在关注”或“Following”的按钮
        let followBtns = Array.from(document.querySelectorAll('button, div[role="button"]')).filter(btn => {
            let text = btn.innerText.trim();
            return text === "正在关注" || text === "Following";
        });

        if (followBtns.length === 0) {
            console.log("⏬ 当前可视区域未找到“正在关注”按钮，正在向下滚动...");
            window.scrollBy(0, 1000);
            await sleep(2000); // 等待网络加载新列表
            continue;
        }

        // 2. 点击第一个找到的“正在关注”按钮
        let targetBtn = followBtns[0];
        targetBtn.click();
        await sleep(800); // 等待弹出二次确认窗口

        // 3. 在弹出的窗口中点击确认“取消关注”
        let confirmBtn = document.querySelector('[data-testid="confirmationSheetConfirm"]');
        
        if (confirmBtn) {
            confirmBtn.click();
            unfollowCount++;
            console.log(`✅ 已成功取消关注 ${unfollowCount} 人`);
            
            // ⚠️ 极其关键的防封号等待时间：这里设置了 3 秒（3000毫秒）。
            // 如果你的账号是新号或粉丝较少，建议将这里改为 5000 甚至更长。
            await sleep(3000); 
        } else {
            console.log("⚠️ 未找到确认按钮，跳过此人...");
            document.body.click(); // 点击空白处关闭弹窗
            targetBtn.remove(); // 将按钮从前端 DOM 移除防止死循环
            await sleep(1000);
        }
    }
}

// 执行函数
autoUnfollow();
