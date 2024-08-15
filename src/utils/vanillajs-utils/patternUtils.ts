export class Subject<T> {
  private observers: Observable<T>[] = [];
  addObserver(observer: Observable<T>) {
    this.observers.push(observer);
  }
  removeObserver(observer: Observable<T>) {
    const index = this.observers.indexOf(observer);
    if (index > -1) {
      this.observers.splice(index, 1);
    }
  }
  notify(data: T) {
    this.observers.forEach((observer) => observer.update(data));
  }
}

interface Observable<T> {
  update(data: T): void;
}

export class ConcreteObserver<T> implements Observable<T> {
  update(data: T) {
    console.log(data);
  }
}

export function createReactiveProxy<T extends Record<string, any>>(
  state: T,
  onSet: (state: T) => void
) {
  const singleProperty = Object.keys(state)[0] as keyof T;
  const proxy = new Proxy(state, {
    set(target, p, newValue, receiver) {
      if (p === singleProperty) {
        target[p as keyof T] = newValue;
        onSet(target);
      }
      return Reflect.set(target, p, newValue, receiver);
    },
  });
  return proxy;
}

export function createReactiveFunction<T extends CallableFunction>(
  func: T,
  onCall: (argsList: any[]) => void
) {
  const proxy = new Proxy(func, {
    apply(targetFunc, thisArg, argArray) {
      onCall(argArray);
      return Reflect.apply(targetFunc, thisArg, argArray);
    },
  });
  return proxy;
}

export class ObservableStore<T extends CallableFunction> {
  private observers: Set<T> = new Set();
  notify(...args: any[]) {
    this.observers.forEach((observer) => observer(...args));
  }
  notifyAndReturn(...args: any[]) {
    const returnValues = Array.from(this.observers).map((observer) =>
      observer(...args)
    );
    return returnValues;
  }
  addObserver(observer: T) {
    this.observers.add(observer);
  }
  removeObserver(observer: T) {
    this.observers.delete(observer);
  }
}
