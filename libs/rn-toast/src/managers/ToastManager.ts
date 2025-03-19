import { THROTTLE_DELAY } from "../constants";
import { ToastOptions, ToastRef, ToastType } from "../types";

// Toast Manager Singleton
class ToastManagerSingleton {
  private static instance: ToastManagerSingleton;
  private toastRef: ToastRef | null = null;
  private listeners: Set<(ref: ToastRef) => void> = new Set();
  private isAnimating: boolean = false;
  private queue: {
    message: string;
    type: ToastType;
    options?: ToastOptions;
  }[] = [];
  private lastToastTime: number = 0;

  private constructor() {}

  /** Get the singleton instance of ToastManager. */
  static getInstance(): ToastManagerSingleton {
    if (!ToastManagerSingleton.instance) {
      ToastManagerSingleton.instance = new ToastManagerSingleton();
    }
    return ToastManagerSingleton.instance;
  }

  setToastRef(ref: ToastRef | null) {
    this.toastRef = ref;
  }

  setAnimating(isAnimating: boolean) {
    this.isAnimating = isAnimating;
  }

  /** Process queued toast messages */
  private processQueue() {
    if (!this.isAnimating && this.queue.length > 0 && this.toastRef) {
      const nextToast = this.queue.shift();
      if (nextToast && nextToast.message && nextToast.message.trim() !== "") {
        this.isAnimating = true;
        this.lastToastTime = Date.now();
        this.toastRef.show(
          nextToast.message,
          nextToast.type,
          nextToast.options
        );
      } else {
        // Skip empty messages and process next item
        this.processQueue();
      }
    }
  }

  /** Check if a toast request is valid */
  private isValidToastRequest(message: string): boolean {
    // Check if message is empty or just whitespace
    return message !== undefined && message !== null && message.trim() !== "";
  }

  /** Show a toast message. */
  show(message: string, type: ToastType = "info", options?: ToastOptions) {
    // Validasi pesan kosong
    if (!message || message.trim() === "") {
      return;
    }

    // Anti-spam check
    const now = Date.now();
    if (now - this.lastToastTime < THROTTLE_DELAY || this.isAnimating) {
      return; // Skip jika masih dalam cooldown atau sedang animasi
    }

    // Update waktu toast terakhir
    this.lastToastTime = now;

    // Tampilkan toast
    if (this.toastRef) {
      this.isAnimating = true;
      this.toastRef.show(message, type, options);
    }
  }

  /** Hide the currently visible toast. */
  hide(callback?: () => void) {
    if (this.toastRef) {
      this.toastRef.hide(() => {
        this.isAnimating = false;
        if (callback) callback();
        this.processQueue();
      });
    }
  }

  // Add a listener for when the toast is ready
  private onReady(callback: (ref: ToastRef) => void) {
    if (this.toastRef) {
      callback(this.toastRef);
    } else {
      this.listeners.add(callback);
    }
  }
}

/** Singleton instance to manage toasts globally. */
export const ToastManager = ToastManagerSingleton.getInstance();