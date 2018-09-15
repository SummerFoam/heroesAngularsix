
// 创建一个可注入的、全应用级别的 MessageService，用于发送要显示的消息。
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messages: string[] = [];

  // add() 方法往缓存中添加一条消息
  add(message: string) {
    this.messages.push(message);
  }

  //clear() 方法用于清空缓存。
  clear() {
    this.messages = [];
  }
}