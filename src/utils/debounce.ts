export default function debounce<T extends any[]>(fn: (...args: T) => void, delay: number) {
  let timer: ReturnType<typeof setTimeout> | null = null;

  return function (this: any, ...args: T) {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}