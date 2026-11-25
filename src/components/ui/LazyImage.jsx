export default function LazyImage({
  alt,
  className,
  decoding = 'async',
  eager = false,
  height = 800,
  loading,
  src,
  width = 1200,
  ...props
}) {
  return (
    <img
      alt={alt}
      className={className}
      decoding={decoding}
      height={height}
      loading={loading ?? (eager ? 'eager' : 'lazy')}
      src={src}
      width={width}
      {...props}
    />
  )
}
