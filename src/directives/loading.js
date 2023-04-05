// export default {
//   mounted(el, binding) {
//     // 创建加载动画到el元素内部
//   },

//   updated(el, binding) {
//     // 根据binding.value值决定创建或删除加载动画
//   },
//   unmounted() {},
// };

import loadingUrl from "../assets/images/loading.svg";

// 配置简化
export default function (el, binding) {
  // 根据binding.value值决定创建或删除加载动画
  const curImg = el.querySelector(".loadbox");
  if (binding.value) {
    if (curImg == null) {
      const loadBox = document.createElement("div");
      const loadImg = document.createElement("img");
      loadBox.className = "loadbox flex-center";
      loadImg.className = "loading";
      loadImg.src = loadingUrl;
      loadBox.appendChild(loadImg);
      el.appendChild(loadBox);
    }
  } else {
    if (curImg) {
      el.querySelector(".loadbox").remove();
    }
  }
}
