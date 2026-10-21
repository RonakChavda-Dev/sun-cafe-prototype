import Link from "next/link";

export default function NotFound() {
  return (
    <div className="frame flex min-h-[80svh] flex-col items-start justify-center pt-[var(--header-h)]">
      <h1 className="display max-w-[12ch]">This corner is in the shade</h1>
      <p className="lead mt-8 max-w-[36ch] text-muted">There is nothing at this address, not even an imaginary table.</p>
      <Link href="/" className="btn btn-sun mt-10">
        Back to the light
      </Link>
    </div>
  );
}
