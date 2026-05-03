export const LoadingState = () => (
  <div className="grid gap-3">
    {Array.from({ length: 5 }).map((_, index) => (
      <div
        className="h-[74px] animate-pulse rounded-lg border border-zinc-800 bg-zinc-900/30"
        key={index}
      />
    ))}
  </div>
);
