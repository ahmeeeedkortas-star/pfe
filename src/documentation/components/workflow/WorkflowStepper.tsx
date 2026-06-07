import { WORKFLOW_STEPS, workflowStepIndex } from '../../lib/workflow';
import type { DocumentStatus } from '../../types';

export function WorkflowStepper({ status }: { status: DocumentStatus }) {
  const active = workflowStepIndex(status);

  return (
    <ol className="flex gap-0 overflow-x-auto rounded-xl border border-slate-200 bg-white p-2 shadow-sm">
      {WORKFLOW_STEPS.map((label, i) => {
        const done = i < active;
        const current = i === active;
        return (
          <li
            key={label}
            className={`relative flex min-w-[88px] flex-1 flex-col items-center px-1 py-2 text-center ${
              i < WORKFLOW_STEPS.length - 1
                ? "after:absolute after:right-0 after:top-1/2 after:h-px after:w-full after:translate-x-1/2 after:bg-slate-200 after:content-[''] last:after:hidden"
                : ''
            }`}
          >
            <span
              className={`z-[1] mb-1 flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-bold ${
                current
                  ? 'bg-[#185FA5] text-white ring-2 ring-[#E6F1FB]'
                  : done
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-200 text-slate-500'
              }`}
            >
              {done && !current ? '✓' : i + 1}
            </span>
            <span
              className={`z-[1] text-[9px] font-semibold leading-tight sm:text-[10px] ${
                current ? 'text-[#185FA5]' : done ? 'text-emerald-800' : 'text-slate-400'
              }`}
            >
              {label}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
