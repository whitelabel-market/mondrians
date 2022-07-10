import { reactive, ref, Ref } from "vue";
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
  _createJob: (
    promises: ((...args: any[]) => Promise<any>)[]
  ) => UseAsyncStateReturn<unknown, true>[];
}

export default function useAsyncTasksCycle(...tasks: Array<Task[]>) {
  const locked = ref(false);
  const taskIndex = ref(0);
  const jobIndex = ref(0);

  const _createJob = (tasks: Task[]): UseAsyncStateReturn<unknown, true>[] => {
    return tasks.map((taskCb) =>
      useAsyncState(
        async (args) => {
          const res = await taskCb(args);
          console.log("finished task cb", taskIndex.value, "res", res);
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

  const jobs = tasks.map(_createJob) as Array<
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
