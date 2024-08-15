type ToastType = "info" | "success" | "danger" | "default" | "warning";
type ToastManagerOptions = {
  timeout?: number;
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
};
export class ToastManager {
  private toastContainer?: HTMLElement;
  private options: ToastManagerOptions;

  public get containerElement() {
    return this.toastContainer;
  }

  constructor(options: ToastManagerOptions = {}) {
    this.options = { timeout: 3000, position: "bottom-right", ...options };
  }

  setup() {
    const element = document.getElementById("toasts");
    if (element) return;
    const toastContainer = document.createElement("div");
    toastContainer.id = "toasts";
    toastContainer.classList.add(this.options.position!);

    // add toast container to body
    document.body.appendChild(toastContainer);

    // set toast container
    this.toastContainer = toastContainer;
  }

  toast(message: string, type: ToastType = "default") {
    const toast = new Toast({
      message,
      type,
      duration: this.options.timeout,
    });
    if (!this.toastContainer) throw new Error("Toast container not set");
    this.toastContainer.appendChild(toast.element);
    toast.show();
  }

  success(message: string) {
    this.toast(message, "success");
  }

  info(message: string) {
    this.toast(message, "info");
  }

  danger(message: string) {
    this.toast(message, "danger");
  }

  warning(message: string) {
    this.toast(message, "warning");
  }
}

class Toast {
  public element: HTMLElement;
  private timeoutId: number | null = null;
  private duration: number;
  constructor({
    message,
    duration = 3000,
    type = "default",
    onClick,
  }: {
    message: string;
    type?: ToastType;
    duration?: number;
    onClick?: () => void;
  }) {
    const toast = document.createElement("div");
    toast.classList.add("toast");
    toast.classList.add(`toast-${type}`);
    toast.style.setProperty("--toast-duration", `${duration}ms`);
    toast.innerText = message;

    this.element = toast;
    this.duration = duration;

    this.element.addEventListener(
      "click",
      (e) => {
        e.stopPropagation();
        onClick?.();
        this.dismiss();
      },
      {
        once: true,
      }
    );
  }

  animateOut() {
    const animation = this.element.animate(
      [{ opacity: 0, transform: "translateX(250px)" }],
      {
        duration: 250,
      }
    );
    // wait for animation to finish
    animation.onfinish = () => {
      this.element.remove();
    };
  }

  show() {
    this.timeoutId = setTimeout(() => {
      this.animateOut();
      this.timeoutId = null;
    }, this.duration);
  }

  dismiss() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
      this.animateOut();
    }
  }
}
