# Web Components 手把手教你实现组件
引用 MDN 的话：```Web Components``` 是一套不同的技术，允许您创建可重用的定制元素（它们的功能封装在您的代码之外）并且在您的 ```web``` 应用中使用它们。

简单来说就是官方定义的自定义组件的方式，封装代码，提高代码的复用性。相比于第三方框架，原生组件简单，不需要加载任何外部模块。

### 三项主要技术
* **Custom elements（自定义元素）**：允许定义 ```custom elements``` 及其行为，然后可以在您的用户界面中按照需要使用它们。
* **Shadow DOM（影子DOM）**：用于将封装的"影子" DOM 树附加到元素（与主文档 DOM 分开呈现）并控制其关联的功能。通过这种方式，您可以保持元素的功能私有，这样它们就可以被脚本化和样式化，而不用担心与文档的其他部分发生冲突。
* **HTML templates（HTML模板）**：```<template>``` 和 ```<slot>``` 元素使您可以编写不在呈现页面中显示的标记模板。然后它们可以作为自定义元素结构的基础被多次重用。

### 生命周期
* ```constructor（创建时）```：当自定义组建创建时。
* ```connectedCallback（挂载时）```：当自定义元素第一次被连接到文档 DOM 时被调用。
* ```disconnectedCallback（卸载时）```：当自定义元素与文档DOM断开连接时被调用。
* ```adoptedCallback（移动时）```：当自定义元素被移动到新文档时被调用。
* ```attributeChangedCallback（属性变化时）```：当自定义元素的一个属性被增加、移除或更改时被调用。

### 一个栗子 🌰（实现卡片）
按照组件化，通过一个标签实现这样一个卡片组件，内容和事件可配置化。

![](https://pic2.zhuanstatic.com/zhuanzh/56799f69-1f66-4095-82a4-3d690f2c7148.png)

首先实现一个模版：
```HTML
<!-- templates（HTML模板） -->
<template id="zz_card">
  <style>
    .zz_card_box {
      display: inline-block;
      min-width: 300px;
      max-width: 500px;
      margin: 20px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    .zz_card_head {
      padding: 20px;
      border-bottom: 1px solid #ccc;
    }
    .zz_card_body {
      padding: 20px;
      color: red;
    }
  </style>
  <div class="zz_card_box">
    <div class="zz_card_head">
      卡片头部
    </div>
    <div class="zz_card_body">
      卡片内容
    </div>
  </div>
</template>
```
使用 ```customElements``` 创建自定义组件：
```JavaScript
// 自定义元素需要使用 JavaScript 定义一个类
class ZzCard extends HTMLElement {
  constructor() {
    super()
    let templateElem = document.getElementById('zz_card')
    let content = templateElem.content.cloneNode(true)
    this.appendChild(content)
  }
}
// 定义和注册一个新的自定义元素
window.customElements.define('zz-card', ZzCard)
```
现在就可以直接使用标签来展示卡片
```HTML
  <zz-card></zz-card>
```
接下来开始完善组件功能，添加自定义 ```title```，通过```slot```（插槽）添加内容
```HTML
<zz-card title="卡片头部">
  <!-- 具名插槽 -->
  <div slot="body">卡片内容</div> 
  <!-- 非具名插槽 -->
  <div>卡片内容</div> 
</zz-card>
```
```HTML
<!-- templates（HTML模板） -->
<template id="zz_card">
  <style>
    .zz_card_box {
      display: inline-block;
      min-width: 300px;
      max-width: 500px;
      margin: 20px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    .zz_card_head {
      padding: 20px;
      border-bottom: 1px solid #ccc;
    }
    .zz_card_body {
      padding: 20px;
      color: red;
    }
  </style>
  <div class="zz_card_box">
    <div class="zz_card_head"></div>
    <div class="zz_card_body">
      <!-- 具名插槽 -->
      <slot name="body"></slot>
      <!-- 非具名插槽 -->
      <slot></slot>
    </div>
  </div>
</template>
```
```JavaScript
class ZzCard extends HTMLElement {
  constructor() {
    super()
    let templateElem = document.getElementById('zz_card')
    let content = templateElem.content.cloneNode(true)
    // 获取 DOM 设置传入的属性
    content.querySelector('.zz_card_head').innerHTML = this.getAttribute('title')
    this.appendChild(content)
  }
}
window.customElements.define('zz-card', ZzCard)
```
shadow DOM（影子 DOM）改造，我们需要组件内部独立（样式，事件等），借用 shadow 可以实现：```Element.attachShadow(shadowRootInit)``` 
```JavaScript
class ZzCard extends HTMLElement {
  constructor() {
    super()
    let shadow = this.attachShadow({ mode: 'open' })
    let templateElem = document.getElementById('zz_card')
    let content = templateElem.content.cloneNode(true)
    // 获取 DOM 设置传入的属性
    content.querySelector('.zz_card_head').innerHTML = this.getAttribute('title')
    shadow.appendChild(content)
  }
}
window.customElements.define('zz-card', ZzCard)
```
内部的样式不会影响外部

![](https://pic6.zhuanstatic.com/zhuanzh/c920ca6c-19c9-4873-9655-41fc9ff454c2.png)

生命周期的使用

```JavaScript
class ZzCard extends HTMLElement {
  constructor() {
    super()
    this._shadow = this.attachShadow({ mode: 'open' })
    const templateElem = document.getElementById('zz_card')
    const content = templateElem.content.cloneNode(true)
    this._shadow.appendChild(content)
  }
  // connectedCallback（挂载时）用于：获取数据，设置数据
  connectedCallback() {
    content.querySelector('.zz_card_head').innerHTML = this.getAttribute('title')
  }
  // attributeChangedCallback（属性变化时）用于：数据变更更新组件
  // 方法的触发依赖于 get 函数 observedAttributes 实现
  static get observedAttributes() {
    return ['title']
  }
  attributeChangedCallback(name, oldValue, newValue) {
    // 当组件的属性 title 变化时触发
    this._shadow.querySelector('.zz_card_head').innerHTML = newValue
  }
  // disconnectedCallback（卸载时）用于：卸载事件
  disconnectedCallback() {}
}
window.customElements.define('zz-card', ZzCard)
```
### 小结
```Web Components``` 相比第三方框架，原生组件简单直接，符合直觉，不用加载任何外部模块，代码量小，不需要一堆工程化工具。还有就是用过 ```Vue``` 的同学可能会发现，```Web Components``` 标准和 Vue 非常像。目前市面上有一些基于 ```Web Component``` 标准开发的组件库：```Omiu```，```xy-ui```。