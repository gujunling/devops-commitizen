'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as execa from 'execa';
import {Commitizen} from "./commitizen";
let output: vscode.OutputChannel;

function hasOutput(result?: {stdout?: string}): boolean {
    return Boolean(result && result.stdout);
}
  
async function hasStagedFiles(cwd: string): Promise<boolean> {
    const result = await execa('git', ['diff', '--name-only', '--cached'], {cwd});
    return hasOutput(result);
}
  
async function conditionallyStageFiles(cwd: string): Promise<void> {
    const hasSmartCommitEnabled = vscode.workspace.getConfiguration('git')
      .get<boolean>('enableSmartCommit') === true;
  
    if (hasSmartCommitEnabled && !(await hasStagedFiles(cwd))) {
        output.appendLine('Staging all files (enableSmartCommit enabled with nothing staged)');
      await vscode.commands.executeCommand('git.stageAll');
    } 
  }
async function commit(cwd: string, message: string): Promise<boolean> {
    output.appendLine(`About to commit '${message}'`);
    try {
      await conditionallyStageFiles(cwd);
      const result = await execa('git', ['commit', '-m', message], {cwd});
      await vscode.commands.executeCommand('git.refresh');
      if (hasOutput(result)) {
        result.stdout.split('\n').forEach((line:string) => output.appendLine(line));
        output.show();
      }
      return true
    } catch (e) {
      if (e instanceof Error) {
        vscode.window.showErrorMessage(`代码提交出错了，请重新检查您的代码提交格式是否符合前端代码规范。 ${e.message}`);
        output.appendLine(`代码提交出错了，请重新检查您的代码提交格式是否符合前端代码规范。 ${e.message}`);
      }
      return false
    }
  }
async function getStageFileSum(): Promise<boolean> {
  if(vscode.workspace.workspaceFolders){
    const cwd = vscode.workspace.workspaceFolders[0].uri.fsPath
    const statusFlag =  await execa('git', ['diff', '--name-only', '--cached'], {cwd});
    if(!statusFlag.stdout){
      console.log('暂存区中没有文件')
      vscode.window.showErrorMessage(`git 暂存区中没有文件，请检查是否将文件添加到暂存区中或执行git add <file>命令`);
    }
    return Boolean(statusFlag.stdout) 
  }
  return false
}
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    await getStageFileSum()
    console.log('Congratulations, your extension "devops-commitizen" is now active!');
    // 创建输出窗口
    output = vscode.window.createOutputChannel('devops-commitizen');
    output.appendLine('devops-commitizen started');
    
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('devops-commitizen', async() => {
        // The code you place here will be executed every time your command is executed
        const cz = new Commitizen();
        await cz.reloadConfigs();
        const type = await cz.getType();
        if(!type){
            console.log('没有选择type')
            vscode.window.showErrorMessage(`请选择commit 类型`);
            return
        }
          // await cz.getScope();
        const subject =  await cz.getSubject();
        if(!subject){
            console.log('没有输入subject描述')
            vscode.window.showErrorMessage(`请输入commit简要描述`);
            return
        }
        
        if (cz.message && vscode.workspace.workspaceFolders) {
          const commitFlag = await commit(vscode.workspace.workspaceFolders[0].uri.fsPath, cz.message.trim());
          if(commitFlag){
            console.log('生成的代码提交信息',cz.message)
            vscode.window.showInformationMessage(`代码提交成功了，生成的代码提交信息为： ${cz.message}`);
          }
        }
      });

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}