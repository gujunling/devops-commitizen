# devops-commitizen README

## 这是一个用来格式化 Commit message 的插件

> 用以提供符合 [commitizen](https://github.com/commitizen/cz-cli) 的 Commit message

## 功能

![commit](assets/commit.png 'commit')

![type](assets/type.png 'type')

![scope](assets/scope.png 'scope')

![subject](assets/subject.png 'subject')

> 支持预设 scope  
> 在项目根目录添加 .devops-commitizen.json

```json
{
  "scopes": [
    {
      "label": "用户",
      "description": "用户模块"
    },
    {
      "label": "组件",
      "description": "基础组件"
    },
    {
      "label": "视图",
      "description": "前端视图"
    }
  ]
}
```

## Commit message 的格式

每次提交，Commit message 都包括三个部分：Header，Body 和 Footer。

```xml
<type>(<scope>): <subject>
// 空一行
<body>
// 空一行
<footer>
```

其中，Header 是必需的，Body 和 Footer 可以省略。

不管是哪一个部分，任何一行都不得超过 72 个字符（或 100 个字符）。这是为了避免自动换行影响美观。

2.1 Header
Header 部分只有一行，包括三个字段：type（必需）、scope（可选）和 subject（必需）。

#### type

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

#### scope

scope 用于说明 commit 影响的范围，比如数据层、控制层、视图层等等，视项目不同而不同，目前因为某些原因，暂时屏蔽了范围的选择。

#### subject

subject 是 commit 目的的简短描述，不超过 72 个字符。

以动词开头，使用第一人称现在时，比如 change，而不是 changed 或 changes
第一个字母小写
结尾不加句号（.）

转自[阮一峰 Commit message 和 Change log 编写指南](http://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html)
