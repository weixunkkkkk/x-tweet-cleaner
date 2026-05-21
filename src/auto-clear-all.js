async function autoClearAll() {
    console.log("%c🚀 开始全面清理（包含原创推文与转推），如需停止请直接刷新页面 (F5)...", "color: red; font-size: 16px; font-weight: bold;");
    
    let deletedTweets = 0;
    let undoneRetweets = 0;

    // 防风控延时函数
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    while (true) {
        // --- 步骤 1：优先扫描并处理“转推” ---
        let unretweetBtn = document.querySelector('[data-testid="unretweet"]');
        
        if (unretweetBtn) {
            unretweetBtn.click();
            await sleep(800); // 等待弹出菜单
            
            let confirmBtn = document.querySelector('[data-testid="unretweetConfirm"]');
            if (confirmBtn) {
                confirmBtn.click();
                undoneRetweets++;
                console.log(`✅ 已撤销 ${undoneRetweets} 条转推`);
                await sleep(2000); // ⚠️ 关键防封号等待时间
            } else {
                document.body.click(); // 未找到确认按钮，关闭菜单
                unretweetBtn.remove(); // 移除该异常节点防止死循环
                await sleep(500);
            }
            continue; // 执行完毕后，重新从头扫描页面
        }

        // --- 步骤 2：如果没有转推，扫描并处理“原创推文” ---
        let carets = document.querySelectorAll('[data-testid="caret"]');
        
        if (carets.length > 0) {
            carets[0].click(); // 点开第一个推文的更多菜单
            await sleep(800); // 等待菜单渲染
            
            // 查找菜单中的“删除”选项
            let menuItems = document.querySelectorAll('[role="menuitem"]');
            let deleteBtn = Array.from(menuItems).find(item => 
                item.innerText.includes("删除") || item.innerText.includes("Delete")
            );

            if (deleteBtn) {
                deleteBtn.click();
                await sleep(800); // 等待二次确认弹窗
                
                let confirmBtn = document.querySelector('[data-testid="confirmationSheetConfirm"]');
                if (confirmBtn) {
                    confirmBtn.click();
                    deletedTweets++;
                    console.log(`🗑️ 已删除 ${deletedTweets} 条原创推文`);
                    await sleep(2000); // ⚠️ 关键防封号等待时间
                } else {
                    document.body.click(); 
                    carets[0].remove();
                    await sleep(500);
                }
            } else {
                // 如果菜单里没有“删除”（可能是其他人艾特你的推文，或者已被屏蔽的推文）
                document.body.click(); // 点击空白处关闭菜单
                carets[0].remove(); // 在前端DOM中移除该按钮，以免卡在这一条
                await sleep(500);
            }
            continue; // 执行完毕后，重新从头扫描页面
        }

        // --- 步骤 3：当前可视区域既没有转推也没有原创推文，滚动翻页 ---
        console.log("⏬ 当前可视区域清理完毕，正在向下滚动加载...");
        window.scrollBy(0, 1000);
        await sleep(2000); // 等待网络加载新内容
    }
}

// 执行函数
autoClearAll();
