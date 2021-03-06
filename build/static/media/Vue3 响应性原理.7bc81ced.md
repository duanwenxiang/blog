# Vue3 响应性原理

### 前言

响应性：这个术语在程序设计中经常被提及，但这是什么意思呢？响应性是一种允许我们以声明式的方式去适应变化的编程范例。最典型例子，就是一份 excel 电子表格。

![](https://pic2.zhuanstatic.com/zhuanzh/59afb389-eba9-4b98-a8e1-614e118b9a60.gif)

如果将数字 2 放在第一个单元格中，将数字 3 放在第二个单元格中并要求提供 SUM，则电子表格会将其计算出来给你。\
但是 JavaScript 通常不是这样工作的，如果我们想用 JavaScript 编写类似的内容：

```JavaScript
let val1 = 2
let val2 = 3
let sum = val1 + val2

console.log(sum) // 5

val1 = 3

console.log(sum) // 仍然是 5
```

如果我们更新第一个值，sum 不会被修改。\
那么我们如何用 JavaScript 实现这一点呢？

> 接下来就让我们带着这个问题，看看下面是如何实现的？

### Object.defineProperty

要了解 Vue3 的响应性原理，首先要了解 Vue2 的原理。

> Vue2 使用 Object.defineProperty 作为响应性原理的实现，该方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象。

```JavaScript
Object.defineProperty(obj, prop, descriptor) 接受三个参数，而且都是必填的
obj: 要定义属性的对象
prop: 要定义或修改的属性的名称
descriptor: 要定义或修改的属性描述符
```

```JavaScript
  let obj = {}
  let initValue = '李四'
  Object.defineProperty(obj, 'name', {
    // 表示能否通过delete删除属性从而重新定义属性，能否修改属性的特性，或者能否把属性修改为访问器属性，默认值为true
    configurable: true,
    // 表示能否通过for in循环访问属性，默认值为true
    enumerable: true,
    // 表示能否修改属性的值。默认值为true
    writable: true,
    // 属性的默认值，默认为undefined
    value: undefined
    get() {
      // 获取定义属性时的操作
      console.log(`获取 name 为：${initValue}`)
      return initValue
    },
    set(value) {
      // 设置定义属性时的操作
      console.log(`设置 name 为：${value}`)
      initValue = value
    }
  })
  obj.name // 获取 name 为：李四
  obj.name = '张三' // 设置 name 为：张三
```

defineProperty 其实就是劫持数据，在获取、设置数据时做出对应的操作，以达到在设置属性时有响应性。

### Proxy

Vue3 和 Vue2 的响应性实现不同，Vue3 是实现原理是用 ES6 中的 Proxy 方法来实现的。这里有的小伙伴可能对 Proxy 这个方法不是太熟悉，所以咱们先简单说一下：

> Proxy 对象用于创建一个对象的代理，从而实现基本操作的拦截和自定义（如属性查找、赋值、枚举、函数调用等）。可以理解为，在目标对象之前有一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。

```JavaScript
// target: 目标对象，待要使用 Proxy 包装的目标对象（可以是任何类型的对象，包括原生数组，函数，甚至另一个代理）
// handler: 一个通常以函数作为属性的对象，各属性中的函数分别定义了在执行各种操作时代理 proxy 的行为
const proxy = new Proxy(target, handler);
```

#### 常见代理函数

> get 拦截对象属性的读取

```JavaScript
  let obj = {
    'name': "张三",
  }
  const proxy = new Proxy(obj, {
    // target：代理对象；key：当前的属性名
    get(target, key) {
      return key in target ? target[key] : key
    }
  })
  console.log(proxy["name"]) // 你好
  console.log(proxy["age"]) // age
```

> set 拦截对象属性的设置；（必须有返回值，返回值为布尔类型）

```JavaScript
  let obj = {
    'name': "张三",
  }
  const proxy = new Proxy(obj, {
    // target：代理对象；key：当前的属性名；value：新的属性值
    set(target, key, value) {
      target[key] = value
      return true
    }
  })
  proxy.name = '李四'
  console.log(proxy["name"]) // 李四
```

> has 拦截 key in proxy 的操作

```JavaScript
 let range = {
    start: 1,
    end: 5
  }
  const proxy = new Proxy(range, {
    // target：代理对象；key：当前的属性名
    has(target, key) {
      return key >= proxy.start && key <= proxy.end
    }
  })
  console.log(2 in proxy) // true
  console.log(9 in proxy) // false
```

> deleteProperty

```JavaScript
  let obj = { name: '李四', age: '18' }
  const proxy = new Proxy(obj, {
    // target：代理对象；key：当前的属性名
    deleteProperty(target, key) {
      console.log('当前删除 :', target[key])
      return delete target[key]
    }
  });
  delete proxy.name
  Reflect.deleteProperty(proxy, 'age')
```

> ownKeys 拦截获取键值的操作

```JavaScript
  let obj = { a: 10, [Symbol.for('foo')]: 2 };
  const proxy = new Proxy(obj, {
    ownKeys(target) {
      return [...Reflect.ownKeys(target), 'b', Symbol.for('bar')]
    }
  })
  // 自动过滤掉Symbol/非自身/不可遍历的属性
  const keys = Object.keys(proxy)  // ['a']

  // 和 Object.keys() 过滤性质一样，只返回target本身的可遍历属性
  for (let key in proxy) {
    console.log('key-', key)  // prop-a
  }

  // 只返回拦截器返回的非Symbol的属性，不管是不是target上的属性
  const ownNames = Object.getOwnPropertyNames(proxy)  // ['a', 'b']

  // 只返回拦截器返回的Symbol的属性，不管是不是target上的属性
  const ownSymbols = Object.getOwnPropertySymbols(proxy)  // [Symbol(foo), Symbol(bar)]

  // 返回拦截器返回的所有值
  const ownKeys = Reflect.ownKeys(proxy)  // ['a','c',Symbol(foo),'b',Symbol(bar)]
```

> Proxy 支持 13 种拦截操作，除了上面的的几种常见的操作，还支持其它多种行为的拦截，想要深入了解的可以去 MDN 上看看。

通过上面这些例子，大家应该也了解了 Object.defineProperty 与 Proxy，但大家千万别把它们两个理解为同一个功能，其实最开始的使用方式上已经对它们两个做出了区分。

> Object.defineProperty(obj, prop, descriptor) 中的第一个参数是需要定义的对象，当我们使用后，这个对象就会被数据劫持。

> Proxy 实际是一个构造函数，用来生成 Proxy 实例。而且 Proxy 定义的是拦截，只是对外界访问是的过滤和改变。

### 实现响应性

通过上面示例，大家应该都对响应性有了一定的理解，接下来就是实现这个功能

```JavaScript
  let data = {
    name: '',
    age: '',
    sex: ''
  }
  const proxy = new Proxy(data, {
    get(target, key) {
      return target[key]
    },
    set(target, key, newValue) {
      if (target[key] === newValue) {
        return
      }
      target[key] = newValue
      document.getElementById(key).innerHTML = newValue
    }
  })
  proxy.name = '张三'
  proxy.age = '18'
  proxy.sex = '男'
```

![](https://pic2.zhuanstatic.com/zhuanzh/7f7e0052-5c74-4691-9b45-c423f6ccc22a.gif)

### 总结

Vue3 里用 Proxy 主要是为了做响应性优化。

- defineProperty 的局限性最大原因是它只能针对单例属性做监听。Vue2 中的响应性实现正是基于 defineProperty 中的 descriptor，对 data 中的属性做了遍历 + 递归，为每个属性设置了 get、set。这也就是为什么 Vue 只能对 data 中预定义过的属性做出响应的原因，在 Vue 中使用下标的方式直接修改属性的值或者添加一个预先不存在的对象属性是无法做到 set 监听的，这是 defineProperty 的局限性。
- Proxy 的监听是针对一个对象的，那么对这个对象的所有操作会进入监听操作，这就完全可以代理所有属性，将会带来很大的性能提升和更优的代码。Proxy 可以理解成，在目标对象之前架设一层 "拦截" ，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。
- 在 Vue2 中，对于一个深层属性嵌套的对象，要劫持它内部深层次的变化，就需要递归遍历这个对象，执行 Object.defineProperty 把每一层对象数据都变成响应性的，这无疑会有很大的性能消耗。而在 Vue3 中，使用 Proxy 并不能监听到对象内部深层次的属性变化，因此它的处理方式是在 get 中去递归响应性，这样做的好处是真正访问到的内部属性才会变成响应性，简单的可以说是按需实现响应性，减少性能消耗。

![](https://pic5.zhuanstatic.com/zhuanzh/92bc17c8-2ff5-44b5-b96e-8d26d1d0d9fb.png)
