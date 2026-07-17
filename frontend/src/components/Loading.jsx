import { Spinner } from '@phosphor-icons/react'

function Loading({ label = 'Loading...' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16">
      <Spinner
        size={24}
        weight="regular"
        className="text-ink animate-spin"
        aria-hidden="true"
      />
      <p className="font-['Geist_Mono'] text-[11px] uppercase tracking-[0.08em] text-gray-500">
        {label}
      </p>
    </div>
  )
}

export default Loading
