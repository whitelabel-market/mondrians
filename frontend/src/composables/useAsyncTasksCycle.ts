import { reactive, ref, Ref } from "vue";
import {
  useAsyncQueue,
  useAsyncState,
  UseAsyncStateReturn,
} from "@vueuse/core";

export interface AsyncCycle {
  taskIndex: Ref<number>;
  jobIndex: Ref<number>;
  next: (from?: { task?: number; job?: number }, data?: any) => void;
  skip: (from?: { task?: number; job?: number }) => void;
  locked: Ref<boolean>;
  jobs: Array<UseAsyncStateReturn<unknown, true>[]>;
  _createJob: (
    promises: ((...args: any[]) => Promise<any>)[]
  ) => UseAsyncStateReturn<unknown, true>[];
}

export default function useAsyncTasksCycle(
  ...promises: Array<((...args: any[]) => Promise<unknown>)[]>
) {
  const locked = ref(false);
  const taskIndex = ref(0);
  const jobIndex = ref(0);

  const _createJob = (
    promises: ((...args: any[]) => Promise<any>)[]
  ): UseAsyncStateReturn<unknown, true>[] => {
    return promises.map((cb) =>
      useAsyncState(
        (args) =>
          cb(args).then((res: any) => {
            console.log("finished task cb", taskIndex.value, "res", res);
            taskIndex.value++;
            return res;
          }),
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

  const next = (from?: { task?: number; job?: number }, data?: any) => {
    if (locked.value) {
      return;
    }
    locked.value = true;
    jobIndex.value = from?.job ?? jobIndex.value;
    taskIndex.value = from?.task ?? taskIndex.value;
    const nextTasks = jobs[jobIndex.value];
    useAsyncQueue(
      nextTasks.map(
        (task, i) => async (args: any) =>
          new Promise((resolve, reject) =>
            task.execute(0, i <= 0 ? data : args).then((res) => {
              if (res) {
                resolve(res);
              } else {
                reject();
              }
            })
          )
      ),
      {
        interrupt: true,
        onFinished: () => {
          jobIndex.value++;
          locked.value = false;
        },
      }
    );
  };

  const jobs = promises.map(_createJob) as Array<
    UseAsyncStateReturn<unknown, true>[]
  >;

  return {
    locked,
    jobs,
    taskIndex,
    jobIndex,
    next,
    skip,
    _createJob,
  } as AsyncCycle;
}
