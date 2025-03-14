interface Props {
  connected: boolean;
}

export default function Connection({ connected }: Props) {
  return (
    <div className="flex items-center gap-2">
      <div
        className={`size-2 rounded-full flex items-center justify-center ${
          connected ? 'bg-green-600' : 'bg-yellow-600'
        }`}
      />
      <span>{connected ? 'Connected!' : 'Connecting...'}</span>
    </div>
  );
}
