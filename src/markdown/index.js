import WebComponent from "@/markdown/text/WebComponent.md";
import vueProxy from "@/markdown/text/Vue3 响应性原理.md";
import AddTwoNumbers from "@/markdown/leetcode/两数相加.md";
import BinaryTreeLevelOrderTraversal from "@/markdown/leetcode/二叉树的层序遍历.md";

const mdList = {
  "Web Component": {
    img: "https://www.wangbase.com/blogimg/asset/201908/bg2019080604.jpg",
    title: "Web Component",
    data: WebComponent,
    info: "Web Components 是一套不同的技术，允许您创建可重用的定制元素（它们的功能封装在您的代码之外）并且在您的 web 应用中使用它们。",
  },
  "Vue3 响应性原理": {
    img: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fcdn.javanx.cn%2Fwp-content%2Fthemes%2Flensnews2.2%2Fimages%2F201909%2F5%2F20190827170631.jpg&refer=http%3A%2F%2Fcdn.javanx.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1657965346&t=b88604743c755db0a24f3777bb56c320",
    title: "Vue3 响应性原理",
    data: vueProxy,
    info: "响应性：这个术语在程序设计中经常被提及，但这是什么意思呢？响应性是一种允许我们以声明式的方式去适应变化的编程范例。最典型例子，就是一份 excel 电子表格。",
  },
  两数相加: {
    img: "https://img1.baidu.com/it/u=1450242148,2886082355&fm=253&fmt=auto&app=138&f=JPEG?w=1320&h=400",
    title: "两数相加",
    data: AddTwoNumbers,
    info: "给你两个 非空 的链表，表示两个非负的整数。它们每位数字都是按照 逆序 的方式存储的，并且每个节点只能存储 一位 数字。请你将两个数相加，并以相同形式返回一个表示和的链表。",
  },
  "二叉树的层序遍历": {
    img: "https://img1.baidu.com/it/u=1450242148,2886082355&fm=253&fmt=auto&app=138&f=JPEG?w=1320&h=400",
    title: "二叉树的层序遍历",
    data: BinaryTreeLevelOrderTraversal,
    info: "给你二叉树的根节点 root ，返回其节点值的 层序遍历 。 （即逐层地，从左到右访问所有节点）。",
  },
};

export default mdList;
