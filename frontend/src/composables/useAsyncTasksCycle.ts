import { computed, ComputedRef, ref, Ref } from "vue";
import {
  useAsyncQueue,
  useAsyncState,
  UseAsyncStateReturn,
} from "@vueuse/core";

type Task = (...args: any[]) => Promise<any> | any;

export interface AsyncCycle {
  taskIndex: Ref<number>;
  jobIndex: Ref<number>;
  next: (data?: any, from?: { task?: number; job?: number }) => void;
  skip: (from?: { task?: number; job?: number }) => void;
  locked: Ref<boolean>;
  jobs: Array<UseAsyncStateReturn<unknown, true>[]>;
  error: Ref<any>;
  isError: ComputedRef<boolean>;
  _createJob: (
    promises: ((...args: any[]) => Promise<any>)[]
  ) => UseAsyncStateReturn<unknown, true>[];
}

export default function useAsyncTasksCycle(...tasks: Array<Task[]>) {
  const locked = ref(false);
  const taskIndex = ref(0);
  const jobIndex = ref(0);
  const error = ref<any>();
  const isError = computed(() => !!error.value);

  const _createJob = (tasks: Task[]): UseAsyncStateReturn<unknown, true>[] => {
    return tasks.map((taskCb) =>
      useAsyncState(
        async (args) => {
          const res = await taskCb(args);
          taskIndex.value++;
          return res;
        },
        null,
        { immediate: false }
      )
    );
  };

  const skip = (from?: { task?: number; job?: number }) => {
    jobIndex.value = from?.job ?? jobIndex.value;
    const nextJobs = jobs[jobIndex.value];
    taskIndex.value = nextJobs.length + (from?.task ?? taskIndex.value);
    jobIndex.value++;
  };

  const next = (data?: any, from?: { task?: number; job?: number }) => {
    if (locked.value) {
      return;
    }
    locked.value = true;

    jobIndex.value = from?.job ?? jobIndex.value;
    taskIndex.value = from?.task ?? taskIndex.value;
    const nextTasks = jobs[jobIndex.value];
    useAsyncQueue(
      nextTasks.map((task, i) => async (args: any) => {
        error.value = null;
        return new Promise((resolve, reject) => {
          return task.execute(0, i <= 0 ? data : args).then((res) => {
            if (task.error.value) {
              error.value = task.error.value;
              return reject(task.error.value);
            } else {
              return resolve(res);
            }
          });
        });
      }),
      {
        interrupt: true,
        onFinished: () => {
          jobIndex.value++;
          locked.value = false;
        },
      }
    );
  };

  const jobs = tasks.map(_createJob) as Array<
    UseAsyncStateReturn<unknown, true>[]
  >;

  return {
    locked,
    jobs,
    taskIndex,
    jobIndex,
    error,
    isError,
    next,
    skip,
    _createJob,
  } as AsyncCycle;
}
