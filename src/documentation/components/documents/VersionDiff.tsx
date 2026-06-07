import * as Diff from 'diff';

export function VersionDiff({ oldText, newText }: { oldText: string; newText: string }) {
  const parts = Diff.diffLines(oldText, newText);

  return (
    <pre className="max-h-96 overflow-auto rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs leading-relaxed">
      {parts.map((part, i) => (
        <span
          key={i}
          className={
            part.added
              ? 'bg-emerald-100 text-emerald-900'
              : part.removed
                ? 'bg-red-100 text-red-900 line-through'
                : ''
          }
        >
          {part.value}
        </span>
      ))}
    </pre>
  );
}
