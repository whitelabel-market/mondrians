import { CAF } from "caf";
import { computed, reactive } from "vue";

export interface AbortSignalWithPromise extends AbortSignal {
  pr: Promise<void>;
}

export type TaskCb<T, U extends any[]> = (
  signal: AbortSignalWithPromise,
  ...params: U
) => Generator<any, T, any>;

export type onFulfilled<T> = ((value: T) => any) | null | undefined;
export type onRejected = ((reason: any) => any) | null | undefined;

export type DeferredObject<T> = {
  promise: Promise<T>;
  resolve: any;
  reject: any;
};

export function defer<T>(): DeferredObject<T> {
  const deferredObject: Record<string, any> = {};
  const promise = new Promise((resolve, reject) => {
    deferredObject.resolve = resolve;
    deferredObject.reject = reject;
  });
  deferredObject.promise = promise as Promise<T>;
  return deferredObject as DeferredObject<T>;
}

export interface Task<T> extends PromiseLike<any> {
  // lifecycle
  hasStarted: boolean;
  isRunning: boolean;
  isFinished: boolean;
  isCanceling: boolean;
  isSuccessful: boolean;
  isCanceled: boolean;
  isActive: boolean;
  isError: boolean;

  _run: (options: any) => void;
  cancel: (options?: { force: boolean }) => void;
  canceledOn: (signal: AbortSignalWithPromise) => Task<T>;
  token?: Record<string, any>;

  // state
  value: T | null;
  error: any | null;

  // promise-like stuff
  _deferredObject: DeferredObject<T>;
  _canAbort: boolean;
  _handled: boolean; // this is needed to set to true so that Vue does not show error about unhandled rejection
  then: (onfulfilled: onFulfilled<T>, onrejected?: onRejected) => Promise<any>;
  catch: (onrejected?: onRejected) => any;
  finally: (onfulfilled: () => any) => any;
}

export default function useTask<T>(cb: any): Task<T> {
  // initial State
  const content = reactive({
    hasStarted: false,
    isRunning: false,
    isFinished: false,
    isCanceling: false,
    isCanceled: computed<boolean>(() => task.isCanceling && task.isFinished),
    isActive: computed<boolean>(() => task.isRunning && !task.isCanceling),
    isSuccessful: false,
    isError: computed<boolean>(() => !!task.error),

    error: null,
    value: null,

    cancel({ force } = { force: false }): void {
      if (!force) {
        task.isCanceling = true;
      }

      if (task.token && task._canAbort) {
        task.token.abort("cancel");
        try {
          task.token.discard();
        } catch (e: any) {
          //
        }
        task.token = undefined;
        task._canAbort = false;
      }
    },

    canceledOn(signal: AbortSignalWithPromise) {
      signal.pr.catch(() => {
        task.cancel();
      });

      return task;
    },

    _run(options: any): void {
      runtask(task, cb, options);
      return task as any;
    },

    _handled: true,
    _deferredObject: defer<T>(),
    _canAbort: true,

    then(onFulfilled: onFulfilled<T>, onRejected: onRejected) {
      return task._deferredObject.promise.then(onFulfilled, onRejected);
    },
    catch(onRejected: onRejected) {
      return task._deferredObject.promise.catch(onRejected);
    },
    finally(cb: any) {
      return task._deferredObject.promise.finally(cb);
    },
  });

  const task = content as Task<T>;

  return task;
}

const runtask = <T>(task: Task<T>, cb: TaskCb<T, any>, options: any): void => {
  const token = new (CAF as any).cancelToken();
  const runningToken = (CAF as any)(cb, token);
  task.token = token;

  task.error = null;
  task.hasStarted = true;
  task.isRunning = true;

  function setFinished() {
    task.isRunning = false;
    task.isFinished = true;
  }

  runningToken
    .call(task, token)
    .then((value: any) => {
      task.value = value;
      task.isSuccessful = true;

      setFinished();
      task._deferredObject.resolve(value);
      task._canAbort = false;
      options.onFinish();
    })
    .catch((e: any) => {
      if (e !== "cancel") {
        task.error = e;
      }
      console.log(e);
      setFinished();
      task._deferredObject.reject(e);
    });
};
