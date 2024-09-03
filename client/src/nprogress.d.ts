// src/nprogress.d.ts
declare module "nprogress" {
  interface NProgressOptions {
    minimum?: number;
    easing?: string;
    speed?: number;
    trickle?: boolean;
    trickleSpeed?: number;
    showSpinner?: boolean;
    barSelector?: string;
    spinnerSelector?: string;
    parent?: string;
    template?: string;
  }

  interface NProgress {
    configure(options: Partial<NProgressOptions>): NProgress;
    start(): NProgress;
    done(force?: boolean): NProgress;
    inc(amount?: number): NProgress;
    set(number: number): NProgress;
    status: number | null;
    remove(): void;
  }

  const nprogress: NProgress;
  export default nprogress;
}
