type PagePlaceholderProps = {
  title: string
}

export default function PagePlaceholder({ title }: PagePlaceholderProps) {
  return (
    <section className="flex min-h-[60vh] items-center justify-center rounded-3xl border border-slate-800 bg-slate-900/60 px-6 py-16 text-center shadow-lg shadow-slate-950/30">
      <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        {title}
      </h1>
    </section>
  )
}