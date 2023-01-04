# devops-commitizen README
vscode marketplace [https://marketplace.visualstudio.com/items?itemName=sweetheartjq.devops-commitizen](https://marketplace.visualstudio.com/items?itemName=sweetheartjq.devops-commitizen)
## 这是一个用来格式化 Commit message 的插件

这是一个用来格式化 git commit message 的插件，用来提供符合约定式提交规范([commitizen](https://github.com/commitizen/cz-cli))的commit message,使我们的git提交信息更易于阅读并强制规范描述提交。

目前因为我们 devops 团队的git commit 规范是在commitizen的基础上有一些更改的，所以基于团队的需要开发了此插件。

## 安装

devops-commitizen 插件已经发布到 vscode 扩展商店中，可以在vscode的扩展商店中直接搜索devops-commitizen即可。

![install.png](https://static.cwoa.net/b15e01ebd9c14bb0aff4c23fc6fa9c3a.png)

## 启动

### 快捷键启动

- Window下快捷键： Ctrl + m

- Mac 下快捷键：Cmd + m

  **注意，若是在终端中执行此快捷键可能会与终端中其他的快捷键(切换Tab键移动焦点)冲突，可选择修改两者任何一个的快捷键指令或在上方的编辑页面中执行此快捷键**

### 命令启动

- 在vscode中使用快捷键 ctrl + shift + p (Mac快捷键为 Cmd + Shift + P) 打开命令选择框面板
- 然后在命令面板中输入命令 `devops-commitizen`执行插件

![命令.png](https://static.cwoa.net/1e7a63daf6674560816d033911abebb0.png)

## Commit message 的格式

每次提交，Commit message 都包括三个部分：Header，Body 和 Footer。

```xml
<type>(<scope>): <subject>
// 空一行
<body>
// 空一行
<footer>
```

其中，Header 是必需的，Body(详细描述) 和 Footer(列举出所有变更的 issues) 可以省略。

不管是哪一个部分，任何一行都不要超过 72 个字，这是为了避免自动换行影响美观。

Header 部分只有一行，包括三个字段：type（必需）、scope（可选）和 subject（必需），目前因为团队规范，scope暂时屏蔽。

### commit 类型选择

type 用于说明 commit 的类别，只允许使用下面标识

 > feat:新功能开发  
 > fix:bug 修复  
 > refactor:代码重构，同时不能是缺陷修复或新特性  
 > perf:性能优化  
 > test:添加测试用例或修改测试用例  
 > docs:文档变更  
 > style:代码样式调整，不涉及业务变更  
 > format:不修改业务逻辑下，仅做代码规范的格式化  
 > merge:仅做分支合并同步  
 > depend:对工程的依赖进行增删改  
 > chore:构建脚本、任务相关代码  
 > del:删除可能仍然有人用到的功能、API等破坏性动作

![commit-type.png](https://static.cwoa.net/029ecb9701974d649d1953f72c12e35c.png)

### subject简要描述

subject 是 commit 目的的简短描述，不超过 72 个字符。

例如：

p1_123456 【xxx】Maven仓库-制品详情新增依赖关系分析

p1_234560 【xxx】支持在卡片中切换图表类型

p1_345670 【xxx】任务流转到已完成，单条执行用例页面仍支持删除评论

### 提交信息

通过本插件可以将本地已经添加到暂存区的代码提交到本地仓库，代替执行 `git commit -m "xxxxx"`命令。

最后形成的commit信息如：

feat: p1_123456 【xxx】Maven仓库-制品详情新增依赖关系分析

feat: p1_234560 【xxx】支持在卡片中切换图表类型

fix: p1_345670 【xxx】任务流转到已完成，单条执行用例页面仍支持删除评论

docs: p1_0 修改readme文档

## 使用

1. 可以按照上文说的时候快捷键或者命令启动 `devops-commitizen` 插件；

2. 然后选择commit类型(可在命令面板搜索，若是不符合上文规定的类型最后不会提交，因此推荐直接选择commit类型)；

3. 然后在命令面板的输入框中输入需要填写的简要描述subject；

4. 然后按回车键，本次提交执行完成：

   - 若成功，则会在当前的 vscode 中打开输出终端，显示插件执行结果，或执行`git log` 命令查看执行结果。

    ![commit-success.png](https://static.cwoa.net/4acb7856629044779bfab09d4738acbe.png)

   - 若失败，则会在vscode的右下方显示错误信息，同时在输出终端显示错误提示。

    ![commit-error.png](https://static.cwoa.net/902c19b8a1c7499fbe7de019247ff106.png)
