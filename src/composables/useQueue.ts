import { reactive } from "vue";
import { computed, onBeforeUnmount, effectScope } from "vue";
import type { Task } from "@/composables/useTask";

export type Queue<T> = {
  // lifecycle state
  isIdle: boolean;
  isRunning: boolean;
  isError: boolean;

  // shortcuts to useful instances
  last: Task<T> | undefined;
  first: Task<T> | undefined;
  size: number;

  // action methods
  cancelAll: (options?: { force: boolean }) => void;
  enqueue: (task: Task<T>) => void;
  dequeue: () => void;
  clear: () => void;
  destroy: () => void;

  // modifiers
  maxConcurrency: (number: number) => Queue<T>;

  // modifier flags
  _maxConcurrency: number;

  // instances
  _tasks: Task<T>[];
  _runningInstances: readonly Task<T>[];
  _activeInstances: readonly Task<T>[];
  _failedInstances: readonly Task<T>[];

  // other
  _scope: any;
};

export default function useQueue<T>(
  options = { cancelOnUnmount: true }
): Queue<T> {
  const scope = effectScope();
  const content = reactive({
    _scope: scope,
    _maxConcurrency: 1,

    isIdle: computed<boolean>(
      () => !!queue._tasks.some((task: any) => !task.isRunning)
    ),
    isRunning: computed<boolean>(() => !!queue.isIdle),
    isError: computed<boolean>(
      () => !!queue._tasks.some((task: any) => task.isError)
    ),

    _tasks: [],
    _runningInstances: computed<Task<T>[]>(() =>
      queue._tasks.filter((task: any) => task.isRunning)
    ),
    _activeInstances: computed<Task<T>[]>(() =>
      queue._tasks.filter((task: any) => task.isActive)
    ),
    _failedInstances: computed<Task<T>[]>(() =>
      queue._tasks.filter((task: any) => task.isError)
    ),

    size: computed<number>(() => queue._tasks.length),
    last: computed<Task<T>>(() => queue._tasks[queue._tasks.length - 1]),
    first: computed<Task<T>>(() => queue._tasks[0]),

    cancelAll({ force } = { force: false }): void {
      // Cancel all running and enqueued instances. Finished and dropped instances can't really be canceled.
      queue._tasks.forEach((task: any) => {
        try {
          if (force || !task.isFinished) {
            task.cancel({ force });
          }
        } catch (e) {
          if (e !== "cancel") {
            throw e;
          }
        }
      });
    },

    enqueue(task: Task<T>): void {
      queue._tasks.push(task);
      queue.dequeue();
    },

    dequeue(): void {
      // If max pending promises is reached, return
      if (queue._activeInstances.length >= queue._maxConcurrency) {
        return;
      }

      const item = queue.first;
      // If all promises are done, return
      if (!item) {
        return;
      }

      // Try to perform the next promise
      const onFinish = () => onTaskInstanceFinish(queue);
      queue._scope.run(() => {
        item._run({ onFinish });
      });
      //queue._tasks.shift();
    },

    clear(): void {
      queue.cancelAll({ force: true });
      queue._tasks = [];
    },

    destroy(): void {
      queue._scope.stop();
      queue.clear();
    },

    maxConcurrency(number: number): Queue<T> {
      queue._maxConcurrency = number;
      return queue;
    },
  });

  const queue = reactive(content) as Queue<T>;

  if (options.cancelOnUnmount) {
    onBeforeUnmount(() => {
      if (queue.size) {
        queue.destroy();
      }
    });
  }

  return queue;
}

const onTaskInstanceFinish = <T>(queue: Queue<T>): void => {
  if (queue.size) {
    queue._tasks.shift();
    queue.dequeue();
  }
};
